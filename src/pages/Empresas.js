import React from "react";
import { Link } from "react-router-dom";

class Empresas extends React.Component {
  render() {
    return (
      <React.Fragment>
        <section className="App-header">
          <div className="container pb-4 pt-4 text-center">
            <h1>SOY EL COMPONENTE DE EMPRESAS</h1>
            <Link to="/empresas/add" className="btn btn-primary">
              Add Empresa
            </Link>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Empresas;
