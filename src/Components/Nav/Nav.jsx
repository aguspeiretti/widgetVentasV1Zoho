/* eslint-disable no-unused-vars */
import "./nav.css";

const Nav = ({ handleSelect, selected }) => {
  const handleClick = (itemName) => {
    handleSelect(itemName);
  };

  const cerrar = () => {
    window.ZOHO.CRM.UI.Popup.closeReload().then(function (data) {
      console.log(data);
    });
  };
  return (
    <div className="contenedor-nav">
      <ul>
        <li
          // onClick={() => handleClick("Información de Trato")}
          className={selected === "Información de Trato" ? "selected" : ""}
        >
          1
        </li>
        <li
          // onClick={() => handleClick("Información de Presupuesto")}
          className={
            selected === "Información de Presupuesto" ? "selected" : ""
          }
        >
          2
        </li>
        <li
          // onClick={() => handleClick("Cerrado nuevas pautas")}
          className={selected === "Cerrado nuevas pautas" ? "selected" : ""}
        >
          3
        </li>
        <li
          // onClick={() => handleClick("Notas")}
          className={selected === "Notas" ? "selected" : ""}
        >
          4
        </li>
      </ul>
      <div onClick={cerrar} className="cerrar">
        X
      </div>
    </div>
  );
};

export default Nav;
