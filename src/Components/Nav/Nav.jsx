/* eslint-disable no-unused-vars */
import "./nav.css";

const Nav = ({ handleSelect, selected }) => {
  const cerrar = () => {
    window.ZOHO.CRM.UI.Popup.closeReload().then(function (data) {
      console.log(data);
    });
  };
  return (
    <div className="contenedor-nav">
      <ul>
        <li className={selected === "Información de Trato" ? "selected" : ""}>
          1
        </li>
        <li
          className={
            selected === "Información de Presupuesto" ? "selected" : ""
          }
        >
          2
        </li>
        <li className={selected === "Cerrado nuevas pautas" ? "selected" : ""}>
          3
        </li>
        <li className={selected === "Notas" ? "selected" : ""}>4</li>
      </ul>
      <div onClick={cerrar} className="cerrar">
        X
      </div>
    </div>
  );
};

export default Nav;
