import React from 'react'
import {useEffect, useState} from 'react'
import axiosClient from "../axios-client"
import { useStateContext } from '../contexts/ContextProvider'


const DonorProfile = () => {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)
  const{setNotification} = useStateContext()
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    account_type: '',
    password: '',
    password_confirmation: ''
  });

  useEffect(() => {
    // const data = await axiosClient.get('/user');
    // setAccountType(data.account_type);
    axiosClient.get('/user')
    .then(({data}) => {
      setUser(data);
    })
  }, [])

  const onSubmit = async (ev) =>{
    ev.preventDefault();
    try {
      await axiosClient.put(`/auth/users/${id}`,user)
      setNotification("Profile was successfully updated")
    } catch (error) {
      const response = error.response;
      if (response && response.status === 422) {
        console.log(response.data.errors);
        setErrors(response.data.errors)
      }
    }
  }

  return (
    <>
     {user.id && <h1>Update User: {user.name}</h1>}
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
            <input value={user.account_type} placeholder="Account Type"/>
            <input value={user.password} type="password" onChange={ev => setUser({...user, password: ev.target.value})} placeholder="Password"/>
            <input value={user.password_confirmation} type="password" onChange={ev => setUser({...user, password_confirmation: ev.target.value})} placeholder="Confirm Password"/>
            <button className="btn">Save</button>
        </form>
        }
    </div>
    </>
  )
}

export default DonorProfile

