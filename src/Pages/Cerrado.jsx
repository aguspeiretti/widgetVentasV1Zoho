import React from "react";
import FormCerrado from "../Components/Formularios/FormCerrado";

const Cerrado = ({ registerID, onContinue, onReturn, dts }) => {
  return (
    <div>
      <FormCerrado
        dts={dts}
        registerID={registerID}
        onContinue={onContinue}
        onReturn={onReturn}
      />
    </div>
  );
};

export default Cerrado;
