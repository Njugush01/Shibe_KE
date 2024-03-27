import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import toast, { Toaster } from "react-hot-toast";
import { useStateContext } from "../contexts/ContextProvider";
import TButton from "../core/TButton";


const Modal = ({ onClose, listing}) => {
  const [pickupDate, setPickupDate] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {user} = useStateContext();
  const [scheduled, setScheduled] = useState([]);

  useEffect(() => {
    getScheduled();
  }, [])

  const getScheduled = () =>{
    setLoading(true);
    axiosClient
   .get("/auth/scheduled-pickups")
   .then(({ data }) => {
        setLoading(false);
        setScheduled(data.data);
      })
   .catch((err) => {
        setLoading(false);
        setError(err.response.data.message);
      });
  }

  const checkScheduled = (listingId) => {
    for(let i = 0; i < scheduled.length; i++){
      if(scheduled[i].listing_id == listingId){
        return true;
      }
    };
    return false
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const today = new Date();
    const selectedDate = new Date(pickupDate);
    if (selectedDate < today.setHours(0, 0, 0, 0)) {
      toast.error("Pickup date cannot be a past date");
      setLoading(false);
      return;
    }

    const isScheduled = checkScheduled(listing.id);
    if(isScheduled){
      toast.error("This listing is already scheduled for pickup");
      setLoading(false);
      return;
    }

    axiosClient
      .post("/auth/pickup-schedules", {
        listing_id: listing.id,
        user_id: user.id,
        pickup_date: pickupDate ,
        message,
        title: listing.title,
        name: user.name,
      })
      .then(() => {
        setLoading(false);
        toast.success("Pickup scheduled successfully")
        onClose(); 
      })
      .catch((error) => {
        setLoading(false);
        setError("Failed to schedule pickup. Please try again."); 
      });
  };

  
  return (
    <div>
    {listing == null ? <div>Load</div> : 
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-md w-full sm:w-3/4 lg:w-1/2 xl:w-1/3">
        <span className=" top-0 right-0 cursor-pointer" onClick={onClose}>
          &times;
        </span>
        <h2 className="text-lg font-bold mb-4">Schedule Pickup for {listing.title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="pickupDate">Pickup Date</label>
            <input
              type="date"
              id="pickupDate"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
              placeholder="Details pertaining to the pickup (including contact person)"
              required
            ></textarea>
          </div>
          {error && <div className="error">{error}</div>}
          <TButton type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </TButton>
        </form>
      </div>
      <Toaster />
    </div> 
  }
  </div>
  );
};

export default Modal;
