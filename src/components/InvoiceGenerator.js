import React from "react";

const InvoiceGenerator = ({ order }) => {
  const handleDownload = () => {
    const content = `
      Order ID: ${order.id}
      Date: ${order.date}
      Total: ₹${order.total}
      Items: ${order.items.map(i => i.name).join(", ")}
      Status: ${order.status}
    `;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `${order.id}_invoice.txt`;
    link.href = url;
    link.click();
  };

  return (
    <button className="invoice-btn" onClick={handleDownload}>
      Download Invoice
    </button>
  );
};

export default InvoiceGenerator;
