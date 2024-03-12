import React, { useState, useEffect, useRef } from "react";
import axiosClient from "../axios-client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useStateContext } from "../contexts/ContextProvider";
import generatePdf from "./PdfFileCopy";
import TButton from "../core/TButton";

function DataView() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const componentRef = useRef();
  const { user } = useStateContext();
  const [filteredData, setFilteredData] = useState([]);

  //   useEffect(() => {
  //     fetchData();
  //   }, [selectedDate]);

  useEffect(() => {
    getListings();
  }, [selectedDate]);

  const getListings = () => {
    setLoading(true);
    axiosClient
      .get("/auth/listing")
      .then(({ data }) => {
        setLoading(false);
        //console.log(data);
        setListings(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  // Filter users based on selected month
  const filteredListings = (chosenDate) => {
    // if(chosenDate.getMonth() === null){
    //     setFilteredData(users);
    //     return;
    // }
    try {
      const filtered = listings.filter((listing) => {
        const date = new Date(listing.created_at);
        return (
          date.getMonth() === chosenDate.getMonth() &&
          date.getFullYear() === chosenDate.getFullYear()
        );
      });
      setFilteredData(filtered);
      console.log(selectedDate);
     console.log(filtered);
    } catch (err) {
      setFilteredData(listings);
    }
  };
  // // Function to handle printing
  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  // });

  const checkSelectedDate = () => {
    if (selectedDate.getMonth() == null) {
      return 0;
    } else {
      return selectedDate;
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <div>
          <label className="mr-2">Select Month:</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              console.log(date);
              filteredListings(date);
            }}
            dateFormat="MMMM yyyy"
            showMonthYearPicker
            className="border rounded-md px-3 py-1"
          />
        </div>
        <TButton
          onClick={() => {
            generatePdf(filteredData, "Listings Report", user.name, new Date(), selectedDate);
          }}
        >
          Print Report
        </TButton>
      </div>
      {loading && <div>Loading...</div>}
      {!loading && (
        <div ref={componentRef}>
          {checkSelectedDate > new Date() ? (
            <div>No data available for future months</div>
          ) : (
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
                </tr>
              </thead>
              <tbody>
                {filteredData.map((listing) => (
                <tr key={listing.id}>
                  <td>{listing.id}</td>
                  <td>{listing.title}</td>
                  <td>{listing.description}</td>
                  <td>{listing.quantity}</td>
                  <td>{listing.expiry_date}</td>
                  <td>{listing.location}</td>
                  <td>{listing.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default DataView;
