import React from "react";
import VoiceChat from "./components/voicechat.js";
import "./App.css"; // Import app-wide styles

// Define the Backend URL here. 
// It uses the Environment Variable from Netlify/Local .env, 
// or defaults to your Render link.
const API_BASE_URL = process.env.REACT_APP_API_URL || "https://krishiiai.onrender.com";

function App() {
  return (
    <div className="App">
      {/* We pass the API URL as a prop to the VoiceChat component */}
      <VoiceChat apiUrl={API_BASE_URL} />
    </div>
  );
}

export default App;