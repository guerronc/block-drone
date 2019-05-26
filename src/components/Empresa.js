import React from "react";

class Empresa extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <form>
            <div className="form-group row">
              <label className='col-sm-2 col-form-label' htmlFor="addressEmpresa">Address empresa</label>
              <input
                readOnly={true}
                className="form-control-plaintext form-control-sm"
                type="text"
                id="addressEmpresa"
                placeholder="0x0000000000000000000000000000000000000000"
              />
            </div>
            <div className="form-group">
              <label htmlFor="nombreEmpresa">Nombre empresa</label>
              <input
                readOnly={true}
                className="form-control-plaintext form-control-sm"
                type="text"
                id="nombreEmpresa"
                placeholder="Nombre de la empresa"
              />
            </div>
            <div className="form-group">
              <label htmlFor="saldo">Saldo Tokens</label>
              <input
                readOnly={true}
                className="form-control-plaintext form-control-sm"
                type="text"
                id="saldo"
                placeholder="0.00"
              />
            </div>
            <div className="form-group">
              <label htmlFor="dronesDisponibles">Drones disponibles</label>
              <input
                readOnly={true}
                className="form-control-plaintext form-control-sm"
                type="text"
                id="dronesDisponibles"
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
