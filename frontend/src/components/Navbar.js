import React from "react";

export const Navbar = () => {

return(
<nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand">Sitenso</a>
          <form className="d-flex">
            <button className="btn btn-outline-success" type="submit">Login</button>
          </form>
        </div>
      </nav>
);
}