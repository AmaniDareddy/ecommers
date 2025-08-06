
import React from "react";
import "./InvoiceModal.css";

const showOffer = (v) =>
  (v == null || v === 0 ? "—" : (typeof v === "number" ? `${v}% off` : String(v)));

export default function InvoiceModal({ order, onClose }) {
  if (!order) return null;

  // ----- helpers & derived amounts -----
  const money = (v) => `₹${Number(v || 0).toFixed(2)}`;
  const items = Array.isArray(order.items) ? order.items : [];

  const subTotal = items.reduce((s, it) => {
    const quantity = Number(it.quantity ?? it.qty ?? 1);
    const unit = Number(it.unitPrice ?? it.price ?? 0);
    return s + quantity * unit;
  }, 0);

  const delivery = Number(order.deliveryFee ?? 0);
  const offer = Number(order.offer ?? 0);
  const taxRate = Number(order.taxRate ?? 0);
  const tax = (taxRate / 100) * subTotal;
  const grandTotal = subTotal + delivery + tax - offer;

  const dateStr = order.date ? new Date(order.date).toLocaleString() : "—";
  const status = (order.status || "Pending").trim();
  const statusClass =
    status.toLowerCase() === "paid"
      ? "status-chip paid"
      : status.toLowerCase() === "cancelled"
      ? "status-chip cancelled"
      : "status-chip";

  const handlePrint = () => window.print();
  const handleDownload = () => window.print(); // print-to-PDF for now

  return (
    <div className="invoice-backdrop" role="dialog" aria-modal="true">
      <div className="invoice-modal" id="invoiceArea">
        {/* Sticky Header */}
        <div className="invoice-header sticky">
          <div className="invoice-title">🧾 Invoice</div>
          <button className="invoice-close" onClick={onClose} aria-label="Close">
            X
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="invoice-shell scrollable">
          {/* Meta grid */}
          <div className="invoice-meta">
            <div className="meta-block">
              <div className="meta-title">Order Info</div>
              <div className="meta-row">
                <div className="meta-key">Order ID:</div>
                <div className="meta-val">{order.id || order.orderId || "—"}</div>
              </div>
              {!!order.invoiceNo && (
                <div className="meta-row">
                  <div className="meta-key">Invoice #:</div>
                  <div className="meta-val">{order.invoiceNo}</div>
                </div>
              )}
              <div className="meta-row">
                <div className="meta-key">Date:</div>
                <div className="meta-val">{dateStr}</div>
              </div>
              <div className="meta-row">
                <div className="meta-key">Status:</div>
                <div className="meta-val">
                  <span className={statusClass}>{status}</span>
                </div>
              </div>
            </div>

            <div className="meta-block">
              <div className="meta-title">Payment</div>
              <div className="meta-row">
                <div className="meta-key">Method:</div>
                <div className="meta-val">{order.paymentMethod || "N/A"}</div>
              </div>
              {!!order.transactionId && (
                <div className="meta-row">
                  <div className="meta-key">Txn ID:</div>
                  <div className="meta-val">{order.transactionId}</div>
                </div>
              )}
              <div className="meta-row">
                <div className="meta-key">Amount:</div>
                <div className="meta-val">{money(grandTotal)}</div>
              </div>
            </div>

            {(order.customer || order.billingAddress) && (
              <div className="meta-block">
                <div className="meta-title">Billed To</div>
                {order.customer?.name && (
                  <div className="meta-row">
                    <div className="meta-key">Name:</div>
                    <div className="meta-val">{order.customer.name}</div>
                  </div>
                )}
                {order.customer?.phone && (
                  <div className="meta-row">
                    <div className="meta-key">Phone:</div>
                    <div className="meta-val">{order.customer.phone}</div>
                  </div>
                )}
                {order.customer?.email && (
                  <div className="meta-row">
                    <div className="meta-key">Email:</div>
                    <div className="meta-val">{order.customer.email}</div>
                  </div>
                )}
                {order.billingAddress && (
                  <div className="meta-row">
                    <div className="meta-key">Address:</div>
                    <div className="meta-val">
                      {[order.billingAddress.line1, order.billingAddress.line2]
                        .filter(Boolean)
                        .join(", ")}
                      <br />
                      {[order.billingAddress.city, order.billingAddress.state]
                        .filter(Boolean)
                        .join(", ")}{" "}
                      {order.billingAddress.pincode || ""}
                    </div>
                  </div>
                )}
              </div>
            )}

            {order.shippingAddress && (
              <div className="meta-block">
                <div className="meta-title">Shipping Address</div>
                <div className="meta-row">
                  <div className="meta-val">
                    {[order.shippingAddress.line1, order.shippingAddress.line2]
                      .filter(Boolean)
                      .join(", ")}
                    <br />
                    {[order.shippingAddress.city, order.shippingAddress.state]
                      .filter(Boolean)
                      .join(", ")}{" "}
                    {order.shippingAddress.pincode || ""}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Items table with Description & Offer */}
          <table className="invoice-table">
            <thead className="thead-sticky">
              <tr>
                <th style={{ width: "26%" }}>Item</th>
                <th style={{ width: "28%" }}>Description</th>
                <th style={{ width: "12%" }}>Offer</th>
                <th style={{ width: "10%" }}>Quantity</th>
                <th style={{ width: "12%" }}>Unit Price</th>
                <th style={{ width: "12%" }}>Line Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it, idx) => {
                const quantity = Number(it.quantity ?? it.quantity ?? 1);
                const unit = Number(it.unitPrice ?? it.price ?? 0);
                const line = quantity * unit;
                const description = it.description || it.desc || "—";
                const offer =
                  it.offer ||0||
                  it.promo ||
                  (it.offer ? `${it.offer}% off` : "—");
                return (
                  <tr key={idx}>
                    <td>{it.name}</td>
                    <td className="wrap">{description}</td>
                    <td className="wrap">{offer}</td>
                    <td className="num">{quantity}</td>
                    <td className="num">{money(unit)}</td>
                    <td className="num">{money(line)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Totals */}
          <div className="totals">
            <div className="totals-card">
              <div className="total-row muted">
                <div className="label">Subtotal</div>
                <div>{money(subTotal)}</div>
              </div>
              <div className="total-row muted">
                <div className="label">Delivery</div>
                <div>{money(delivery)}</div>
              </div>
              <div className="total-row muted">
                <div className="label">Offer</div>
                <div>-{money(offer)}</div>
              </div>
              <div className="total-row muted">
                <div className="label">Tax ({taxRate}%)</div>
                <div>{money(tax)}</div>
              </div>
              <div className="total-row emph">
                <div className="label">Grand Total</div>
                <div>{money(grandTotal)}</div>
              </div>
            </div>
          </div>

          {/* Notes & actions */}
          <div className="invoice-actions">
            <div className="note">
              <div className="faint">
                Payment Method: {order.paymentMethod || "N/A"}
              </div>
              {order.note && <div className="faint">Note: {order.note}</div>}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn btn-outline" onClick={handlePrint}>
                Print
              </button>
              <button className="btn btn-primary" onClick={handleDownload}>
                ⬇ Download Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
