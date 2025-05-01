import React, { useState } from 'react';

function Form({ handleSubmit }) {
  const [input, setInput] = useState('');

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(input);
  };

  return (
    <form onSubmit={onSubmit}>
      <textarea
        value={input}
        onChange={handleChange}
        placeholder="Describe tu negocio aquí..."
        rows={10}
        cols={50}
      />
      <br />
      <button type="submit">Consultar</button>
    </form>
  );
}

export default Form;