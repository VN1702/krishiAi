// import React, { useState } from "react";
// import "./VoiceChat.css";
// import { FaMicrophone, FaPaperPlane, FaVolumeUp } from "react-icons/fa";

// const LANGUAGES = [
//   { code: "hi", name: "Hindi" },
//   { code: "en", name: "English" },
//   { code: "ta", name: "Tamil" },
//   { code: "te", name: "Telugu" },
//   { code: "ml", name: "Malayalam" },
//   { code: "bn", name: "Bengali" },
//   { code: "pa", name: "Punjabi" },
//   { code: "mr", name: "Marathi" },
//   { code: "gu", name: "Gujarati" },
//   { code: "kn", name: "Kannada" },
//   { code: "or", name: "Odia" },
//   { code: "ur", name: "Urdu" }
// ];

// function VoiceChat({apiUrl}) {
//   const [selectedLang, setSelectedLang] = useState("hi");
//   const [userInput, setUserInput] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);
//   const [listening, setListening] = useState(false);

//   const startListening = () => {
//     if (!("webkitSpeechRecognition" in window)) {
//       alert("Speech Recognition not supported in this browser");
//       return;
//     }
//     const recognition = new window.webkitSpeechRecognition();
//     recognition.lang = selectedLang;
//     recognition.interimResults = false;
//     recognition.continuous = false;

//     recognition.onstart = () => setListening(true);
//     recognition.onend = () => setListening(false);

//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript;
//       sendMessage(transcript);
//     };

//     recognition.start();
//   };


//   const speakText = (text) => {
//     if (!window.speechSynthesis) return;
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.lang = selectedLang || "en-IN";
//     window.speechSynthesis.speak(utterance);
//   };

 
//   const sendMessage = async (text) => {
//     if (!text.trim()) return;
//     setUserInput("");

   
//     const userMsg = { sender: "user", text };
//     setChatHistory((prev) => [...prev, userMsg]);

//     try {
//       const res = await fetch("http://localhost:5000/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           query: text,
//           lang: selectedLang,
//           location: "Bengaluru"
//         })
//       });
//       const data = await res.json();
//       const botReply = data.answer || "No answer found.";

//       const botMsg = { sender: "bot", text: botReply };
//       setChatHistory((prev) => [...prev, botMsg]);
//     } catch (err) {
//       const errorMsg = { sender: "bot", text: "⚠️ Network error. Please try again." };
//       setChatHistory((prev) => [...prev, errorMsg]);
//     }
//   };

//   return (
//     <div className="chat-wrapper">
//       {/* Top Bar */}
//       <div className="top-bar">
//         <button
//           className="listen-btn"
//           onClick={() => speakText(chatHistory[chatHistory.length - 1]?.text || "")}
//         >
//           <FaVolumeUp /> Listen
//         </button>
//         <h2 className="title">🌾 Krishi AI</h2>
//         <select
//           className="lang-dropdown"
//           value={selectedLang}
//           onChange={(e) => setSelectedLang(e.target.value)}
//         >
//           {LANGUAGES.map((l) => (
//             <option key={l.code} value={l.code}>
//               {l.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Chat History */}
//       <div className="chat-box">
//         {chatHistory.map((msg, idx) => (
//           <div
//             key={idx}
//             className={`chat-bubble ${msg.sender === "user" ? "user" : "bot"}`}
//           >
//             {msg.text}
//           </div>
//         ))}
//       </div>

//       {/* Input Bar */}
//       <div className="input-bar">
//         <input
//           type="text"
//           placeholder="Type your query..."
//           value={userInput}
//           onChange={(e) => setUserInput(e.target.value)}
//         />
//         <button
//           className={`mic-btn ${listening ? "active" : ""}`}
//           onClick={startListening}
//         >
//           <FaMicrophone />
//         </button>
//         <button className="send-btn" onClick={() => sendMessage(userInput)}>
//           <FaPaperPlane />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default VoiceChat;
import React, { useState } from "react";
import "./VoiceChat.css";
import { FaMicrophone, FaPaperPlane, FaVolumeUp } from "react-icons/fa";

const LANGUAGES = [
  { code: "hi", name: "Hindi" },
  { code: "en", name: "English" },
  { code: "ta", name: "Tamil" },
  { code: "te", name: "Telugu" },
  { code: "ml", name: "Malayalam" },
  { code: "bn", name: "Bengali" },
  { code: "pa", name: "Punjabi" },
  { code: "mr", name: "Marathi" },
  { code: "gu", name: "Gujarati" },
  { code: "kn", name: "Kannada" },
  { code: "or", name: "Odia" },
  { code: "ur", name: "Urdu" }
];

function VoiceChat({ apiUrl }) {
  const [selectedLang, setSelectedLang] = useState("hi");
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [listening, setListening] = useState(false);

  // Fallback for safety in case apiUrl isn't passed correctly
  const BASE_URL = apiUrl || "https://krishiiai.onrender.com";

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech Recognition not supported in this browser");
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = selectedLang;
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      sendMessage(transcript);
    };

    recognition.start();
  };

  const speakText = (text) => {
    if (!window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = selectedLang || "en-IN";
    window.speechSynthesis.speak(utterance);
  };

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    setUserInput("");

    const userMsg = { sender: "user", text };
    setChatHistory((prev) => [...prev, userMsg]);

    try {
      // UPDATED: Now using the dynamic BASE_URL instead of localhost
      const res = await fetch(`${BASE_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: text,
          lang: selectedLang,
          location: "Bengaluru"
        })
      });
      
      const data = await res.json();
      const botReply = data.answer || "No answer found.";

      const botMsg = { sender: "bot", text: botReply };
      setChatHistory((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Fetch Error:", err);
      const errorMsg = { sender: "bot", text: "⚠️ Network error. Please check if the backend is awake." };
      setChatHistory((prev) => [...prev, errorMsg]);
    }
  };

  return (
    <div className="chat-wrapper">
      {/* Top Bar */}
      <div className="top-bar">
        <button
          className="listen-btn"
          onClick={() => speakText(chatHistory[chatHistory.length - 1]?.text || "")}
        >
          <FaVolumeUp /> Listen
        </button>
        <h2 className="title">🌾 Krishi AI</h2>
        <select
          className="lang-dropdown"
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value)}
        >
          {LANGUAGES.map((l) => (
            <option key={l.code} value={l.code}>
              {l.name}
            </option>
          ))}
        </select>
      </div>

      {/* Chat History */}
      <div className="chat-box">
        {chatHistory.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-bubble ${msg.sender === "user" ? "user" : "bot"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input Bar */}
      <div className="input-bar">
        <input
          type="text"
          placeholder="Type your query..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button
          className={`mic-btn ${listening ? "active" : ""}`}
          onClick={startListening}
        >
          <FaMicrophone />
        </button>
        <button className="send-btn" onClick={() => sendMessage(userInput)}>
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}

export default VoiceChat;