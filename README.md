🌾 Krishi AI: Multilingual Voice-Activated Agri-Assistant

Krishi AI is a full-stack, AI-powered agricultural advisory platform designed to bridge the information gap for farmers. By utilizing voice-to-text and text-to-speech technologies, it provides real-time guidance in **12+ regional languages**, ensuring accessibility for users across different linguistic backgrounds.

### 🌐 [Live Demo](https://www.google.com/search?q=https://krishii-ai.netlify.app/)



## 🚀 Key Features

  * **Multilingual Support:** Communicate in Hindi, Kannada, Tamil, Telugu, Malayalam, Bengali, Punjabi, Marathi, Gujarati, Odia, Urdu, and English.
  * **Voice-First Interface:** Hands-free interaction using the **Web Speech API** for seamless speech-to-text processing.
  * **Intelligent Fallback System:** A multi-layered query handling logic that ensures users receive helpful responses even for complex or ambiguous inputs.
  * **Audio Feedback:** Integrated speech synthesis to read back AI responses in the user’s selected regional language.
  * **Responsive Design:** Optimized for both mobile and desktop users in rural and urban settings.



## 🛠️ Technical Stack

### **Frontend**

  * **React.js:** Component-based UI for a dynamic chat experience.
  * **Web Speech API:** Powering the voice recognition and synthesis.
  * **React Icons:** For an intuitive user interface.
  * **CSS3:** Custom styles for a clean, accessible layout.
  * **Deployment:** Hosted on **Netlify**.

### **Backend**

  * **Node.js & Express:** Robust server-side logic and API management.
  * **Python:** Handling core AI logic and language processing.
  * **CORS:** Configured for secure cross-origin communication.
  * **Deployment:** Hosted on **Render**.

-----

## 📁 Project Structure

```text
krishi-ai/
├── krishi-frontend/      # React Application
│   ├── public/           # Static assets & _redirects (Netlify)
│   ├── src/
│   │   ├── components/   # VoiceChat.js & CSS
│   │   └── App.js        # Main Entry Point
│   └── package.json
└── krishi-backend/       # Node.js Server
    ├── server.js         # API Endpoints
    └── package.json
```

-----

## 🔧 Installation & Setup

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/your-username/krishi-ai.git
    cd krishi-ai
    ```

2.  **Setup Backend:**

    ```bash
    cd krishi-backend
    npm install
    npm start
    ```

3.  **Setup Frontend:**

    ```bash
    cd ../krishi-frontend
    npm install
    npm start
    ```

4.  **Environment Variables:**
    Create a `.env` file in the frontend folder:

    ```env
    REACT_APP_API_URL=http://localhost:5000
    ```

-----

## 🛡️ Fallback Strategy

The system implements a graceful degradation approach. If the primary AI model fails to parse a specific regional dialect or slang, the **Fallback Engine** kicks in to provide generalized agricultural best practices based on the user's location (default: Bengaluru) and language context.

-----

## 📄 License

Distributed under the MIT License.


