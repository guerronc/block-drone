import React from "react";
import { Link } from "react-router-dom";
import EntornoDev from "../components/EntornoDev";

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="container pb-4 pt-4">
          <h1 className="display-4">Trabajo final de experto</h1>
          <p className="lead">
            Analizar, diseñar e implementar una aplicación web para realizar
            fumigación con drones utilizando la tecnología Blockchain
          </p>
          <hr className="my-4" />
          <p>
            Una empresa ha desarrollado un sistema de fumigación con drones y
            nos ha solicitado que desarrollemos una solución basada en la
            Blockchain de Alastria para su uso...
          </p>

          <a
            className="btn btn-primary btn-lg"
            href="https://github.com/guerronc/unir-tfe"
            target="_blank"
            rel="noopener noreferrer"
            role="button"
          >
            Learn more
          </a>
        </div>
        <section id="entornoDev">
          <EntornoDev />
        </section>
      </React.Fragment>
    );
  }
}

export default Home;
