import React from "react";
import EmpresaForm from "../components/EmpresaForm";
import DroneForm from "../components/DroneForm";
import Empresa from "../components/Empresa";

class AddEmpresa extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="container pb-4 pt-4">
          <div className="row">
            <div className="col-sm-12">
              <Empresa></Empresa>
            </div>
            <div className="col-sm-6">
              <EmpresaForm />
            </div>
            <div className="col-sm-6">
              <DroneForm />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AddEmpresa;
