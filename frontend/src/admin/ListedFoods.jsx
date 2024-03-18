import { useEffect, useState } from "react"
import axiosClient from "../axios-client"
import Pagination from "../Pagination";
//import Status from "../Status";
import searchObjectsByValue from "../Search";
import SearchStatus from "../core/SearchStatus";


export default function ListedFoods() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({})
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedListings, setSearchedListings] = useState([]);

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
        //console.log(data.data)
        setListings(data.data)
        SearchStatus(data.data)
        //console.log(SearchStatus(data.data))
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
  
  const handleSearch = (e) => {
    const input = e.target.value;
    setSearchQuery(input);
    setSearchedListings(searchObjectsByValue(listings, input));
    // console.log(input)
    // console.log(users)

  };

  const search = (listings) => {
    return listings.map(listing =>(
      <tr key={listing.id}>
      <td>{listing.id}</td>
      <td>{listing.title}</td>
      <td>{listing.description}</td>
      <td>{listing.quantity}</td>
      <td>{listing.expiry_date}</td>
      <td>{listing.location}</td>
      <td>{listing.created_at}</td>
      <td>{(listing.status)}</td>
      <td>
         <button onClick={()=>{updateStatus(listing.id, 1,listing)}} className="btn-add">Accept</button> &nbsp;
         <button onClick={()=>{updateStatus(listing.id, 2,listing)}} className="btn-delete">Reject</button>
      </td>
  </tr>
))
  }

  return (
<div>
       <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1 className="font-bold text-2xl">Listed Food</h1>
      </div>
      <div className="card animated fadeInDown">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearch}
          className="border border-gray-300 rounded px-3 py-2 mt-4 mb-2 w-full"
        />
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Category</th>
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
          
          {!loading && (
            <tbody>
              {searchQuery.length == 0 ? search(listings) : search(searchedListings)}
            </tbody>
          )}
        </table>
      </div>
      <Pagination meta={meta} onPageClick={onPageClick} />
    </div>
    
  )
}
