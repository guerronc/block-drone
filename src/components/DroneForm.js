import React from "react";

class DroneForm extends React.Component {
  //uint256 _alturaMaxima,uint256 _alturaMinima,uint256 _autonomia,uint256 _costo,address _empresa, uint256 _pesticida
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
              <label for="alturaMaxima">Altura Maxima</label>
              <input
                type="text"
                class="form-control"
                id="alturaMaxima"
                placeholder="Altura maxima de vuelo"
              />
            </div>
            <div className="form-group">
              <label for="alturaMinima">Altura Minima</label>
              <input
                type="text"
                class="form-control"
                id="alturaMinima"
                placeholder="Altura minima de vuelo"
              />
            </div>
            <div className="form-group">
              <label for="autonomia">Autonomia</label>
              <input
                type="text"
                class="form-control"
                id="autonomia"
                placeholder="Autonomia de vuelo"
              />
            </div>
            <div className="form-group">
              <label for="costo">Costo</label>
              <input
                type="text"
                class="form-control"
                id="costo"
                placeholder="Costo de servicio"
              />
            </div>
            <div class="form-group">
              <label for="exampleFormControlSelect1">Pesticida</label>
              <select class="form-control" id="exampleFormControlSelect1">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Grabar Drone
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default DroneForm;
