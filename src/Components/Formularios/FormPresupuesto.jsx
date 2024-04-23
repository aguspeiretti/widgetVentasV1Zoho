/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getRecord } from "../../functions/apiFunctions";

const FormPresupuesto = ({ registerID, onContinue, dts, onReturn }) => {
  const module = dts.data.Entity;
  const rEgisterID = dts.data.EntityId;
  const [newDatos, setNewDatos] = useState(null);
  const [primerPago, setPrimerPago] = useState("");
  const [paginasPrimerPago, setPaginasPrimerPago] = useState("");
  const [importeFinal, setImporteFinal] = useState("");
  const [dni, setDni] = useState("");
  const [nombreYapellido, setNombreYapellido] = useState("");
  const [dirFacturacion, setDirFacturacion] = useState("");
  const [importeAsesor, setImporteAsesor] = useState("");
  const [descuentoAplicar, setDescuentoAplicar] = useState("");
  const [numeroPaginas, setNumeroPaginas] = useState("");
  const ifinal = importeAsesor - descuentoAplicar;
  const ppp = ifinal / numeroPaginas;
  const [formData, setFormData] = useState({
    id: registerID,
    primerPago: "",
    paginasPrimerPago: "",
    importeFinal: "",
    dni: "",
    nombreYapellido: "",
    nOrden: "",
    importeAsesor: "",
    descuentoAplicar: "",
  });

  //funcion que trae la info del modulo al cargar la pagina y los setea en la variable newDatos
  useEffect(() => {
    getRecord(module, rEgisterID)
      .then(function (result) {
        const datos = result.register;
        setNewDatos(datos);
      })
      .catch(function (error) {
        // console.error(error);
      });
  }, [module, rEgisterID]);

  // asignacion de los valores a los campos dependiendo si llegaron los datos , se ejecuta al iniciar
  useEffect(() => {
    if (newDatos) {
      setPrimerPago(newDatos.Primer_Pago || "b");
      setDni(newDatos.DNI_CIF || "a");
      setDirFacturacion(newDatos.Direcci_n_de_facturaci_n || ""); // Corregido el nombre del campo
      setNombreYapellido(newDatos.Nombre_y_apellidos || "");
      setImporteAsesor(newDatos.Importe_Asesor || "");
      setDescuentoAplicar(newDatos.Descuento_a_Aplicar || "");
      setNumeroPaginas(newDatos.N_mero_de_P_ginas || "");
      setImporteFinal(ifinal);
    }
  }, [newDatos]);

  // seteo de los datos del form con las variables que ya estaba antes
  useEffect(() => {
    setFormData({
      ...formData,
      Primer_Pago: primerPago,
      Direcci_n_de_facturaci_n: dirFacturacion,
      Nombre_y_apellidos: nombreYapellido,
      DNI_CIF: dni,
      Importe_Asesor: importeAsesor,
      Descuento_a_Aplicar: descuentoAplicar,
      N_mero_de_P_ginas: numeroPaginas,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    primerPago,
    paginasPrimerPago,
    importeFinal,
    dni,
    nombreYapellido,
    importeAsesor,
    descuentoAplicar,
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
      console.error(error);
      throw error; // Rechaza la promesa con el error para que pueda ser capturado externamente
    }
  }

  //funcion para actualizar

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

  // funcion submit para activar el guardado de datos

  const handleSubmitRedirect = (event) => {
    event.preventDefault();

    // Verifica si algún campo está vacío
    const camposVacios = [
      !primerPago,
      !importeAsesor,
      !descuentoAplicar,
      !dni,
      !nombreYapellido,
      !dirFacturacion,
    ];

    const nombresCampos = [
      "Primer Pago",
      "Importe Asesor",
      "Descuento final",
      "DNI/CIF",
      "Nombre y apellidos",
      "Dirección de facturación",
    ];

    const campoFaltanteIndex = camposVacios.findIndex((campo) => campo);

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

  //funcion pora volver al componente anterior
  const backTo = (event) => {
    event.preventDefault();
    onReturn();
  };

  return (
    <>
      <div className="btns-container">
        <ul>
          <li onClick={backTo} className="btns-guardado" type="submit">
            Volver
          </li>
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
          <h2>informacion de presupuesto</h2>
          <div className="slot">
            <label htmlFor="primerPago">Primer Pago:</label>
            <input
              type="number"
              id="primerPago"
              value={primerPago}
              onChange={(e) => setPrimerPago(e.target.value)}
              required
            />
          </div>
          <div className="slot">
            <label htmlFor="importeFinal">Importe Asesor:</label>
            <input
              type="number"
              id="importeAsesor"
              value={importeAsesor}
              onChange={(e) => setImporteAsesor(e.target.value)}
              required
            />
          </div>
          <div className="slot">
            <label htmlFor="importeFinal">Descuento final:</label>
            <input
              type="number"
              id="descuentoAplicar"
              value={descuentoAplicar}
              onChange={(e) => setDescuentoAplicar(e.target.value)}
              required
            />
          </div>
          <div className="slot">
            <label htmlFor="paginasPrimerPago">Numero de paginas:</label>
            <input
              type="number"
              id="numeroPaginas"
              value={numeroPaginas}
              onChange={(e) => setPaginasPrimerPago(e.target.value)}
              required
            />
          </div>
          <div className="slot">
            <label htmlFor="paginasPrimerPago">Páginas Primer Pago:</label>
            <input
              type="number"
              id="paginasPrimerPago"
              value={ppp}
              onChange={(e) => setPaginasPrimerPago(e.target.value)}
              required
            />
          </div>
          <div className="slot">
            <label htmlFor="importeFinal">Importe Final:</label>
            <input
              type="number"
              id="importeFinal"
              value={ifinal}
              onChange={(e) => setImporteFinal(e.target.value)}
              required
            />
          </div>

          <div className="slot-vacio"></div>
        </div>

        <div className="form-cont">
          <h2>Datos de facturacion</h2>
          <div className="slot">
            <label htmlFor="dni">DNI/CIF:</label>
            <input
              type="number"
              id="dni"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              required
            />
          </div>
          <div className="slot">
            <label htmlFor="nombreYapellido">Nombre y apellidos:</label>
            <input
              type="text"
              id="nombreYapellido"
              value={nombreYapellido}
              onChange={(e) => setNombreYapellido(e.target.value)}
              required
            />
          </div>
          <div className="slot">
            <label htmlFor="dirFacturacion">Dirección de facturación:</label>
            <input
              type="text"
              id="dirFacturacion"
              value={dirFacturacion}
              onChange={(e) => setDirFacturacion(e.target.value)}
              required
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default FormPresupuesto;
