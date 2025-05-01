const functions = require("firebase-functions");
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true })); 

// Use express.json() middleware to parse JSON request bodies
app.use(express.json()); 

// Replace with your actual API key from Google AI Studio: https://aistudio.google.com/app/apikey
const API_KEY = "AIzaSyA6lmPSldVm4JzbOCxTfeZInj4dTsuPiQE"; 

app.post("/consulta", async (req, res) => {
  try {
    // Get the user's text from the request body
    const userText = req.body.text || "";

    // Construct the prompt for Gemini Pro
    const prompt = `Actúa como asesor experto en negocios. Este es el negocio del usuario: ${userText}`;

    if(!API_KEY){
      throw new Error("Api key is missing");
    }

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: `Actúa como asesor de negocios. Ayuda a este usuario: ${pregunta}` }] }]
    })

  });
    // Extract the response text from Gemini Pro's response
    const data = await response.json();
    const responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No se pudo generar una respuesta.";

    // Send the response back to the client
    res.json({ response: responseText });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred while processing your request." });
  }
});