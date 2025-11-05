import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./dashboard.css";
import config from "../config";

// PUBLIC_INTERFACE
export default function DashboardLayout() {
  /** Main dashboard layout with sidebar navigation and top header. */
  const location = useLocation();

  return (
    <div className="layout-root">
      <aside className="sidebar">
        <div className="brand">{config.appName}</div>
        <nav className="nav">
          <Link className={location.pathname.startsWith("/dashboard") ? "active" : ""} to="/dashboard">Overview</Link>
          <Link className={location.pathname.startsWith("/projects") ? "active" : ""} to="/projects">Projects</Link>
          <Link className={location.pathname.startsWith("/users") ? "active" : ""} to="/users">Users</Link>
        </nav>
      </aside>
      <main className="content">
        <header className="topbar">
          <span className="topbar-title">UPSTDC Admin</span>
          <div className="spacer" />
          <small className="env">API: {config.apiBaseUrl}</small>
        </header>
        <section className="page">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
