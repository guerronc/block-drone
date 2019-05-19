import React from "react";
import { Link } from "react-router-dom";

class Empresas extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <h1>SOY EL COMPONENTE DE EMPRESAS</h1>
        </div>
        <div className="container">
          <Link to="/empresas/add" className="btn btn-primary">
            Add Empresa
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

export default Empresas;
