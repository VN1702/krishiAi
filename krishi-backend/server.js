import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";
import fs from "fs";
import stringSimilarity from "string-similarity";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());


let knowledge = [];
try {
  knowledge = JSON.parse(fs.readFileSync("./knowledge.json", "utf-8"));
} catch (err) {
  console.error("❌ Error loading knowledge.json:", err.message);
  knowledge = [];
}


function findAnswerFromKnowledge(query, location = "") {
  const q = (query + " " + location).toLowerCase();
  let bestMatch = null;
  let bestScore = 0.0;

  for (let item of knowledge) {
    const keywordString = item.keywords.join(" ").toLowerCase();
    const score = stringSimilarity.compareTwoStrings(q, keywordString);

    if (score > bestScore) {
      bestScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && bestScore > 0.4) {
    return bestMatch.answer;
  }
  return null;
}

// ✅ Gemini API Query
async function queryGemini(prompt, location) {
  try {
    const finalPrompt = `You are Krishi AI, an agriculture assistant. User location: ${location}. 
Answer clearly and briefly: ${prompt}`;

    const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + process.env.GEMINI_API_KEY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: finalPrompt }] }],
      }),
    });

    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch (err) {
    console.error("❌ Gemini API error:", err.message);
    return null;
  }
}

// ✅ Main Route
app.post("/chat", async (req, res) => {
  const { query, location } = req.body;

  // 1. Try Gemini API
  let answer = await queryGemini(query, location);

  // 2. If Gemini fails, fallback to knowledge.json
  if (!answer) {
    answer = findAnswerFromKnowledge(query, location);
  }

  res.json({
    query,
    answer: answer || "Sorry, I don’t have an answer right now. Please try again later.",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
