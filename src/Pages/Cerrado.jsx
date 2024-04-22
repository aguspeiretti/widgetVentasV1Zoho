import React from "react";
import FormCerrado from "../Components/Formularios/FormCerrado";

const Cerrado = ({ datos, registerID, onContinue, onReturn, dts }) => {
  return (
    <div>
      <FormCerrado
        dts={dts}
        datos={datos}
        registerID={registerID}
        onContinue={onContinue}
        onReturn={onReturn}
      />
    </div>
  );
};

export default Cerrado;
