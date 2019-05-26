import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Accounts from './Accounts';

function Layout(props) {
  return (
    <React.Fragment>      
      <header id="header">
        <NavBar />
      </header>
      <header id='accounts'>
        <Accounts></Accounts>
      </header>
      {props.children}
      <footer id="footer">
        <Footer />
      </footer>
    </React.Fragment>
  );
}

export default Layout;
