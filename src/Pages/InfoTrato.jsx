import React from "react";
import FormTrato from "../Components/Formularios/FormTrato";
import "./paginas.css";

const InfoTrato = ({ registerID, onContinue, dts }) => {
  console.log("on", onContinue);
  return (
    <div className="pag-container">
      <FormTrato dts={dts} registerID={registerID} onContinue={onContinue} />
    </div>
  );
};

export default InfoTrato;
