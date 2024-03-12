import React, { useState } from "react";
import generatePdf from "../core/PdfFileCopy";
import { useEffect } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import DownloadCard from "../core/DownloadCard";
import { ArrowDownCircleIcon } from "@heroicons/react/20/solid";
import TButton from "../core/TButton";
import { Link } from "react-router-dom";
import { EyeIcon } from "@heroicons/react/24/outline";

export default function DonorReport() {
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const { user } = useStateContext();

  useEffect(() => {
    getListings();
  }, []);

  const getListings = () => {
    setLoading(true);
    axiosClient
      .get("/auth/listing")
      .then(({ data }) => {
        setLoading(false);
        setListings(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

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
              <Link to="/auth/dataView-D">
              <TButton link>
                <EyeIcon className="w-5 h-5 mr-2" />
                View Data
              </TButton>
            </Link>
            
          </DownloadCard>
        </div>
      )}
    </div>
  );
}
