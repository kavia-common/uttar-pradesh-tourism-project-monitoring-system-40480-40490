import api from "./client";

// PUBLIC_INTERFACE
export async function listProjects() {
  /** Fetch list of projects. */
  const { data } = await api.get("/api/projects");
  return data || [];
}

// PUBLIC_INTERFACE
export async function getProject(id) {
  /** Get single project by id. */
  const { data } = await api.get(`/api/projects/${id}`);
  return data;
}

// PUBLIC_INTERFACE
export async function createProject(payload) {
  /** Create a project. */
  const { data } = await api.post("/api/projects", payload);
  return data;
}

// PUBLIC_INTERFACE
export async function updateProject(id, payload) {
  /** Update a project. */
  const { data } = await api.put(`/api/projects/${id}`, payload);
  return data;
}

// PUBLIC_INTERFACE
export async function deleteProject(id) {
  /** Delete a project. */
  const { data } = await api.delete(`/api/projects/${id}`);
  return data;
}
