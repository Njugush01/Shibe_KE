import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axiosClient from "../axios-client";
import jsPDF from "jspdf";
import "jspdf-autotable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useStateContext } from "../contexts/ContextProvider";
import companyLogo from "../assets/pdflogo.png";
import TButton from "../core/TButton";


export default function MyClaims() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null); // Initialize selectedDate as null
  const { user } = useStateContext();
  const [checkPickUp, setCheckPickUp] = useState(0);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    getListings();
  }, []);

  const getListings = (url) => {
    url = url || "/auth/listings/my-claims";
    setLoading(true);
    axiosClient
      .get(url)
      .then(({ data }) => {
        setLoading(false);
        setClaims(data);
      })
      .catch((e) => {
        setLoading(false);
        toast.error("Failed " + e);
      });
  };

  const handlePDFDownload = () => {
    const doc = new jsPDF();
    const tableData = claims
      .filter((listing) => {
        if (!selectedDate) return true; // Return all listings if no month is selected
        return (
          new Date(listing.created_at).getMonth() === selectedDate.getMonth() &&
          new Date(listing.created_at).getFullYear() ===
            selectedDate.getFullYear()
        );
      })
      .map((listing) => [
        listing.id,
        listing.title,
        listing.description,
        listing.quantity,
        listing.expiry_date,
        listing.location,
        listing.created_at,
      ]);

    if (tableData.length === 0) {
      alert("No claimed listings available for selected month");
      return;
    }

    // Add logo
    const logo = new Image();
    logo.src = companyLogo;
    doc.addImage(logo, "PNG", 10, 10, 30, 30);

    // Add title
    const title = `Claimed listings ${
      selectedDate
        ? `for the month of ${selectedDate.toLocaleString("en-US", {
            month: "long",
          })} ${selectedDate.getFullYear()}`
        : ""
    }`;
    const textWidth =
      (doc.getStringUnitWidth(title) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    const centerX = (doc.internal.pageSize.getWidth() - textWidth) / 2;
    doc.setFontSize(18);
    doc.text(title, centerX, 50);

  const additionalText = "Thank you for your unwavering dedication and support in our efforts to combat hunger. Here is a list of the foods you have collected:";
  const paragraphLines = doc.splitTextToSize(additionalText, doc.internal.pageSize.getWidth() - 5);
  doc.setFontSize(11);
  doc.text(paragraphLines, 15, 70);

    // Add current date and person who generated the document
    const generatedDate = new Date();
    const generatedBy = user.name;
    doc.setFontSize(10);
    doc.text(
      `Generated on: ${generatedDate.toLocaleString()} by: ${generatedBy}`,
      150,
      15,
      "right"
    );

  const spaceHeight = paragraphLines.length * 12 + -5; // Height of paragraph + additional spacing
  const tableStartY = 70 + spaceHeight; 

    // Add table
    doc.autoTable({
      head: [
        [
          "ID",
          "Food Type",
          "Description",
          "Quantity",
          "Expiry Date",
          "Location",
          "Create Date",
        ],
      ],
      body: tableData,
      startY: tableStartY,
    });

    doc.save("claimed_listings.pdf");
  };

  const onPickUp = (listing) => {
    setCheckPickUp(listing.id);
    axiosClient
      .put(`/auth/listing/${listing.id}/pickup`)
      .then((response) => {
        const updatedClaims = claims.map((claim) => {
          if (claim.id === listing.id) {
            return { ...claim, pickup_status: 1 }; // Assuming pickup_status 1 means 'Picked'
          }
          return claim;
        });
        setClaims(updatedClaims);
  
        // Update listings state to reflect the change
        const updatedListings = listings.map((item) => {
          if (item.id === listing.id) {
            return { ...item, pickup_status: 1 }; 
          }
          return item;
        });
        setListings(updatedListings);
  
        toast.success("Pick up status successfully updated");
        setCheckPickUp(0);
      })
      .catch((error) => {
        setCheckPickUp(0);
        console.error("Error picking up listing:", error);
      });
  };
  

  return (
    <div>
      <h1 className="font-bold text-2xl">My Claims</h1>
      <div className="flex justify-between mb-4">
        <div>
          <label className="mr-2">Select Month:</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              console.log(date);
            }}
            dateFormat="MMMM yyyy"
            showMonthYearPicker
            className="border rounded-md px-3 py-1"
          />
        </div>
        <TButton onClick={handlePDFDownload}>Download PDF</TButton>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : claims.length === 0 ? (
        <p>No claimed listings yet.</p>
      ) : (
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
                <th>Pickup Status</th>
              </tr>
            </thead>
            <tbody>
              {claims
                .filter((listing) => {
                  if (!selectedDate) return true; // Return all listings if no month is selected
                  return (
                    new Date(listing.created_at).getMonth() ===
                      selectedDate.getMonth() &&
                    new Date(listing.created_at).getFullYear() ===
                      selectedDate.getFullYear()
                  );
                })
                .map((listing) => (
                  <tr key={listing.id}>
                    <td>{listing.id}</td>
                    <td>{listing.title}</td>
                    <td>{listing.description}</td>
                    <td>{listing.quantity}</td>
                    <td>{listing.expiry_date}</td>
                    <td>{listing.location}</td>
                    <td>
                      <button
                        onClick={(ev) => {
                          onPickUp(listing);
                        }}
                        className={
                          listing.pickup_status == 1
                            ? "bg-gray-200"
                            : "bg-[#f7465b] "
                        }
                        disabled={listing.pickup_status}
                      >
                        {checkPickUp == listing.id
                          ? "..."
                          : listing.pickup_status == 1
                          ? "Picked"
                          : "Pending"}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
      <Toaster />
    </div>
  );
}
