import React from "react";

class Accounts extends React.Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-dark bg-dark">
          <div className="container">
            <div className="input-group input-group-sm account-size ml-auto">
              <div className="input-group-prepend">
                <label
                  className="input-group-text"
                  htmlFor="inputGroupSelect01"
                >
                  Accounts
                </label>
              </div>
              <select
                className="custom-select"
                id="inputGroupSelect01"
                defaultValue="0"
              >
                <option value="1">
                  0x0000000000000000000000000000000000000001
                </option>
                <option value="2">
                  0x0000000000000000000000000000000000000002
                </option>
                <option value="3">
                  0x0000000000000000000000000000000000000003
                </option>
              </select>
            </div>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default Accounts;
