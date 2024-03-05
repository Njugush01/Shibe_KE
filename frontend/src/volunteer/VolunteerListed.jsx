import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import Pagination from "../Pagination";
import toast, { Toaster } from "react-hot-toast";
import searchObjectsByValue from "../Search";
import SearchClaimed from "../core/SearchClaimed";


export default function VolunteerListed() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedListings, setSearchedListings] = useState([]);

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
        SearchClaimed(data.data)
        setListings(data.data);
        setMeta(data.meta);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onClaim = (listing) => {
    if (listing.claimed) {
      toast.error("Listing already claimed");
      return;
    }
    axiosClient
      .put(`/auth/listing/${listing.id}/claim`)
      .then(() => {
        const updatedListings = listings.map((item) => {
          if (item.id === listing.id) {
            return {
              ...item,
              claimed: 1,
            };
          }
          return item;
        });
        setListings(updatedListings);
      })
      .catch((error) => {
        console.error("Error claiming listing:", error);
      });

    // .put(`/auth/listing/${listing.id}/claim`)
    // .then((response) => {
    //   setListings((prevListings) =>
    //     prevListings.map((item) =>
    //       item.id === listing.id ? { ...item, claimed: 1 } : item
    //     )
    //   );
    // })
    // .catch((error) => {
    //   console.error("Error claiming listing:", error);
    // });
  };

  const handleSearch = (e) => {
    const input = e.target.value;
    setSearchQuery(input);
    setSearchedListings(searchObjectsByValue(listings, input));
  };

  const search = (listings) => {
    return listings.map((listing) => (
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
            className={listing.claimed == 1 ? "bg-gray-200" : "bg-[#ffff89]"}
            disabled={listing.claimed}
          >
            {listing.claimed == 1 ? "Claimed" : "Claim"}
          </button>
        </td>
      </tr>
    ));
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
              {searchQuery.length == 0 ? search(listings) : search(searchedListings)}
            </tbody>
          )}
        </table>
      </div>
      <Pagination meta={meta} onPageClick={onPageClick} />
      <Toaster />
    </div>
  );
}
