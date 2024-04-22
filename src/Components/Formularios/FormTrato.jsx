import React, { useState, useEffect } from "react";
import "./form.css";
import Swal from "sweetalert2";
import { getRecord } from "../../functions/apiFunctions";

const FormTrato = ({ datos, registerID, onContinue, dts }) => {
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
  const [formData, setFormData] = useState({
    id: registerID,
    Coordinacion: "",
    Gestion: "",
    Referencia_Cliente: "",
    Fecha_de_Entrega_para_Ventas: "",
    Fecha_de_Contrataci_n_de_Servicios: "",
    Carrera: "",
    Deal_Name: "",
  });

  useEffect(() => {
    // window.ZOHO.CRM.UI.Resize({ height: "100%", width: "100%" }).then(function (
    //   data
    // ) {});

    getRecord(module, rEgisterID)
      .then(function (result) {
        const datos = result.register;
        setNewDatos(datos);
      })
      .catch(function (error) {
        // console.error(error);
      });
  }, [module, rEgisterID]);

  useEffect(() => {
    if (newDatos) {
      setNombreTrato(newDatos.Referencia_Cliente);
      setCoordinacion(newDatos.Coordinador_del_Proyecto || "");
      setGestion(newDatos.Gest || "");
      setReferenciaCliente(newDatos.Referencia_Cliente || "");
      setFechaContratacion(newDatos.Fecha_de_Contrataci_n_de_Servicios || "");
      setFechaEnvio(newDatos.Fecha_de_Entrega_para_Ventas || "");
      setCarrera(newDatos.Carrera || "");
    }
    getFields();
  }, [newDatos]);

  useEffect(() => {
    setFormData({
      ...formData,
      Coordinador_del_Proyecto: coordinacion,
      Gest: gestion,
      Referencia_Cliente: referenciaCliente,
      Deal_Name: referenciaCliente,
      Fecha_de_Entrega_para_Ventas: fechaEnvio,
      Fecha_de_Contrataci_n_de_Servicios: fechaContratacion,
      Carrera: carrera,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    coordinacion,
    gestion,
    referenciaCliente,
    fechaEnvio,
    fechaContratacion,
    carrera,
  ]);

  // FUNCION PARA ACTUALIZAR LOS CLIENTES
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

  // FUNCION PARA TRAER  TODOS LOS DESPLEGABLES

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

  // FUNCION PARA FILTRAR TODOS LOS DESPLEGABLES

  const getFieldValues = (fields, apiName) => {
    const field = fields.find((item) => item.api_name === apiName);
    return field ? field.pick_list_values || [] : [];
  };

  const pickers = fields.filter((item) => item.data_type === "picklist");
  console.log(pickers);

  const coord = getFieldValues(fields, "Coordinador_del_Proyecto");

  const gest = getFieldValues(fields, "Gest");

  // FUNCION PARA ACTUALIZAR LOS CLIENTES

  const handleSubmit = (event) => {
    event.preventDefault();

    // Verifica si algún campo está vacío
    if (
      !coordinacion ||
      !gestion ||
      !referenciaCliente ||
      !fechaEnvio ||
      !fechaContratacion ||
      !carrera
    ) {
      // Muestra un mensaje de error
      Swal.fire({
        title: "Error",
        text: "Por favor completa todos los campos antes de guardar.",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
        position: "top-end",
      });
      return; // Evita que el formulario se envíe si hay campos vacíos
    }

    // Si todos los campos están completos, procede a guardar
    guardarDatos();
  };

  const handleSubmitRedirect = (event) => {
    event.preventDefault();

    // Verifica si algún campo está vacío
    const camposVacios = [
      !coordinacion,
      !gestion,
      !referenciaCliente,
      !fechaEnvio,
      !fechaContratacion,
      !carrera,
    ];

    const nombresCampos = [
      "Coordinación",
      "Gestión",
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
      <form className="form-trato" onSubmit={handleSubmit}>
        <div className="form-cont">
          <h2>informacion de trato</h2>
          <div className="slot">
            <label htmlFor="coordinacion">Coordinación:</label>
            <select
              id="coordinacion"
              value={coordinacion}
              onChange={(e) => setCoordinacion(e.target.value)}
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
              onChange={(e) => setGestion(e.target.value)}
              required
            >
              {gest.map((tipo, index) => (
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
            <label htmlFor="fechaEnvio">Fecha de envio a ventas:</label>
            <input
              type="date"
              id="fechaEnvio"
              value={fechaEnvio}
              onChange={(e) => setFechaEnvio(e.target.value)}
              required
            />
          </div>
          <div className="slot">
            <label htmlFor="fechaContratacion">
              Fecha de contratacion de servicio:
            </label>
            <input
              type="date"
              id="fechaContratacion"
              value={fechaContratacion}
              onChange={(e) => setFechaContratacion(e.target.value)}
              required
            />
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
          <div className="slot-vacio"></div>
        </div>
      </form>
    </div>
  );
};

export default FormTrato;
