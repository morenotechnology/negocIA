/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions = require("firebase-functions");
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

const API_KEY = "AIzaSyA6lmPSldVm4JzbOCxTfeZInj4dTsuPiQE"; // sácala de: https://aistudio.google.com/app/apikey

app.post("/consulta", async (req, res) => {
  const pregunta = req.body.pregunta || "";

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: `Actúa como asesor de negocios. Ayuda a este usuario: ${pregunta}` }] }]
    })
  });

  const data = await response.json();
  const texto = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No se pudo generar respuesta.";

  res.json({ respuesta: texto });
});

exports.api = functions.https.onRequest(app);
