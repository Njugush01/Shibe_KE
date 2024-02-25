import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import Pagination from "../Pagination";
import toast, { Toaster } from 'react-hot-toast'; 


export default function VolunteerListed() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({});

  const onPageClick = (link) => {
    getListings(link.url);
  };

  useEffect(() => {
    getListings();
    
  }, []);

  const getListings = (url) => {
    url = url || "/auth/listed";
    setLoading(true);
    axiosClient
      .get(url)
      .then(({ data }) => {
        setLoading(false);
        //console.log(data);
        setListings(data.data.map(listing => ({ ...listing, claimed: listing.claimed === 1 })));
        setMeta(data.meta);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  

  const onClaim = (listing) => {
    if (listing.claimed) {
      toast.error('Listing already claimed');
      return;
    }
    axiosClient
      .put(`/auth/listing/${listing.id}/claim`)
      .then((response) => {
        setListings((prevListings) =>
          prevListings.map((item) =>
            item.id === listing.id ? { ...item, claimed: 1 } : item
          )
        );
      })
      .catch((error) => {
        console.error("Error claiming listing:", error);
      });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
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
          {loading && (
            <tbody>
              <tr>
                <td colSpan="7" className="text-center">
                  loading...
                </td>
              </tr>
            </tbody>
          )}
          {!loading && (
            <tbody>
              {listings.map((listing) => (
                <tr key={listing.id}>
                  <td>{listing.id}</td>
                  <td>{listing.title}</td>
                  <td>{listing.description}</td>
                  <td>{listing.quantity}</td>
                  <td>{listing.expiry_date}</td>
                  <td>{listing.location}</td>
                  <td>{listing.created_at}</td>
                  <td>
                    <button
                      onClick={(ev) => onClaim(listing)}
                    
                      className={
                        listing.claimed == 1  ? "bg-gray-200" : "bg-[#ffff89]"
                      }
                      disabled={listing.claimed}
                    >
                      {listing.claimed == 1 ? "Claimed" : "Claim"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      <Pagination meta={meta} onPageClick={onPageClick} />
      <Toaster/>
    </div>
  );
}
