/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getRecord } from "../../functions/apiFunctions";

const FormCerrado = ({ registerID, onContinue, onReturn, dts }) => {
  const module = dts.data.Entity;
  const rEgisterID = dts.data.EntityId;
  const [newDatos, setNewDatos] = useState(null);
  const [fechasEspecificas, setechasEspecificas] = useState("");
  const [algoHecho, setAlgoHecho] = useState("");
  const [cuantasPaginas, setCuantasPaginas] = useState("");
  const [paginaCorrecciones, setPaginaCorrecciones] = useState("");
  const [porcentajeCorrecciones, setPorcentajeCorrecciones] = useState("");
  const [porcentajeDePlagio, setPorcentajeDePlagio] = useState("");
  const [acuerdoPagos, setAcuerdoPagos] = useState("");
  const [informacionAportada, setInformacionAportada] = useState("");
  const [trabajoDeCampo, setTrabajoDeCampo] = useState("");
  const [tieneIndice, setTieneIndice] = useState("");
  const [coordinadorNp, setcoordinadorNp] = useState("");
  const [especificas, setEspecificas] = useState("");
  const [algoValidado, setAlgoValidado] = useState("");
  const [aplicarCorrecciones, setAplicarCorrecciones] = useState("");
  const [paginasNuevas, setPaginasNuevas] = useState("");
  const [habladoSobre, setHabladoSobre] = useState("");
  const [cantidadDeAdjuntos, setCantidadDeAdjuntos] = useState("");
  const [tipoDeTrabajo, setTipoDeTrabajo] = useState("");
  const [tipoDeInvestigacion, setTipoDeInvestigacion] = useState("");
  const [comentarioCerrado, setComentarioCerrado] = useState("");
  const [comentarioCLiente, setComentarioCliente] = useState("");
  const [tratoTildado, setTratoTildado] = useState(true);
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({
    id: registerID,
    fechasEspecificas: "",
    algoHecho: "",
    cuantasPaginas: "",
    paginaCorrecciones: "",
    porcentajeDePlagio: "",
    acuerdoPagos: "",
    informacionAportada: "",
    trabajoDeCampo: "",
    tieneIndice: "",
    coordinadorNp: "",
    especificas: "",
    algoValidado: "",
    aplicarCorrecciones: "",
    paginasNuevas: "",
    habladoSobre: "",
    cantidadDeAdjuntos: "",
    tipoDeTrabajo: "",
    tipoDeInvestigacion: "",
    comentarioCerrado: "",
    comentarioCLientes: "",
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
    getFields();
    if (newDatos) {
      setTratoTildado(newDatos.Trato_Latam_Creado || "");
      setechasEspecificas(newDatos.Tiene_fechas_espec_ficas || "");
      setAlgoHecho(newDatos.Tiene_algo_hecho_el_cliente || "");
      setCuantasPaginas(newDatos.Cu_ntas_p_ginas_aporta_el_cliente || "");
      setPaginaCorrecciones(newDatos.Cu_ntas_p_ginas_son_de_correcciones || "");
      setPorcentajeCorrecciones(newDatos.porcentajeCorrecciones || "");
      setPorcentajeDePlagio(
        newDatos.Porcentaje_de_plagio_de_lo_que_tenga_hecho || ""
      );
      setAcuerdoPagos(newDatos.Qu_has_acordado_sobre_los_pagos_entregas || "");
      setInformacionAportada(
        newDatos.El_cliente_ha_aportado_toda_la_informaci_n_o_a_n || ""
      );
      setTrabajoDeCampo(newDatos.Tiene_trabajo_de_campo || "");
      setTieneIndice(
        newDatos.El_cliente_tiene_un_indice_que_debe_seguirse || ""
      );
      setcoordinadorNp(newDatos.Coordinador_NP || "");
      setEspecificas(newDatos.Cu_les_son_las_fechas_espec_ficas || "");
      setAlgoValidado(newDatos.Tiene_algo_validado || "");
      setAplicarCorrecciones(newDatos.Hay_que_aplicar_correcciones || "");
      setPaginasNuevas(newDatos.Cu_ntas_p_ginas_son_nuevas || "");
      setHabladoSobre(
        newDatos.Has_hablado_con_el_cliente_sobre_la_cantidad_de_e || ""
      );
      setCantidadDeAdjuntos(newDatos.Cantidad_de_adjuntos || "");
      setTipoDeTrabajo(newDatos.Tipo_de_trabajo_np || "");
      setTipoDeInvestigacion(newDatos.Tipo_de_investigaci_n_np || "");
      setComentarioCerrado(newDatos.Comentario_cerrado_np || "");
      setComentarioCliente(newDatos.Comentarios_Cliente || "");
    }
  }, [newDatos]);

  // seteo de los datos del form con las variables que ya estaba antes
  useEffect(() => {
    setFormData({
      ...formData,
      Tiene_fechas_espec_ficas: fechasEspecificas,
      Tiene_algo_hecho_el_cliente: algoHecho,
      Cu_ntas_p_ginas_aporta_el_cliente: cuantasPaginas,
      Cu_ntas_p_ginas_son_de_correcciones: paginaCorrecciones,
      Porcentaje_de_plagio_de_lo_que_tenga_hecho: porcentajeDePlagio,
      Qu_has_acordado_sobre_los_pagos_entregas: acuerdoPagos,
      El_cliente_ha_aportado_toda_la_informaci_n_o_a_n: informacionAportada,
      Tiene_trabajo_de_campo: trabajoDeCampo,
      l_cliente_tiene_un_indice_que_debe_seguirse: tieneIndice,
      Coordinador_NP: coordinadorNp,
      Cu_les_son_las_fechas_espec_ficas: especificas,
      Tiene_algo_validado: algoValidado,
      Hay_que_aplicar_correcciones: aplicarCorrecciones,
      Cu_ntas_p_ginas_son_nuevas: paginasNuevas,
      Has_hablado_con_el_cliente_sobre_la_cantidad_de_e: habladoSobre,
      El_cliente_tiene_un_indice_que_debe_seguirse: tieneIndice,
      Cantidad_de_adjuntos: cantidadDeAdjuntos,
      Tipo_de_trabajo_np: tipoDeTrabajo,
      Tipo_de_investigaci_n_np: tipoDeInvestigacion,
      Comentario_cerrado_np: comentarioCerrado,
      Comentarios_Cliente: comentarioCLiente, // Corregido aquí el nombre del estado
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    fechasEspecificas,
    algoHecho,
    cuantasPaginas,
    paginaCorrecciones,
    porcentajeDePlagio,
    acuerdoPagos,
    informacionAportada,
    trabajoDeCampo,
    tieneIndice,
    coordinadorNp,
    especificas,
    algoValidado,
    aplicarCorrecciones,
    paginasNuevas,
    habladoSobre,
    cantidadDeAdjuntos,
    tipoDeTrabajo,
    tipoDeInvestigacion,
    comentarioCerrado,
    comentarioCLiente,
  ]);

  //funcion pora volver al componente anterior

  const backTo = (event) => {
    event.preventDefault();
    onReturn();
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

  const [comentarioCerradoLength, setComentarioCerradoLength] = useState(0);
  const [comentarioClienteLength, setComentarioClienteLength] = useState(0);
  const fechas = getFieldValues(fields, "Tiene_fechas_espec_ficas");
  const algo = getFieldValues(fields, "Tiene_algo_hecho_el_cliente");
  const validado = getFieldValues(fields, "Tiene_algo_validado");
  const aplicarCorreccion = getFieldValues(
    fields,
    "Hay_que_aplicar_correcciones"
  );
  const hablado = getFieldValues(
    fields,
    "Has_hablado_con_el_cliente_sobre_la_cantidad_de_e"
  );
  const trabajonp = getFieldValues(fields, "Tipo_de_trabajo_np");
  const investigacionnp = getFieldValues(fields, "Tipo_de_investigaci_n_np");
  const aportado = getFieldValues(
    fields,
    "El_cliente_ha_aportado_toda_la_informaci_n_o_a_n"
  );
  const tcampo = getFieldValues(fields, "Tiene_trabajo_de_campo");

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

  //funcion pora limitar caracteres y espacios de los textArea

  const handleComentarioCerradoChange = (e) => {
    const inputValue = e.target.value;
    // Limitar la longitud del comentario a 1900 caracteres
    if (inputValue.length <= 1900) {
      setComentarioCerrado(inputValue);
      setComentarioCerradoLength(inputValue.length);
    }
  };
  const handleComentarioClienteChange = (e) => {
    const inputValue = e.target.value;
    // Limitar la longitud del comentario a 1900 caracteres
    if (inputValue.length <= 1900) {
      setComentarioCliente(inputValue);
      setComentarioClienteLength(inputValue.length);
    }
  };

  //funcion para mostar o no y limpiar el campo fechas especificas

  const handleFechasEspecificasChange = (e) => {
    setechasEspecificas(e.target.value);
    // Limpiar el campo de fechas específicas si el valor cambia a "no"
    if (e.target.value === "No") {
      setEspecificas("");
    }
  };

  // funcion submit para activar el guardado de datos

  const handleSubmitRedirect = (event) => {
    event.preventDefault();

    const camposVacios = [
      !fechasEspecificas,
      !especificas && fechasEspecificas === "Sí",
      !algoHecho,
      !cuantasPaginas,
      !paginaCorrecciones,
      !porcentajeDePlagio,
      !acuerdoPagos,
      !informacionAportada,
      !trabajoDeCampo,
      !tieneIndice,
      !coordinadorNp,
      !algoValidado,
      !aplicarCorrecciones,
      !paginasNuevas,
      !habladoSobre,
      !cantidadDeAdjuntos,
      !tipoDeTrabajo,
      !tipoDeInvestigacion,
    ];

    const nombresCampos = [
      "¿Tiene fechas específicas?",
      "¿Cuáles son las fechas específicas?",
      "¿Tiene algo hecho el cliente?",
      "¿Cuántas páginas aporta el cliente?",
      "¿Cuántas páginas son de correcciones?",
      "¿Porcentaje de plagio de lo que tenga hecho?",
      "¿Qué has acordado sobre los pagos/entregas?",
      "¿El cliente ha aportado toda la información o aún no?",
      "¿Tiene trabajo de campo?",
      "El cliente tiene un indice que debe seguirse?",
      "Coordinador NP",
      "¿Tiene algo validado?",
      "¿Hay que aplicar correcciones?",
      "¿Cuántas páginas son nuevas?",
      "¿Has hablado con el cliente sobre la cantidad de entregas?",
      "Cantidad de adjuntos",
      "Tipo de trabajo np",
      "Comentario cerrado np",
      // "Comentario Cliente",
    ];
    const campoFaltanteIndex = camposVacios.findIndex((campo) => campo);

    if (fechasEspecificas === "Sí" && !especificas) {
      camposVacios.push(true);
    }
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

  // funcion para cerrar el widget y actualizar datos
  const cerrarWidget = () => {
    const camposVacios = [
      !fechasEspecificas,
      !especificas && fechasEspecificas === "Sí",
      !algoHecho,
      !cuantasPaginas,
      !paginaCorrecciones,
      !porcentajeDePlagio,
      !acuerdoPagos,
      !informacionAportada,
      !trabajoDeCampo,
      !tieneIndice,
      !coordinadorNp,
      !algoValidado,
      !aplicarCorrecciones,
      !paginasNuevas,
      !habladoSobre,
      !cantidadDeAdjuntos,
      !tipoDeTrabajo,
      !tipoDeInvestigacion,
    ];

    const nombresCampos = [
      "¿Tiene fechas específicas?",
      "¿Cuáles son las fechas específicas?",
      "¿Tiene algo hecho el cliente?",
      "¿Cuántas páginas aporta el cliente?",
      "¿Cuántas páginas son de correcciones?",
      "¿Porcentaje de plagio de lo que tenga hecho?",
      "¿Qué has acordado sobre los pagos/entregas?",
      "¿El cliente ha aportado toda la información o aún no?",
      "¿Tiene trabajo de campo?",
      "El cliente tiene un indice que debe seguirse?",
      "Coordinador NP",
      "¿Tiene algo validado?",
      "¿Hay que aplicar correcciones?",
      "¿Cuántas páginas son nuevas?",
      "¿Has hablado con el cliente sobre la cantidad de entregas?",
      "Cantidad de adjuntos",
      "Tipo de trabajo np",
      "Comentario cerrado np",
      // "Comentario Cliente",
    ];
    const campoFaltanteIndex = camposVacios.findIndex((campo) => campo);

    if (fechasEspecificas === "Sí" && !especificas) {
      camposVacios.push(true);
    }
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
    guardarDatos();

    //funcion execute ejecuta codigo externo

    let func_name = "test";
    let req_data = {
      arguments: JSON.stringify({
        dealID: rEgisterID,
      }),
    };
    window.ZOHO.CRM.FUNCTIONS.execute(func_name, req_data)
      .then(function () {
        window.ZOHO.CRM.BLUEPRINT.proceed();
      })
      .catch(function (error) {
        console.log(error);
      });

    //cierra el widget

    window.ZOHO.CRM.UI.Popup.closeReload().then(function (data) {
      console.log(data);
    });
  };

  return (
    <div className="expansor">
      <div className="btns-container">
        <ul>
          <li onClick={backTo} className="btns-guardado" type="submit">
            Volver
          </li>
          {tratoTildado ? (
            <li
              onClick={handleSubmitRedirect}
              className="btns-guardado"
              type="submit"
            >
              Guardar y Continuar
            </li>
          ) : (
            <li onClick={cerrarWidget} className="btns-guardado" type="submit">
              Guardar y Cerrar
            </li>
          )}
        </ul>
      </div>
      <h2 className="title">Cerrado nuevas pautas</h2>
      <form className="form-trato">
        <div className="form-cont">
          <div className="slot">
            <label htmlFor="fechasEspecificas">
              ¿Tiene fechas específicas?
            </label>
            <select
              id="fechasEspecificas"
              value={fechasEspecificas}
              onChange={handleFechasEspecificasChange}
              required
            >
              {fechas.map((tipo, index) => (
                <option key={index} value={tipo.display_value}>
                  {tipo.display_value}
                </option>
              ))}
            </select>
          </div>
          {fechasEspecificas === "Sí" && (
            <div className="slot">
              <label htmlFor="cualesFechasEspecificas">
                ¿Cuáles son las fechas específicas?
              </label>
              <input
                type="date"
                id="cualesFechasEspecificas"
                value={especificas}
                onChange={(e) => setEspecificas(e.target.value)}
                required={fechasEspecificas === "si"}
              />
            </div>
          )}
          <div className="slot">
            <label htmlFor="algoHecho">¿Tiene algo hecho el cliente?</label>
            <select
              id="algoHecho"
              value={algoHecho}
              onChange={(e) => setAlgoHecho(e.target.value)}
              required
            >
              {algo.map((tipo, index) => (
                <option key={index} value={tipo.display_value}>
                  {tipo.display_value}
                </option>
              ))}
            </select>
          </div>
          <div className="slot">
            <label htmlFor="referenciatieneIndice">
              ¿Cuántas páginas aporta el cliente?
            </label>
            <input
              type="text"
              id="fechaContratacion"
              value={cuantasPaginas}
              onChange={(e) => setCuantasPaginas(e.target.value)}
              required
            />
          </div>
          <div className="slot">
            <label htmlFor="paginaCorrecciones">
              ¿Cuántas páginas son de correcciones?
            </label>
            <input
              type="number"
              id="fechaContratacion"
              value={paginaCorrecciones}
              onChange={(e) => setPaginaCorrecciones(e.target.value)}
              required
            />
          </div>
          <div className="slot">
            <label htmlFor="porcentajeDePlagio">
              ¿Porcentaje de plagio de lo que tenga hecho?
            </label>
            <input
              type="text"
              id="porcentajeDePlagio"
              value={porcentajeDePlagio}
              onChange={(e) => setPorcentajeDePlagio(e.target.value)}
              required
            />
          </div>
          <div className="slot">
            <label htmlFor="acuerdoPagos">
              ¿Qué has acordado sobre los pagos/entregas?
            </label>
            <input
              type="text"
              id="acuerdoPagos"
              value={acuerdoPagos}
              onChange={(e) => setAcuerdoPagos(e.target.value)}
              required
            />
          </div>

          <div className="slot-vacio"></div>
        </div>

        <div className="form-cont">
          <div className="slot">
            <label htmlFor="informacionAportada">
              ¿El cliente ha aportado toda la información o aún no?
            </label>
            <select
              id="informacionAportada"
              value={informacionAportada}
              onChange={(e) => setInformacionAportada(e.target.value)}
              required
            >
              {aportado.map((tipo, index) => (
                <option key={index} value={tipo.display_value}>
                  {tipo.display_value}
                </option>
              ))}
            </select>
          </div>
          <div className="slot">
            <label htmlFor="trabajoDeCampo">¿Tiene trabajo de campo?</label>
            <select
              id="trabajoDeCampo"
              value={trabajoDeCampo}
              onChange={(e) => setTrabajoDeCampo(e.target.value)}
              required
            >
              {tcampo.map((tipo, index) => (
                <option key={index} value={tipo.display_value}>
                  {tipo.display_value}
                </option>
              ))}
            </select>
          </div>
          <div className="slot">
            <label htmlFor="tieneIndice">
              El cliente tiene un indice que debe seguirse?
            </label>
            <input
              type="text"
              id="tieneIndice"
              value={tieneIndice}
              onChange={(e) => setTieneIndice(e.target.value)}
              required
            />
          </div>
          <div className="slot">
            <label htmlFor="coordinadorNp">Coordinador NP</label>
            <input
              type="text"
              id="fechaContratacion"
              value={coordinadorNp}
              onChange={(e) => setcoordinadorNp(e.target.value)}
              required
            />
          </div>

          <div className="slot">
            <label htmlFor="algoValidado">¿Tiene algo validado?</label>
            <select
              id="algoValidado"
              value={algoValidado}
              onChange={(e) => setAlgoValidado(e.target.value)}
              required
            >
              {validado.map((tipo, index) => (
                <option key={index} value={tipo.display_value}>
                  {tipo.display_value}
                </option>
              ))}
            </select>
          </div>
          <div className="slot">
            <label htmlFor="aplicarCorrecciones">
              ¿Hay que aplicar correcciones?
            </label>
            <select
              id="aplicarCorrecciones"
              value={aplicarCorrecciones}
              onChange={(e) => setAplicarCorrecciones(e.target.value)}
              required
            >
              {aplicarCorreccion.map((tipo, index) => (
                <option key={index} value={tipo.display_value}>
                  {tipo.display_value}
                </option>
              ))}
            </select>
          </div>
          <div className="slot">
            <label htmlFor="porcentajeCorrecciones">
              ¿Cuántas páginas son nuevas?
            </label>
            <input
              type="number"
              id="porcentajeCorrecciones"
              value={paginasNuevas}
              onChange={(e) => setPaginasNuevas(e.target.value)}
              required
            />
          </div>
          <div className="slot-vacio"></div>
        </div>
        <div className="form-cont">
          <div className="slot">
            <label htmlFor="habladoSobre">
              ¿Has hablado con el cliente sobre la cantidad de entregas?
            </label>
            <select
              id="habladoSobre"
              value={habladoSobre}
              onChange={(e) => setHabladoSobre(e.target.value)}
              required
            >
              {hablado.map((tipo, index) => (
                <option key={index} value={tipo.display_value}>
                  {tipo.display_value}
                </option>
              ))}
            </select>
          </div>
          <div className="slot">
            <label htmlFor="cantidadDeAdjuntos">Cantidad de adjuntos</label>
            <input
              type="text"
              id="fechaContratacion"
              value={cantidadDeAdjuntos}
              onChange={(e) => setCantidadDeAdjuntos(e.target.value)}
              required
            />
          </div>
          <div className="slot">
            <label htmlFor="tipoDeTrabajo">Tipo de trabajo np</label>
            <select
              id="tipoDeTrabajo"
              value={tipoDeTrabajo}
              onChange={(e) => setTipoDeTrabajo(e.target.value)}
              required
            >
              {trabajonp.map((tipo, index) => (
                <option key={index} value={tipo.display_value}>
                  {tipo.display_value}
                </option>
              ))}
            </select>
          </div>
          <div className="slot">
            <label htmlFor="tipoDeInvestigacion">
              Tipo de investigación np:
            </label>
            <select
              id="tipoDeInvestigacion"
              value={tipoDeInvestigacion}
              onChange={(e) => setTipoDeTrabajo(e.target.value)}
              required
            >
              {investigacionnp.map((tipo, index) => (
                <option key={index} value={tipo.display_value}>
                  {tipo.display_value}
                </option>
              ))}
            </select>
          </div>

          <div className="slot text">
            <label htmlFor="comentarioCerrado">Comentario cerrado np</label>
            <textarea
              id="comentarioCerrado"
              value={comentarioCerrado}
              onChange={handleComentarioCerradoChange}
              required
              maxLength={1900} // Limitar la cantidad máxima de caracteres
              rows={Math.ceil(comentarioCerradoLength / 100)} // Calcular las filas en base a la longitud del comentario
            />
            <span>Caracteres restantes: {1900 - comentarioCerradoLength}</span>
          </div>

          <div className="slot text">
            <label htmlFor="comentarioCerrado">Comentarios Cliente</label>
            <textarea
              id="comentarioCLiente"
              value={comentarioCLiente}
              onChange={handleComentarioClienteChange}
              required
              maxLength={25000} // Limitar la cantidad máxima de caracteres
              rows={Math.ceil(comentarioCerradoLength / 100)} // Calcular las filas en base a la longitud del comentario
            />
            <span>Caracteres restantes: {25000 - comentarioClienteLength}</span>
          </div>

          <div className="slot-vacio"></div>
        </div>
      </form>
    </div>
  );
};

export default FormCerrado;
