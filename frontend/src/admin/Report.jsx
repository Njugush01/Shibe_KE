import React, { useState } from "react";
import DownloadCard from "../core/DownloadCard";
import { ArrowDownCircleIcon } from "@heroicons/react/20/solid";
import TButton from "../core/TButton";
import generatePdf from "../core/PdfFileCopy";
import { useEffect } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import { EyeIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";


function Report() {
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [users, setUsers] = useState([]);
  const { user } = useStateContext();

  useEffect(() => {
    getListings();
  }, []);

  const getListings = () => {
    setLoading(true);
    axiosClient
      .get("/auth/listed")
      .then(({ data }) => {
        setLoading(false);
        setListings(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    setLoading(true);
    axiosClient
      .get("/auth/users")
      .then(({ data }) => {
        setLoading(false);
        setUsers(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  // State to handle PDF download
  // const [generatePdf, setGeneratePdf] = useState(false);

  return (
    <div>
      {loading && <div className="flex justify-center">Loading...</div>}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-gray-800">
          <DownloadCard
            title="Donations Report"
            className="order-1 lg:order-2"
            style="animation-delay: 0.1s"
          >
            {/* <div
              onClick={() => {
                const currentDate = new Date();
                generatePdf(
                  listings,
                  "Listings Report",
                  user.name,
                  currentDate
                );
              }}
              className="flex justify-between"
            > */}
              <Link to="/auth/dataView-L">
              <TButton link>
                <EyeIcon className="w-5 h-5 mr-2" />
                View Data
              </TButton>
            </Link>
            
          </DownloadCard>
          <DownloadCard
            title="User Data Report"
            className="order-1 lg:order-2"
            style="animation-delay: 0.1s"
          >
            {/* <div
              onClick={() => {
                const currentDate = new Date();
                generatePdf(users, "Users Report",user.name, currentDate);
              }}
              className="flex justify-between"
            > */}
            <Link to="/auth/data-view">
              <TButton link>
                <EyeIcon className="w-5 h-5 mr-2" />
                View Data
              </TButton>
            </Link>
          </DownloadCard>
        </div>
      )}

      {/* Render PdfFile component if generatePdf is true */}
      {/* {generatePdf && <PdfFile listings={listings} />} */}
    </div>
  );
}

export default Report;
