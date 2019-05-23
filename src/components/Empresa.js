import React from "react";

class Empresa extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <form>
            <div className="form-group">
              <label for="addressEmpresa">Address empresa</label>
              <input
                readonly="true"
                class="form-control-plaintext"
                type="text"
                id="addressEmpresa"
                placeholder="0x0000000000000000000000000000000000000000"
              />
            </div>
            <div className="form-group">
              <label for="nombreEmpresa">Nombre empresa</label>
              <input
                type="text"
                class="form-control"
                id="nombreEmpresa"
                readonly="true"
                placeholder="Nombre de la empresa"
              />
            </div>
            <div className="form-group">
              <label for="saldo">Saldo Tokens</label>
              <input
                type="text"
                class="form-control"
                id="saldo"
                readonly="true"
                placeholder="0.00"
              />
            </div>
            <div className="form-group">
              <label for="dronesDisponibles">Drones disponibles</label>
              <input
                type="text"
                class="form-control"
                id="dronesDisponibles"
                readonly="true"
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
