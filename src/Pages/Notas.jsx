import React, { useState } from "react";
import "./notas.css";

const Notas = ({ onContinue, onReturn }) => {
  const [nota, setNota] = useState(""); // Estado para guardar la nota

  const handleChange = (event) => {
    setNota(event.target.value); // Actualiza el estado de la nota
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes enviar la nota a través de un formulario o realizar alguna acción con ella
    onReturn();
  };
  const handleSubmitRedirect = (event) => {
    event.preventDefault();

    onContinue();
  };
  return (
    <div className="notas">
      <form onSubmit={handleSubmit}>
        <div className="btns-container">
          <ul>
            <li onClick={handleSubmit} className="btns-guardado">
              volver
            </li>
            <li onClick={handleSubmitRedirect} className="btns-guardado">
              Guardar y avanzar
            </li>
          </ul>
        </div>
        <h2>Notas</h2>

        <textarea
          id="story"
          name="story"
          value={nota}
          onChange={handleChange}
          rows="20"
          cols="130"
          placeholder="Escribe tu mensaje aquí"
        ></textarea>
      </form>
    </div>
  );
};

export default Notas;
