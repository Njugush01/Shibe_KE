import React, { useState } from 'react';
import DownloadCard from '../core/DownloadCard';
import { ArrowDownCircleIcon } from '@heroicons/react/20/solid';
import TButton from '../core/TButton';
import PdfFile from '../core/PdfFile';
import { useEffect } from 'react';
import axiosClient from '../axios-client';

function Report() {
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);

  useEffect(() =>{
    getListings();
  }, []);

  const getListings = () => {
    setLoading(true)
    axiosClient.get('/auth/listed')
    .then(({data}) =>{
        setLoading(false)
        setListings(data.data)
      })
    .catch(() =>{
       setLoading(false)
      })
  }

  // State to handle PDF download
  const [generatePdf, setGeneratePdf] = useState(false);

  return (
    <div>
      {loading && <div className="flex justify-center">Loading...</div>}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-gray-800">
          <DownloadCard
            title="Download Donations Report"
            className="order-1 lg:order-2"
            style="animation-delay: 0.1s"
          >
            <div className="flex justify-between">
              <TButton onClick={() => setGeneratePdf(true)}> {/* Set generatePdf to true when button is clicked */}
                <ArrowDownCircleIcon className="w-5 h-5 mr-2" />
                Download
              </TButton>
            </div>
          </DownloadCard>
        </div>
      )}

      {/* Render PdfFile component if generatePdf is true */}
      {generatePdf && <PdfFile listings={listings} />}
    </div>
  );
}

export default Report;
