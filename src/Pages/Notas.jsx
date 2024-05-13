import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./notas.css";

const Notas = ({ onReturn, dts }) => {
  const [nota, setNota] = useState("");
  const rEgisterID = dts.data.EntityId;
  const [remainingChars, setRemainingChars] = useState(1900);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: rEgisterID,
    nota: "",
    Actualizar_No_Procesada: true,
  });

  //Funcion para ver cantidad de caracteres restantes

  useEffect(() => {
    setRemainingChars(1900 - nota.length); // Update remaining characters count
  }, [nota]);

  //seteador de datos en el form para envio

  useEffect(() => {
    setFormData({
      ...formData,
      Comentarios_cerrado_correcto: nota,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nota]);

  //datos de config para el updaterecord

  const config = {
    Entity: "Deals",
    APIData: formData,
    Trigger: ["workflow"],
  };

  // funcion SDK soho para actualizar un elemento

  async function updateRecord(config) {
    console.log("dento del config", config);
    try {
      const data = await window.ZOHO.CRM.API.updateRecord(config);
      console.log(data);
      return data;
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `${error}`,
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
        position: "top-end",
      });
      console.error(error);
      throw error;
    }
  }

  //funcion para actualizar

  const guardarDatos = () => {
    return new Promise((resolve, reject) => {
      updateRecord(config)
        .then((resultado) => {
          console.log("Respuesta del servidor:", resultado);

          // Actualiza el estado local con los nuevos datos
          setFormData((prevFormData) => ({
            ...prevFormData,
            ...resultado.data, // Asegúrate de que la respuesta del servidor tenga los datos actualizados
          }));

          Swal.fire({
            title: "Éxito",
            text: "¡Los datos se actualizaron correctamente!",
            icon: "success",
            toast: true,
            position: "top-end",
            timer: 2000,
            showConfirmButton: false,
          });
          resolve();
        })
        .catch((error) => {
          Swal.fire({
            title: "Error",
            text: "Hubo un problema al actualizar los datos. Por favor, inténtalo de nuevo.",
            icon: "error",
            timer: 2000,
            showConfirmButton: false,
            position: "top-end",
          });
          console.error("Error al actualizar el registro:", error);
          reject(error); // Rechaza la promesa con el error si hay un problema
        });
    });
  };

  // funcion para cerrar el widget

  const cerrarWidget = () => {
    let func_name = "test";
    let req_data = {
      arguments: JSON.stringify({
        dealID: rEgisterID,
      }),
    };
    window.ZOHO.CRM.FUNCTIONS.execute(func_name, req_data)
      .then(function () {
        window.ZOHO.CRM.BLUEPRINT.proceed();
        window.ZOHO.CRM.UI.Popup.closeReload().then(function (data) {
          console.log(data);
          setLoading(false);
        });

        // Independientemente del resultado, cambia el estado de carga a falso
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //manejador del evento de cambio en el textArea nota

  const handleChange = (event) => {
    const text = event.target.value;
    if (text.length <= 1900) {
      setNota(text);
    }
  };

  // funcion submit para activar el guardado de datos

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verifica si algún campo está vacío
    if (!nota) {
      // Muestra un mensaje de error
      Swal.fire({
        title: "Error",
        text: "Por favor completa las notas.",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
        position: "center",
      });
      return; // Evita que el formulario se envíe si hay campos vacíos
    }

    setLoading(true);

    try {
      // Si todos los campos están completos, procede a guardar
      await guardarDatos(); // Espera a que se guarden los datos
      cerrarWidget(); // Llama a cerrarWidget después de que se hayan guardado los datos
    } catch (error) {
      console.error("Error al guardar datos:", error);
    }
  };
  // funcion para voler a la componente anterior

  const backTo = (event) => {
    event.preventDefault();
    onReturn();
  };

  return (
    <div className="notas">
      <form onSubmit={handleSubmit}>
        <div className="btns-container">
          <ul>
            <li onClick={backTo} className="btns-guardado">
              volver
            </li>
            <button
              onClick={handleSubmit}
              className="btns-guardado"
              disabled={loading}
            >
              {loading ? "Espere..." : "Guardar y cerrar"}
            </button>
          </ul>
        </div>
        <h2>Comentario para el coordinador: cerrado correcto</h2>
        <p>Resuma los cambios realizados en el cerrado correcto</p>

        <textarea
          id="story"
          name="story"
          value={nota}
          onChange={handleChange}
          rows="20"
          cols="130"
          placeholder="Redacte los cambios"
        ></textarea>
        <p>Caracteres restantes: {remainingChars}</p>
      </form>
    </div>
  );
};

export default Notas;
