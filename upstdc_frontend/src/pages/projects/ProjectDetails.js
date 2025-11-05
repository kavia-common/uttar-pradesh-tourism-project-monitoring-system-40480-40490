import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProject } from "../../api/projects";

// PUBLIC_INTERFACE
export default function ProjectDetails() {
  /** Read-only view of a project record. */
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await getProject(id);
        setData(res);
      } catch (e) {
        setErr("Failed to load project");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (err) return <div style={{ color: "#ef4444" }}>{err}</div>;
  if (!data) return <div>Not found</div>;

  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>{data.name}</h2>
      <p>{data.description}</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
        <div><strong>Budget:</strong> {data.budget}</div>
        <div><strong>Status:</strong> {data.status}</div>
        <div><strong>Start:</strong> {data.start_date || "-"}</div>
        <div><strong>End:</strong> {data.end_date || "-"}</div>
        <div><strong>Latitude:</strong> {data.latitude ?? "-"}</div>
        <div><strong>Longitude:</strong> {data.longitude ?? "-"}</div>
      </div>
      <div style={{ marginTop: 12 }}>
        <Link className="btn secondary" to={`/projects/${id}/edit`}>Edit</Link>
        <Link className="btn" style={{ marginLeft: 8 }} to="/projects">Back</Link>
      </div>
    </div>
  );
}
