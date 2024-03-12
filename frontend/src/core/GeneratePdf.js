import jsPDF from 'jspdf';

const generatePdf = (data, selectedDate) => {
  // Create a new jsPDF instance
  const doc = new jsPDF();

  // Set document metadata
  doc.setProperties({
    title: 'Monthly Report',
    subject: 'Generated Monthly Report',
    author: 'Your Name',
    keywords: 'report, monthly report',
  });

  // Add content to the PDF
  doc.setFontSize(12);
  doc.text(`Monthly Report - ${selectedDate}`, 15, 15);

  // Format and add data to the PDF
  let yPos = 30;
  data.forEach((item, index) => {
    const formattedData = `${index + 1}. ${item.property1}: ${item.property2}`; // Adjust according to your data structure
    doc.text(formattedData, 15, yPos);
    yPos += 10;
  });

  // Save or download the PDF
  doc.save(`monthly_report_${selectedDate}.pdf`);
};

export default generatePdf;
