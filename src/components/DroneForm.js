import React from "react";

class DroneForm extends React.Component {
  //uint256 _alturaMaxima,uint256 _alturaMinima,uint256 _autonomia,uint256 _costo,address _empresa, uint256 _pesticida
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <form>            
            <div className="form-group">
              <label htmlFor="alturaMaxima">Altura Maxima</label>
              <input
                type="text"
                className="form-control form-control-sm"
                id="alturaMaxima"
                placeholder="Altura maxima de vuelo"
              />
            </div>
            <div className="form-group">
              <label htmlFor="alturaMinima">Altura Minima</label>
              <input
                type="text"
                className="form-control form-control-sm"
                id="alturaMinima"
                placeholder="Altura minima de vuelo"
              />
            </div>
            <div className="form-group">
              <label htmlFor="autonomia">Autonomia</label>
              <input
                type="text"
                className="form-control form-control-sm"
                id="autonomia"
                placeholder="Autonomia de vuelo"
              />
            </div>
            <div className="form-group">
              <label htmlFor="costo">Costo</label>
              <input
                type="text"
                className="form-control form-control-smf"
                id="costo"
                placeholder="Costo de servicio"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">Pesticida</label>
              <select className="form-control" id="exampleFormControlSelect1">
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
