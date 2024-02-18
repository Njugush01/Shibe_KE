import { useEffect, useState } from "react"
import {Link} from "react-router-dom"
import axiosClient from "../axios-client"
import Pagination from "../Pagination";


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
        setListings(data.data)
        setMeta(data.meta)
      })
      .catch(() =>{
       setLoading(false)
      })
  }



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
                <td>{listing.expiry_date}</td>
                <td>{listing.location}</td>
                <td>{listing.created_at}</td>
                <td>
                  {/* <Link className="btn-edit" to={'/auth/listing/'+listing.id}>Accept</Link>
                   &nbsp; */}
                   <button onClick={ev => onDelete(listing)} className="bg-[#ffff89]">Claim</button>
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
