import { useEffect, useState } from "react"
import axiosClient from "../axios-client"
import Pagination from "../Pagination";
import Status from "../Status";


export default function ListedFoods() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({})

  const onPageClick = (link) => {
    getListings(link.url);
  };

  useEffect(() => {
    getListings();
  }, [])


  const getListings = (url) => {
    url = url || '/auth/listed';
    setLoading(true)
    axiosClient.get(url)
      .then(({data}) =>{
        setLoading(false)
        // console.log(data.data)
        setListings(data.data)
        setMeta(data.meta)
      })
      .catch(() =>{
       setLoading(false)
      })
  }

  const updateStatus = (id, status) => {
    axiosClient
      .put(`/auth/listing/${id}/status`, { status })
      .then((res) => {
        console.log(res.data);
        
        getListings();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const sendEmail = (email,status,data) => {
  //   let subject = "";
  //   let message = "";
  //   if (status === 1){
  //     subject = "Donation accepted"
  //     message = `Hello, Your donation ${data.title} with the ID ${data.id} has been accepted`
  //   } else{
  //     subject = "Donation declined"
  //     message = `Hello, Your donation  ${data.title} with the ID ${data.id} has been declined`
  //   }
  
      

  //   let payload = {
  //     subject: subject,
  //     message: message,
  //     recipient:"elvisnjuguna97@gmail.com",
  //     op:"send"
  // }
  //   axiosClient.post('http://127.0.0.1:5006', payload)
  //  .then((res) => {
  //       console.log(res.data)
  //     })
  //  .catch((error) => {
  //       console.log(error)
  //     })
  // }



  return (
<div>
       <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1 className="font-bold text-2xl">Listed Food</h1>
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
              <th>Create Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          {loading && 
          <tbody>
            <tr>
              <td colSpan="9" className="text-center">
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
                <td>{listing.expiry_date}</td>
                <td>{listing.location}</td>
                <td>{listing.created_at}</td>
                <td>{Status(listing.status)}</td>
                <td>
                   <button onClick={()=>{updateStatus(listing.id, 1,listing)}} className="btn-add">Accept</button> &nbsp;
                   <button onClick={()=>{updateStatus(listing.id, 2,listing)}} className="btn-delete">Reject</button>
                </td>
            </tr>
          ))}
          </tbody>
          }
        </table>
      </div>
      <Pagination meta={meta} onPageClick={onPageClick} />
    </div>
    
  )
}
