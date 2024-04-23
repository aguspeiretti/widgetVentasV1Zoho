import React from "react";
import FormPresupuesto from "../Components/Formularios/FormPresupuesto";

const InfoPresupuesto = ({ registerID, onContinue, onReturn, dts }) => {
  return (
    <div>
      <FormPresupuesto
        dts={dts}
        onContinue={onContinue}
        registerID={registerID}
        onReturn={onReturn}
      />
    </div>
  );
};

export default InfoPresupuesto;
