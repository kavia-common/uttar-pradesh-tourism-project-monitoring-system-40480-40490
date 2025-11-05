import React from "react";

// PUBLIC_INTERFACE
export default function Dashboard() {
  /** Dashboard landing page showing a minimal summary layout. */
  return (
    <div>
      <h2>Dashboard Overview</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 12 }}>
        <div className="card">
          <h3>Total Projects</h3>
          <p>—</p>
        </div>
        <div className="card">
          <h3>Active Tenders</h3>
          <p>—</p>
        </div>
        <div className="card">
          <h3>Pending Payments</h3>
          <p>—</p>
        </div>
      </div>
    </div>
  );
}
