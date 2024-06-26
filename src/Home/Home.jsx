import React, { useState } from "react";
import Nav from "../Components/Nav/Nav";
import "./home.css";
import InfoTrato from "../Pages/InfoTrato";
import InfoPresupuesto from "../Pages/InfoPresupuesto";
import Cerrado from "../Pages/Cerrado";
import Notas from "../Pages/Notas";

const Home = ({ datos, registerID, dts }) => {
  const [title, setTitle] = useState("Información de Trato");

  //selector de titulo para la renderizacion

  const handleSelect = (select) => {
    setTitle(select);
  };

  //redireccionadores para los forms

  const redirectToPresupuesto = () => {
    setTitle("Información de Presupuesto");
  };
  const redirectTocerrado = () => {
    setTitle("Cerrado nuevas pautas");
  };
  const redirectTonotas = () => {
    setTitle("Notas");
  };
  const redirectTotrato = () => {
    setTitle("Información de Trato");
  };

  return (
    <div className="home-container">
      <Nav handleSelect={handleSelect} selected={title} />
      <div className="info-container">
        <div className="contenido">
          <div className="pages">
            {datos ? (
              <>
                {title === "Información de Trato" ? (
                  <InfoTrato
                    dts={dts}
                    registerID={registerID}
                    onContinue={redirectToPresupuesto}
                  />
                ) : title === "Información de Presupuesto" ? (
                  <InfoPresupuesto
                    dts={dts}
                    registerID={registerID}
                    onContinue={redirectTocerrado}
                    onReturn={redirectTotrato}
                  />
                ) : title === "Notas" ? (
                  <Notas
                    dts={dts}
                    registerID={registerID}
                    onReturn={redirectTocerrado}
                  />
                ) : title === "Cerrado nuevas pautas" ? (
                  <Cerrado
                    dts={dts}
                    registerID={registerID}
                    onContinue={redirectTonotas}
                    onReturn={redirectToPresupuesto}
                  />
                ) : (
                  <InfoTrato
                    dts={dts}
                    registerID={registerID}
                    onContinue={redirectToPresupuesto}
                  />
                )}
              </>
            ) : (
              <div> Cargando datos...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
