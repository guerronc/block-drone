import React from "react";
import LogoNode from "../images/nodejs.svg";
import LogoJs from "../images/javascript.svg";
import LogoReact from "../images/logo.svg";
import LogoGanache from "../images/ganache.svg";
import LogoSolidity from "../images/solidity.svg";
import LogoTruffle from "../images/truffle.svg";
import LogoInfo from "./LogoInfo";

class EntornoDev extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="container pb-3 pt-3">
          <div className="row text-center">
            <div className='col-12'>
              <h2 className="display-5">Entorno de desarrollo</h2>
            </div>
            <div className="col-12 col-lg-4 col-sm-6 col-xl-3 p-2">
              <LogoInfo
                logo={LogoSolidity}
                nombre="Solidity"
                detalle="Lenguaje para desarrollar Smart Contract con Ethereum"
                url="https://solidity-es.readthedocs.io/es/latest/"
              />
            </div>
            <div className="col-12 col-lg-4 col-sm-6 col-xl-3 p-2">
              <LogoInfo
                logo={LogoTruffle}
                nombre="Truffle Framework"
                detalle="Framework para el desarrollo de Smart contracts"
                url="https://truffleframework.com/"
              />
            </div>
            <div className="col-12 col-lg-4 col-sm-6 col-xl-3 p-2">
              <LogoInfo
                logo={LogoGanache}
                nombre="Ganache"
                detalle="Entorno de desarrollo para probar Smart contracts"
                url="https://truffleframework.com/"
              />
            </div>
            <div className="col-12 col-lg-4 col-sm-6 col-xl-3 p-2">
              <LogoInfo
                logo={LogoNode}
                nombre="Node JS"
                detalle="Lenguaje Backend usando Javascript"
                url="https://truffleframework.com/"
              />
            </div>
            <div className="col-12 col-lg-4 col-sm-6 col-xl-3 p-2">
              <LogoInfo
                logo={LogoJs}
                nombre="Javascript"
                detalle="Framework para el desarrollo de Smart contracts"
                url="https://truffleframework.com/"
              />
            </div>
            <div className="col-12 col-lg-4 col-sm-6 col-xl-3 p-2">
              <LogoInfo
                logo={LogoReact}
                nombre="React JS"
                detalle="Libreria para el desarrollo de frontend con Javascript"
                url="https://reactjs.org/"
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default EntornoDev;
