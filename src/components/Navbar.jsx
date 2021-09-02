import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/facts">
                    Cálculo de Predicado
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarColor02"
                    aria-controls="navbarColor02"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor02">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item dropdown">
                            <h6
                                className="nav-link dropdown-toggle"
                                data-bs-toggle="dropdown"
                                role="button"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                INGRESAR
                            </h6>
                            <div className="dropdown-menu">
                                <Link className="dropdown-item" to="/facts">
                                    HECHOS
                                </Link>
                                <Link className="dropdown-item" to="/rules">
                                    CONOCIMIENTOS
                                </Link>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <h6
                                className="nav-link dropdown-toggle"
                                data-bs-toggle="dropdown"
                                role="button"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                CONSULTAR
                            </h6>
                            <div className="dropdown-menu">
                                <Link className="dropdown-item" to="/list/facts">
                                    LISTA DE HECHOS
                                </Link>
                                <Link className="dropdown-item" to="/list/rules">
                                    LISTA DE CONOCIMIENTOS
                                </Link>
                                <Link className="dropdown-item" to="/checks">
                                    METAS
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
