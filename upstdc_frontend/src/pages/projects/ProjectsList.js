import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listProjects, deleteProject } from "../../api/projects";

// PUBLIC_INTERFACE
export default function ProjectsList() {
  /** Projects list with basic CRUD actions. */
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  async function fetchData() {
    setErr("");
    setLoading(true);
    try {
      const data = await listProjects();
      setRows(Array.isArray(data) ? data : []);
    } catch (e) {
      setErr("Failed to load projects");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function onDelete(id) {
    if (!window.confirm("Delete this project?")) return;
    try {
      await deleteProject(id);
      await fetchData();
    } catch (e) {
      alert("Delete failed");
    }
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
        <h2 style={{ margin: 0, marginRight: "auto" }}>Projects</h2>
        <button className="btn" onClick={() => navigate("/projects/new")}>New Project</button>
      </div>
      <div className="card">
        {loading ? (
          <div>Loading...</div>
        ) : err ? (
          <div style={{ color: "#ef4444" }}>{err}</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Budget</th>
                <th>Status</th>
                <th style={{ width: 220 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p.id || p._id || p.name}>
                  <td>{p.name}</td>
                  <td>{p.budget}</td>
                  <td>{p.status}</td>
                  <td className="actions">
                    <Link className="btn secondary" to={`/projects/${p.id || p._id}`}>View</Link>
                    <Link className="btn secondary" to={`/projects/${p.id || p._id}/edit`}>Edit</Link>
                    <button className="btn danger" onClick={() => onDelete(p.id || p._id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan="4">No projects found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
