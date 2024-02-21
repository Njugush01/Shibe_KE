import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../axios-client"
import { useStateContext } from "../contexts/ContextProvider";
import DatePicker from "react-datepicker";
import get from "../GetIp"
import "react-datepicker/dist/react-datepicker.css";



function ListingsForm() {
    const {id} = useParams()
    const navigate = useNavigate();
    const [errors, setErrors] = useState(null)
    const{setNotification, user} = useStateContext()
    const [loading, setLoading] = useState(false)
    const [location, setLocation] = useState('');
    const[listing, setListing] = useState({
        id: null,
        title: '',
        description: '',
        quantity: '',
        email: JSON.parse(localStorage.getItem('user')).email,
        expiry_date: '',
        location: location,

    })
    


    //Whenever the user id is available we want to fetch the listing info and load it into the form
      
        useEffect(() => {
          get() .then((data)=>{
            setListing({...listing, location: data})
          }) .catch((err)=>{
            setLocation("error")
          })
          
          if (id) {
            setLoading(true)
            axiosClient.get(`/auth/listing/${id}`)
            .then(({data}) =>{
                setLoading(false)
                // console.log(data)
                setListing(data)
            })
            .catch(() =>{
                setLoading(false)
            })
          }
        },[])
      

    //implementing save or form submit
    const onSubmit = (ev) =>{
        ev.preventDefault();
        // console.log(listing)
        if (listing.id) {
            axiosClient.put(`/auth/listing/${id}`,listing)
            .then(() =>{
                //show notification
                setNotification("Listing was successfully updated")
                navigate('/auth/listing')
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
      {listing.id && <h1 className="font-bold text-2xl">Update Listing: {listing.title}</h1>}
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
            <div className="select-wrapper">
              <select
                value={listing.title}
                onChange={(ev) =>
                  setListing({ ...listing, title: ev.target.value })
                }
              >
                <option value="">Select Food Type</option>
                <option value="cereals">Cereals</option>
                <option value="vegetables">Vegetables</option>
                <option value="dairy products">Dairy Products</option>
                <option value="meats">Meats</option>
                <option value="shopping">Shopping</option>
              </select>
            </div>
            <textarea value={listing.description} onChange={ev => setListing({...listing, description: ev.target.value})} placeholder="Description"/>
            <input type="number" value={listing.quantity} onChange={ev => setListing({...listing, quantity: ev.target.value})} placeholder="Quantity in kg "/>
            <DatePicker
                selected={listing.expiry_date ? new Date(listing.expiry_date) : null}
                onChange={(date) => setListing({ ...listing, expiry_date: date })}
                placeholderText="Expiry Date"
            />
            { (
            <input
              type="text"
              value={listing.location}
              onChange= {(ev)=> {setListing({...listing, location: ev.target.value});}}
              placeholder="Location"
              // readOnly
            />
          )}   
            <button className="btn">Submit</button>
        </form>
        }
      </div>
    </>
  )
}

export default ListingsForm;
