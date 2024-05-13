/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./form.css";
import Swal from "sweetalert2";
import { getRecord } from "../../functions/apiFunctions";

const FormTrato = ({ registerID, onContinue, dts }) => {
  const module = dts.data.Entity;
  const rEgisterID = dts.data.EntityId;
  const [newDatos, setNewDatos] = useState(null);
  const [coordinacion, setCoordinacion] = useState("");
  const [gestion, setGestion] = useState("");
  const [referenciaCliente, setReferenciaCliente] = useState("");
  const [nombreTrato, setNombreTrato] = useState("");
  const [fechaContratacion, setFechaContratacion] = useState("");
  const [fechaEnvio, setFechaEnvio] = useState("");
  const [carrera, setCarrera] = useState("");
  const [fields, setFields] = useState([]);
  const [temaProyecto, setTemaProyecto] = useState("");
  const [anticipada, setAnticipada] = useState("");
  const [formData, setFormData] = useState({
    id: registerID,
    Coord: "",
    Gestor_a: "",
    Referencia_Cliente: "",
    Fecha_de_Entrega_para_Ventas: "",
    Fecha_de_Contrataci_n_de_Servicios: "",
    Carrera_LA: "",
    Deal_Name: "",
    Tema_del_Proyecto_LA: "",
    Venta_anticipada: "",
  });

  //funcion que trae la info del modulo al cargar la pagina y los setea en la variable newDatos

  useEffect(() => {
    getRecord(module, rEgisterID)
      .then(function (result) {
        const datos = result.register;
        setNewDatos(datos);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [module, rEgisterID]);

  // asignacion de los valores a los campos dependiendo si llegaron los datos , se ejecuta al iniciar
  useEffect(() => {
    console.log("esto", newDatos);
    if (newDatos) {
      setNombreTrato(newDatos.Referencia_Cliente);
      setCoordinacion(newDatos.Coord || "");
      setGestion(newDatos.Gestor_a || "");
      setReferenciaCliente(newDatos.Referencia_Cliente || "");
      setFechaContratacion(newDatos.Fecha_de_Contrataci_n_de_Servicios || "");
      setFechaEnvio(newDatos.Fecha_de_Entrega_para_Ventas || "");
      setCarrera(newDatos.Carrera_LA || "");
      setTemaProyecto(newDatos.Tema_del_Proyecto_LA || "");
      setAnticipada(newDatos.Venta_anticipada || "");
    }
    getFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newDatos]);

  // seteo de los datos del form con las variables que ya estaba antes

  useEffect(() => {
    setFormData({
      ...formData,
      Coord: coordinacion,
      Gestor_a: gestion,
      Referencia_Cliente: referenciaCliente,
      Deal_Name: referenciaCliente,
      Fecha_de_Entrega_para_Ventas: fechaEnvio,
      Fecha_de_Contrataci_n_de_Servicios: fechaContratacion,
      Carrera_LA: carrera,
      Tema_del_Proyecto_LA: temaProyecto,
      Venta_anticipada: anticipada,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    coordinacion,
    gestion,
    referenciaCliente,
    fechaEnvio,
    fechaContratacion,
    carrera,
    anticipada,
  ]);

  // funcion SDK soho para actualizar un elemento

  const config = {
    Entity: "Deals",
    APIData: formData,
  };

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
      throw error; // Rechaza la promesa con el error para que pueda ser capturado externamente
    }
  }

  //funcion para guardar los cambios
  const guardarDatos = () => {
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
        // window.location.reload();
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
      });
  };

  // funcion para traer todos los campos del elemento

  const getFields = (entrity) => {
    return new Promise(function (resolve, reject) {
      window.ZOHO.CRM.META.getFields({ Entity: "Deals" })
        .then(function (response) {
          setFields(response.fields);
          console.log(fields);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  };

  // funcion para traer los campos desplegables y filtrarlos

  const getFieldValues = (fields, apiName) => {
    const field = fields.find((item) => item.api_name === apiName);
    return field ? field.pick_list_values || [] : [];
  };
  // muestra solo los campos desplegables
  const pickers = fields.filter((item) => item.data_type === "picklist");
  console.log(pickers);
  const coord = getFieldValues(fields, "Coord");
  const gest = getFieldValues(fields, "Gestor_a");
  const anti = getFieldValues(fields, "Venta_anticipada");

  // funcion submit para activar el guardado de datos

  const handleSubmitRedirect = (event) => {
    event.preventDefault();

    // Verifica si algún campo está vacío
    const camposVacios = [
      !coordinacion,
      !gestion,
      !anticipada,
      !referenciaCliente,
      !fechaEnvio,
      !fechaContratacion,
      !carrera,
    ];

    const nombresCampos = [
      "Coordinación",
      "Gestión",
      "venta anticipada",
      "Referecia Cliente",
      "Fecha de envio a ventas",
      "Fecha de contratacion de servicio",
      "Carrera",
    ];
    const campoFaltanteIndex = camposVacios.findIndex((campo) => campo);
    // Verifica si algún campo está vacío
    if (campoFaltanteIndex !== -1) {
      // Muestra un mensaje de error indicando qué campo falta completar
      Swal.fire({
        title: `Complete ${nombresCampos[campoFaltanteIndex]} `,
        text: "",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
        position: "center",
      });
      return; // Evita que el formulario se envíe si hay campos vacíos
    }

    // Si todos los campos están completos, procede a guardar y continuar
    guardarDatos();
    onContinue();
  };

  const handleKeyDown = (event) => {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del evento
  };

  return (
    <div className="ordenador">
      <div className="btns-container">
        <ul>
          <li
            onClick={handleSubmitRedirect}
            className="btns-guardado"
            type="submit"
          >
            Guardar y Continuar
          </li>
        </ul>
      </div>
      <form className="form-trato">
        <div className="form-cont">
          <h2>informacion de trato</h2>
          <div className="slot">
            <label htmlFor="coordinacion">Coordinación:</label>
            <select
              id="coordinacion"
              value={coordinacion}
              onChange={(e) => {
                const value = e.target.value === "-None-" ? "" : e.target.value;
                setCoordinacion(value);
              }}
              required
            >
              {coord.map((tipo, index) => (
                <option key={index} value={tipo.display_value}>
                  {tipo.display_value}
                </option>
              ))}
            </select>
          </div>
          <div className="slot">
            <label htmlFor="gestion">Gestión:</label>
            <select
              id="gestion"
              value={gestion}
              onChange={(e) => {
                const value = e.target.value === "-None-" ? "" : e.target.value;
                setGestion(value);
              }}
              required
            >
              {gest.map((tipo, index) => (
                <option key={index} value={tipo.display_value}>
                  {tipo.display_value}
                </option>
              ))}
            </select>
          </div>
          <div className="slot">
            <label htmlFor="venta anticipada">Venta anticipada:</label>
            <select
              id="venta"
              value={anticipada}
              onChange={(e) => {
                const value = e.target.value === "-None-" ? "" : e.target.value;
                setAnticipada(value);
                if (value === "SI") {
                  Swal.fire({
                    title: "¿Estás seguro?",
                    text: `Marque "SI ESTOY SEGURO" si se trata de un proyecto que su comienzo depende de la finalizacion de un proyecto en curso`,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Sí, estoy seguro",
                    cancelButtonText: "Cancelar",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      // Aquí puedes realizar alguna acción adicional si el usuario confirma
                    } else {
                      // Si el usuario cancela, puedes revertir la selección si es necesario
                      setAnticipada(""); // Esto limpiará la selección
                    }
                  });
                }
              }}
              required
            >
              {anti.map((tipo, index) => (
                <option key={index} value={tipo.display_value}>
                  {tipo.display_value}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-cont">
          <h2>informacion de proyecto</h2>
          <div className="slot">
            <label htmlFor="referenciaCliente">Referecia Cliente:</label>
            <input
              type="text"
              id="referenciaCliente"
              value={referenciaCliente}
              onChange={(e) => setReferenciaCliente(e.target.value)}
              required
            />
          </div>

          <div className="slot">
            <label htmlFor="fechaEnvio">
              Fecha de envio a ventas:
              <input
                type="date"
                id="fechaEnvio"
                value={fechaEnvio}
                onChange={(e) => setFechaEnvio(e.target.value)}
                required
                onKeyDown={handleKeyDown}
              />
            </label>
          </div>

          <div className="slot">
            <label htmlFor="fechaContratacion">
              Fecha de contratacion de servicio:
              <input
                type="date"
                id="fechaContratacion"
                value={fechaContratacion}
                onChange={(e) => setFechaContratacion(e.target.value)}
                required
                onKeyDown={handleKeyDown}
                readOnly
              />
            </label>
          </div>
          <div className="slot">
            <label htmlFor="carrera">Carrera:</label>
            <input
              type="text"
              id="carrera"
              value={carrera}
              onChange={(e) => setCarrera(e.target.value)}
              required
            />
          </div>
          <div className="slot">
            <label htmlFor="carrera">Tema del proyecto:</label>
            <input
              type="text"
              id="carrera"
              value={temaProyecto}
              onChange={(e) => setTemaProyecto(e.target.value)}
              required
            />
          </div>
          <div className="slot-vacio"></div>
        </div>
      </form>
    </div>
  );
};

export default FormTrato;
