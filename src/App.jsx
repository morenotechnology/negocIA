import React, { useState } from 'react';
import Form from './components/Form';
import Response from './components/Response';
import './App.css';

function App() {
  const [response, setResponse] = useState(null);

  const handleSubmit = async (text) => {
    try {
      const res = await fetch('/api/consulta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error('Error calling Firebase Function:', error);
      setResponse('Error: Could not get response from server.');
    }
  };

  return (
    <div className="app-container">
      <Form onSubmit={handleSubmit} />
      <Response response={response} />
    </div>
  );
}

export default App;