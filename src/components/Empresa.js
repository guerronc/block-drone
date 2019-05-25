import React from "react";

class Empresa extends React.Component {
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
                readOnly={true}
                placeholder="Nombre de la empresa"
              />
            </div>
            <div className="form-group">
              <label htmlFor="saldo">Saldo Tokens</label>
              <input
                type="text"
                className="form-control"
                id="saldo"
                readOnly={true}
                placeholder="0.00"
              />
            </div>
            <div className="form-group">
              <label htmlFor="dronesDisponibles">Drones disponibles</label>
              <input
                type="text"
                className="form-control"
                id="dronesDisponibles"
                readOnly={true}
                placeholder="0"
              />
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Empresa;
