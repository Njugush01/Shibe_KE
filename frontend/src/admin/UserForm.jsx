import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../axios-client"
import { useStateContext } from "../contexts/ContextProvider";
import Accounts from "../Util";

export default function UserForm() {
    const {id} = useParams(); 
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null)
    const{setNotification} = useStateContext()
    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        phone: '',
        account_type: '',
        password: '',
        password_confirmation: ''
    })
    
    if (id) {
      useEffect(() => {
          setLoading(true)
          axiosClient.get(`/auth/users/${id}`)
          .then(({data}) =>{
              setLoading(false)
              setUser(data)
          })
          .catch(() =>{
              setLoading(false)
          })
      },[])
  }


    //implementing save or form submit
    const onSubmit = (ev) =>{
        ev.preventDefault();
        if (user.id) {
            axiosClient.put(`/auth/users/${id}`,user)
            .then(() =>{
                //show notification
                setNotification("User was successfully updated")
                navigate('/auth/users')
            })
            
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                    setErrors(response.data.errors)
                }
            })

        } else {
            axiosClient.post(`/auth/users/`, user)
              .then(() => {
                setNotification("User was successfully created")
                navigate('/auth/users')
              })
              .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                  setErrors(response.data.errors)
                }
              })
          }
    }

  return (
    <>
      {user.id && <h1 className="font-bold text-2xl">Update User: {user.name}</h1>}
      {!user.id && <h1>New User</h1>}
      <div className="card animated fadeInDown">
        {loading && (
            <div className="text-center">Loading...</div>
        )}
        {errors &&
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        {!loading && 
        <form onSubmit={onSubmit}>  
            <input value={user.name} onChange={ev => setUser({...user, name: ev.target.value})} placeholder="Name"/>
            <input type="email" value={user.email} onChange={ev => setUser({...user, email: ev.target.value})} placeholder="Email"/>
            <input value={user.phone} onChange={ev => setUser({...user, phone: ev.target.value})} placeholder="Phone Number"/>
            <input value={Accounts(user.account_type)} onChange={ev => setUser({...user, account_type: ev.target.value})} placeholder="Account Type"/>
            <input type="password" onChange={ev => setUser({...user, password: ev.target.value})} placeholder="Password"/>
            <input type="password" onChange={ev => setUser({...user, password_confirmation: ev.target.value})} placeholder="Confirm Password"/>
            <button className="btn">Save</button>
        </form>
        }
      </div>
    </>
  )
}
