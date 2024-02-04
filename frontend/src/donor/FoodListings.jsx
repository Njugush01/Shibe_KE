import { useEffect, useState } from "react"
import {Link} from "react-router-dom"
import axiosClient from "../axios-client"
//import { useStateContext } from "../contexts/ContextProvider"

export default function FoodListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getListings();
  }, [])

  const onDelete = (listing) => {
    if(!window.confirm("Are you sure you want to delete this listing?")) {
      return
    }

    //removing the deleted user from the list
    axiosClient.delete(`/auth/listing/${listing.id}`)
    .then(() => {
      setNotification("Listing was successfully deleted")
      getUsers()
    })
  }

  const getListings = () => {
    setLoading(true)
    axiosClient.get('/listing')
      .then(({data}) =>{
        setLoading(false)
        setListings(data.data)
      })
      .catch(() =>{
       setLoading(false)
      })
  }



  return (
<div>
       <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1>Food Listings</h1>
        <Link to="/auth/listing/new" className="btn-add">Add new</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Food Type</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Expiry Date</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          {loading && 
          <tbody>
            <tr>
              <td colSpan="7" className="text-center">
                loading...
              </td>
            </tr>
          </tbody>
          }

          {!loading &&
            <tbody>
              {listings.map(listing =>(
                <tr key={listing.id}>
                <td>{listing.id}</td>
                <td>{listing.title}</td>
                <td>{listing.description}</td>
                <td>{listing.quantity}</td>
                <td>{listing.expiryDate}</td>
                <td>{listing.location}</td>
                <td>{listing.created_at}</td>
                <td>
                  <Link className="btn-edit" to={'/auth/listing/'+u.id}>Edit</Link>
                   &nbsp;
                   <button onClick={ev => onDelete(listing)} className="btn-delete">Delete</button>
                </td>
            </tr>
          ))}
          </tbody>
          }
        </table>
      </div>
    </div>
  )
}
