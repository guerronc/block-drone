import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AddEmpresa from "../pages/AddEmpresa";
import Empresas from "../pages/Empresas";
import Propietarios from "../pages/Propietarios";
import Solicitudes from "../pages/Solicitudes";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import DemoReact from "./DemoReact";
import Layout from "./Layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/empresas/add" component={AddEmpresa} />
          <Route exact path="/empresas" component={Empresas} />
          <Route exact path="/propietarios" component={Propietarios} />
          <Route exact path="/solicitudes" component={Solicitudes} />
          <Route exact path="/demo" component={DemoReact} />
          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
