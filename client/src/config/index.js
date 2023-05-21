// apiConfig.js

let apiHostName;

if (window.location.hostname === "127.0.0.1") {
  apiHostName = "http://localhost:6001/api"; // Set your local API URL here
} else {
  apiHostName = "https://team-creator-server.vercel.app/api"; // Set your Vercel API URL here
}

export default apiHostName;
