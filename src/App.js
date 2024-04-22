import { useEffect, useState } from "react";
import "./App.css";
import Home from "./Home/Home";
import { getRecord } from "./functions/apiFunctions";

function App(data) {
  const module = data.data.Entity;
  const registerID = data.data.EntityId;
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    window.ZOHO.CRM.UI.Resize({ height: "100%", width: "100%" }).then(function (
      data
    ) {});

    getRecord(module, registerID)
      .then(function (result) {
        const datos = result.register;
        setDatos(datos);
      })
      .catch(function (error) {
        // console.error(error);
      });
  }, [module, registerID]);

  //Aca llamamos a las funciones de zoho para traer o enviar data. Se les pasa como parametro la info que necesitan para ejecutarse.

  return (
    <div className="App">
      <Home datos={datos} registerID={registerID} dts={data} />
    </div>
  );
}

export default App;
