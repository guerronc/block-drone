import React from "react";
import "./styles/Global.css";

class LogoInfo extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="card w-auto h-auto">
          <img
            src={this.props.logo}
            className="card-img-top w-25 mx-auto p-2"
            alt="Logo"
          />
          <div className="card-body">
            <h5 className="card-title">{this.props.nombre}</h5>
            <p className="card-text">{this.props.detalle}</p>
          </div>
          <div className="card-body">
            <a
              className="App-link"
              href={this.props.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn {this.props.nombre}
            </a>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LogoInfo;
