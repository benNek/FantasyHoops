import React, { Component } from 'react';

export class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-toggleable-md navbar-dark navbar-inverse bg-primary">
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand" href="#"><img src="http://www.zillakgames.com/web/game-thumbnails/C/classic%20basketball.png" width="30" height="30" alt="" /> Fantasy Hoops</a>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#">News feed<span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Injuries feed</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Game
                  </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <a className="dropdown-item" href="#">Lineup</a>
                  <a className="dropdown-item" href="#">Daily Top users</a>
                  <a className="dropdown-item" href="#">Most selected players</a>
                </div>
              </li>
            </ul>
            <ul className="nav navbar-nav ml-auto">
              <li className="dropdown">
                <a className="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Account
                  </a>
                <ul className="dropdown-menu dropdown-menu-right">
                  <li>
                    <div className="navbar-login">
                      <div className="row">
                        <div className="col-lg-4">
                          <p className="text-center">
                            <img src="http://www.freeiconspng.com/uploads/profile-icon-9.png" width="100" height="120" alt="" />
                          </p>
                        </div>
                        <div className="col-lg-8">
                          <p className="text-left"><strong>Nombre Apellido</strong></p>
                          <p className="text-left small">correoElectronico@email.com</p>
                          <p className="text-left">
                            <a href="#" className="btn btn-primary btn-block btn-sm">Actualizar Datos</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="divider"></li>
                  <li>
                    <div className="navbar-login navbar-login-session">
                      <div className="row">
                        <div className="col-lg-12">
                          <p>
                            <a href="#" className="btn btn-danger btn-block">Cerrar Sesion</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}