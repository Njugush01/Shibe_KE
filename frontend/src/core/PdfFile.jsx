// PdfGenerator.js
import React from 'react';
import { jsPDF } from 'jspdf';

const PdfFile = ({ listings }) => {
  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.text(20, 20, 'Food Listings Report:');
    let y = 30;
    doc.text(20, y,)
    listings.forEach((listing) => {
      doc.text(20, y, `ID: ${listing.id}`);
      doc.text(40, y, `Food Type: ${listing.title}`);
      doc.text(80, y, `Description: ${listing.description}`);
      doc.text(130, y, `Quantity: ${listing.quantity}`);
      doc.text(160, y, `Expiry Date: ${listing.expiry_date}`);
      doc.text(200, y, `Location: ${listing.location}`);
      doc.text(240, y, `Create Date: ${listing.created_at}`);
      y += 10;
    });

    doc.save('food_listings.pdf');
  };

  return (
    <button onClick={downloadPdf}>Download PDF</button>
  );
};

export default PdfFile;

