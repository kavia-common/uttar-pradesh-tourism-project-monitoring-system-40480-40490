import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createProject, getProject, updateProject } from "../../api/projects";

const empty = {
  name: "",
  description: "",
  budget: "",
  start_date: "",
  end_date: "",
  latitude: "",
  longitude: "",
  status: "PLANNED",
};

// PUBLIC_INTERFACE
export default function ProjectForm() {
  /** Form for creating or editing a project. */
  const { id } = useParams();
  const isEdit = Boolean(id) && id !== "new";
  const [model, setModel] = useState(empty);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(isEdit);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      if (!isEdit) return;
      try {
        const data = await getProject(id);
        setModel({
          name: data?.name ?? "",
          description: data?.description ?? "",
          budget: data?.budget ?? "",
          start_date: data?.start_date ?? "",
          end_date: data?.end_date ?? "",
          latitude: data?.latitude ?? "",
          longitude: data?.longitude ?? "",
          status: data?.status ?? "PLANNED",
        });
      } catch (e) {
        setErr("Failed to load project");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, isEdit]);

  function updateField(key, value) {
    setModel((m) => ({ ...m, [key]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    try {
      const payload = {
        ...model,
        budget: model.budget ? Number(model.budget) : undefined,
        latitude: model.latitude === "" ? null : Number(model.latitude),
        longitude: model.longitude === "" ? null : Number(model.longitude),
        end_date: model.end_date === "" ? null : model.end_date,
      };
      if (isEdit) {
        await updateProject(id, payload);
      } else {
        await createProject(payload);
      }
      navigate("/projects");
    } catch (e) {
      setErr("Save failed");
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>{isEdit ? "Edit Project" : "New Project"}</h2>
      <form className="card" onSubmit={onSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
          <div>
            <label>Name</label>
            <input className="input" value={model.name} onChange={(e)=>updateField("name", e.target.value)} required />
          </div>
          <div>
            <label>Budget</label>
            <input className="input" type="number" value={model.budget} onChange={(e)=>updateField("budget", e.target.value)} required />
          </div>
          <div style={{ gridColumn: "1 / span 2" }}>
            <label>Description</label>
            <textarea className="input" value={model.description} onChange={(e)=>updateField("description", e.target.value)} rows={4} />
          </div>
          <div>
            <label>Start Date</label>
            <input className="input" type="date" value={model.start_date} onChange={(e)=>updateField("start_date", e.target.value)} />
          </div>
          <div>
            <label>End Date</label>
            <input className="input" type="date" value={model.end_date} onChange={(e)=>updateField("end_date", e.target.value)} />
          </div>
          <div>
            <label>Latitude</label>
            <input className="input" type="number" step="any" value={model.latitude} onChange={(e)=>updateField("latitude", e.target.value)} />
          </div>
          <div>
            <label>Longitude</label>
            <input className="input" type="number" step="any" value={model.longitude} onChange={(e)=>updateField("longitude", e.target.value)} />
          </div>
          <div>
            <label>Status</label>
            <select className="select" value={model.status} onChange={(e)=>updateField("status", e.target.value)}>
              <option value="PLANNED">PLANNED</option>
              <option value="ONGOING">ONGOING</option>
              <option value="COMPLETED">COMPLETED</option>
              <option value="ON_HOLD">ON_HOLD</option>
            </select>
          </div>
        </div>
        {err && <div style={{ color: "#ef4444", marginTop: 8 }}>{err}</div>}
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <button className="btn" type="submit">Save</button>
          <button className="btn secondary" type="button" onClick={()=>navigate("/projects")}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
