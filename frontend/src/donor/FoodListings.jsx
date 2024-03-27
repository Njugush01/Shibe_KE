import { useEffect, useState } from "react"
import {Link} from "react-router-dom"
import axiosClient from "../axios-client"
import Pagination from "../Pagination";
import Status from "../Status";
import { useStateContext } from "../contexts/ContextProvider";
import searchObjectsByValue from "../Search";
import SearchStatus from "../core/SearchStatus";
import Modal from "../donor/SchedulePickup";


export default function FoodListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({});
  const {setNotification} = useStateContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedListings, setSearchedListings] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const [selectedListing, setSelectedListing] = useState(null);

  const onPageClick = (link) => {
    getListings(link.url)
  }


  useEffect(() => {
    getListings();
  }, [])

  const onDelete = (listing) => {
    if(!window.confirm("Are you sure you want to delete this listing?")) {
      return
    }

    //removing the deleted listing from the list
    axiosClient.delete(`/auth/listing/${listing.id}`)
    .then(() => {
      setNotification("Listing was successfully deleted")
      getListings()
    })
  }

  const getListings = (url) => {
    url = url || '/auth/listing'
    setLoading(true)
    axiosClient.get(url)
      .then(({data}) =>{
        setLoading(false)
        setListings(data.data)
        SearchStatus(data.data)
        setMeta(data.meta)
      })
      .catch(() =>{
       setLoading(false)
      })
  }

  const handleSearch = (e) => {
    const input = e.target.value;
    setSearchQuery(input);
    setSearchedListings(searchObjectsByValue(listings, input));
    // console.log(input)
    // console.log(users)

  };

  const openModal = (listing) => {
    setSelectedListing(listing);
    setShowModal(true);
  };


  const search = (listings) => {
    return listings.map(listing =>(
      <tr className="hover:cursor-pointer" key={listing.id} onClick={() => openModal(listing)}>
      <td>{listing.id}</td>
      <td>{listing.title}</td>
      <td>{listing.description}</td>
      <td>{listing.quantity}</td>
      <td>{listing.expiry_date}</td>
      <td>{listing.location}</td>
      <td>{listing.created_at}</td>
      <td>{(listing.status)}</td>
      <td>
                  <Link className="btn-edit" to={'/auth/listing/'+listing.id}>Edit</Link>
                   {/* &nbsp;
                   <button onClick={ev => onDelete(listing)} className="btn-delete">Delete</button> */}
                </td>
            </tr>
          ))

  }



  return (
<div>
       <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1 className='font-bold text-2xl'>Food Listings</h1>
        <Link to="/auth/listing/new" className="btn-add">Add new</Link>
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

          {!loading &&
            <tbody>
              {searchQuery.length == 0 ? search(listings) : search(searchedListings)}
          </tbody>
          }
        </table>
      </div>
      <Pagination meta={meta} onPageClick={onPageClick} />
      {/* Render modal if showModal is true */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)} listing={selectedListing} />
      )}
    </div>
  )
}
