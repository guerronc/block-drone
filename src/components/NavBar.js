import React from "react";
import { Link } from "react-router-dom";
import LogoBlockchain from "../images/blockchain.svg";

class NavBar extends React.Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link className="navbar-brand w-25 h-25" to="/">
              <img
                src={LogoBlockchain}
                className="All-logo"
                alt="LogoBlockchain"
              />
              BlackDrone
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/empresas">
                    Empresa <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/propietarios">
                    Propietario <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/solicitudes">
                    Solicitudes <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/tokens">
                    Comprar Tokens <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/demo">
                    Demo React <span className="sr-only">(current)</span>
                  </Link>
                </li>
              </ul>                            
            </div>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default NavBar;
