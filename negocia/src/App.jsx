// App.js
import { useState } from "react";

function App() {
  const [msg, setMsg] = useState("");
  const [res, setRes] = useState("");

  const handleSubmit = async () => {
    const r = await fetch("/api/consulta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pregunta: msg }),
    });
    const data = await r.json();
    setRes(data.respuesta);
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Agente de Negocios con IA</h2>
      <input value={msg} onChange={e => setMsg(e.target.value)} placeholder="Describe tu negocio" />
      <button onClick={handleSubmit}>Consultar</button>
      <p><strong>Respuesta:</strong> {res}</p>
    </div>
  );
}

export default App;
