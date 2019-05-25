import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

function Layout(props) {
  return (
    <React.Fragment>
      <header id="header">
        <NavBar />
      </header>
      {props.children}      
      <footer id="footer">
        <Footer />
      </footer>
    </React.Fragment>
  );
}

export default Layout;
