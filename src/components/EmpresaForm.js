import React from "react";

class EmpresaForm extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <form>
            <div className="form-group">
              <label htmlFor="addressEmpresa">Address empresa</label>
              <input
                readOnly={true}
                className="form-control-plaintext"
                type="text"
                id="addressEmpresa"
                placeholder="0x0000000000000000000000000000000000000000"
              />
            </div>
            <div className="form-group">
              <label htmlFor="nombreEmpresa">Nombre empresa</label>
              <input
                type="text"
                className="form-control"
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
