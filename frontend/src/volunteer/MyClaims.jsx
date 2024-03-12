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
import { ArrowDownCircleIcon } from "@heroicons/react/20/solid";

export default function MyClaims() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null); // Initialize selectedDate as null
  const { user } = useStateContext();

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
          new Date(listing.created_at).getFullYear() === selectedDate.getFullYear()
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
    const title = `My claimed listings ${
      selectedDate
        ? `for the month of ${selectedDate.toLocaleString("en-US", {
            month: "long",
          })} ${selectedDate.getFullYear()}`
        : ""
    }`;
    const textWidth =
      doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const centerX = (doc.internal.pageSize.getWidth() - textWidth) / 2;
    doc.setFontSize(18);
    doc.text(title, centerX, 50);

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

    // Add table
    doc.autoTable({
      head: [
        ["ID", "Food Type", "Description", "Quantity", "Expiry Date", "Location", "Create Date"],
      ],
      body: tableData,
      startY: 70,
    });

    doc.save("claimed_listings.pdf");
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
                <th>Create Date</th>
              </tr>
            </thead>
            <tbody>
              {claims
                .filter((listing) => {
                  if (!selectedDate) return true; // Return all listings if no month is selected
                  return (
                    new Date(listing.created_at).getMonth() === selectedDate.getMonth() &&
                    new Date(listing.created_at).getFullYear() === selectedDate.getFullYear()
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
                    <td>{listing.created_at}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
