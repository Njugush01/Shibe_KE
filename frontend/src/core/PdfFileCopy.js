// PdfGenerator.js
import { jsPDF } from "jspdf";
import "jspdf-autotable";


   export default function generatePdf (listings) {
    const doc = new jsPDF();
    const columns = [
      "ID",
      "Title",
      "Description",
      "Quantity",
      "Expiry_date",
      "Location",
      "Created_at",
    ];
    const data = [];

    listings.forEach((listing) => {
      data.push([
        listing.id,
        listing.title,
        listing.description,
        listing.quantity,
        listing.expiry_date,
        listing.location,
        listing.created_at,
      ]);
    });

    let startY = 10;
    doc.text("Listings Report", 14, startY);
    startY += 10;
    doc.autoTable({
      startY,
      head: [columns],
      body: data,
    });
    doc.save("listings_report.pdf");
  };

  

  


