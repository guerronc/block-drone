import React from "react";

class EmpresaForm extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <form>            
            <div className="form-group">
              <label htmlFor="nombreEmpresa">Nombre empresa</label>
              <input
                type="text"
                className="form-control form-control-sm"
                id="nombreEmpresa"
                aria-describedby="nombreHelp"
                placeholder="Nombre de la empresa"
              />
              <small id="nombreHelp" className="form-text text-muted">
                Ingresar nombre de empresa
              </small>
            </div>
            <button type="submit" className="btn btn-primary">
              Grabar Empresa
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default EmpresaForm;
