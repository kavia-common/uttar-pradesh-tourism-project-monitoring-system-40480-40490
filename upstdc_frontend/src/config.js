//
// Environment-based configuration for frontend
// Uses CRA env variable naming: REACT_APP_*
// IMPORTANT: Do not hardcode URLs; set them in .env at runtime.
//
// Required env variables (to be set by orchestrator):
// - REACT_APP_API_BASE_URL: Base URL of backend API (e.g., http://localhost:3001 or https://...)
// - REACT_APP_APP_NAME (optional): Application display name
//

const config = {
  appName: process.env.REACT_APP_APP_NAME || "UPSTDC Project Monitoring",
  apiBaseUrl:
    process.env.REACT_APP_API_BASE_URL ||
    (window?.__CONFIG__?.API_BASE_URL ?? "http://localhost:3001"),
};

export default config;
