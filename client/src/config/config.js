let CLIENT_URL = "";
let SERVER_URL = "";
const env = process.env.NODE_ENV || "development";

if (env === "production") {
  // Set deployed site's client and server url here
  CLIENT_URL = process.env.REACT_APP_CLIENT_URL;
  SERVER_URL = process.env.REACT_APP_SERVER_URL;
} else {
  CLIENT_URL = "http://localhost:3000";
  SERVER_URL = "http://localhost:5000";
}

export { CLIENT_URL, SERVER_URL };
