import React from "react";
import LogoGitHub from "../images/github.svg";
import LogoGitLab from "../images/gitlab.svg";
import LogoUnir from "../images/unir.svg";

class Footer extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="container h-auto pb-4 pt-4">
          <div className="row text-center">
            <div className="col-12 pb-5">
              © Code for Block - Developers united 2019
            </div>
            <div className="col-12 col-sm-4">
              <img src={LogoUnir} className='w-25'/>
              Universidad del internet
            </div>
            <div className="col-12 col-sm-4">
              <img src={LogoGitHub} className='w-25'/>
              GitHub
            </div>
            <div className="col-12 col-sm-4">
              <img src={LogoGitLab} className='w-25'/>
              GitLab
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Footer;
