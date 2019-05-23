import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

function Layout(props) {
  return (
    <React.Fragment>
      <header id='header'>
        <NavBar />
      </header>
      {props.children}
      <footer id="footer" className='pb-4 pt-4'>
          <Footer></Footer>
      </footer>
    </React.Fragment>
  );
}

export default Layout;
