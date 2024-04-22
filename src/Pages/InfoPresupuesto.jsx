import React from "react";
import FormPresupuesto from "../Components/Formularios/FormPresupuesto";

const InfoPresupuesto = ({ datos, registerID, onContinue, onReturn, dts }) => {
  return (
    <div>
      <FormPresupuesto
        dts={dts}
        onContinue={onContinue}
        datos={datos}
        registerID={registerID}
        onReturn={onReturn}
      />
    </div>
  );
};

export default InfoPresupuesto;
