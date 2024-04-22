import React, { useEffect, useState } from "react";
import Nav from "../Components/Nav/Nav";
import "./home.css";
import InfoTrato from "../Pages/InfoTrato";
import InfoPresupuesto from "../Pages/InfoPresupuesto";
import Cerrado from "../Pages/Cerrado";
import Notas from "../Pages/Notas";

const Home = ({ datos, registerID, dts }) => {
  const [title, setTitle] = useState("Información de Trato");

  const handleSelect = (select) => {
    setTitle(select);
  };

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
                    datos={datos}
                    registerID={registerID}
                    onContinue={redirectToPresupuesto}
                  />
                ) : title === "Información de Presupuesto" ? (
                  <InfoPresupuesto
                    dts={dts}
                    datos={datos}
                    registerID={registerID}
                    onContinue={redirectTocerrado}
                    onReturn={redirectTotrato}
                  />
                ) : title === "Notas" ? (
                  <Notas
                    dts={dts}
                    datos={datos}
                    registerID={registerID}
                    onReturn={redirectTocerrado}
                  />
                ) : title === "Cerrado nuevas pautas" ? (
                  <Cerrado
                    dts={dts}
                    datos={datos}
                    registerID={registerID}
                    onContinue={redirectTonotas}
                    onReturn={redirectToPresupuesto}
                  />
                ) : (
                  <InfoTrato
                    dts={dts}
                    datos={datos}
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
