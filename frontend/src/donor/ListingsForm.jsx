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
    const{setNotification} = useStateContext()
    const [loading, setLoading] = useState(false)
    const [position, setPosition] = useState({ latitude: null, longitude: null });

    const[listing, setListing] = useState({
        id: null,
        title: '',
        description: '',
        quantity: '',
        expiry_date: '',
        location: '',

    })
    const [location, setLocation] = useState('');


    //Whenever the user id is available we want to fetch the listing info and load it into the form
      
        useEffect(() => {
          // if (navigator.geolocation) {
          //   navigator.geolocation.getCurrentPosition((position) => {
          //     setPosition({
          //       latitude: position.coords.latitude,
          //       longitude: position.coords.longitude
          //     });
          //   });
          // } else {
          //   console.log("Geolocation is not supported by this browser.");
          // }
          get() .then((data)=>{
            setLocation(data)
          }) .catch((err)=>{
            setLocation("error")
          })
          // setLocation(get() || "error")
          if (id) {
            setLoading(true)
            axiosClient.get(`/auth/listing/${id}`)
            .then(({data}) =>{
                setLoading(false)
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
      {listing.id && <h1>Update Listing: {listing.title}</h1>}
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
            <input type="number" value={listing.quantity} onChange={ev => setListing({...listing, quantity: ev.target.value})} placeholder="Quantity in kg "/>
            <DatePicker
                selected={listing.expiry_date ? new Date(listing.expiry_date) : null}
                onChange={(date) => setListing({ ...listing, expiry_date: date })}
                placeholderText="Expiry Date"
            />
            { (
            <input
              type="text"
              value={location}
              onChange={ev=> setLocation(ev.target.value)}
              placeholder="Location"
              // readOnly
            />
          )}


            
            <button className="btn">Save</button>
        </form>
        }
      </div>
    </>
  )
}

export default ListingsForm;
