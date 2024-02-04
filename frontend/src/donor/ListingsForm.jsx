import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../axios-client"
import { useStateContext } from "../contexts/ContextProvider";


function ListingsForm() {
    const {id} = useParams()
    const [errors, setErrors] = useState(null)
    const{setNotification} = useStateContext()
    const [loading, setLoading] = useState(false)
    const[listing, setListing] = useState({
        id: null,
        title: '',
        description: '',
        quantity: '',
        expiry_date: '',
        location: '',

    })

    if (id) {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/auth/listing/${id}`)
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
        if (listing.id) {
            axiosClient.put(`/auth/listing/${id}`,user)
            .then(() =>{
                //show notification
                setNotification("Listing was successfully updated")
                navigate('/listing')
            })
            
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                    setErrors(response.data.errors)
                }
            })

        } else {
            axiosClient.post(`/auth/listing/`, listing)
              .then(() => {
                setNotification("Listing was successfully created")
                navigate('/auth/listing')
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
      {listing.id && <h1>Update Listing: {listing.name}</h1>}
      {!listing.id && <h1>New Listing</h1>}
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
            <input value={listing.title} onChange={ev => setListing({...listing, title: ev.target.value})} placeholder="Food Type"/>
            <textarea value={listing.description} onChange={ev => setListing({...listing, description: ev.target.value})} placeholder="Description"/>
            <input type="number" onChange={ev => setListing({...listing, quantity: ev.target.value})} placeholder="Quantity"/>
            <input type="text" onChange={ev => setListing({...listing, expiry_date: ev.target.value})} placeholder="Expiry Date"/>
            <button className="btn">Save</button>
        </form>
        }
      </div>
    </>
  )
}

export default ListingsForm
