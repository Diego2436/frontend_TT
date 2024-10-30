import React from "react";
import { useNavigate, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Navbar = () => {
    const navigate = useNavigate();

    const isAuthenticated = !!(localStorage.getItem("token") || sessionStorage.getItem("token"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        navigate("/");
        window.location.reload();
    };

    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#002fe9" }} role="navigation">
            <div className="container-fluid">
                <ul className="navbar-nav mb-2 mb-lg-0">
                    <li className="nav-item dropdown">
                        <button 
                            className="btn btn-secondary dropdown-toggle btn-lg"
                            type="button" 
                            data-bs-toggle="dropdown" 
                            aria-expanded="false"
                            style={{ 
                                backgroundColor: "#002fe9", 
                                borderColor: "#002fe9", 
                                fontSize: '1.25rem'
                            }} 
                        >
                        Páginas
                        </button>
                        <ul className="dropdown-menu" style={{ width: "300px"}} aria-labelledby="navbarDropdown">
                            {isAuthenticated && (
                                <>
                                    <li>
                                        <Link className="dropdown-item" to="/perfil">
                                            <span className="material-symbols-rounded me-2">person</span>
                                            Perfil
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/archivos">
                                            <span className="material-symbols-rounded me-2">folder</span>
                                            Archivos
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/documentacion">
                                            <span className="material-symbols-rounded me-2">article</span>
                                            Documentación
                                        </Link>
                                    </li>
                                    <li>
                                        <button className="dropdown-item" onClick={handleLogout}>
                                            <span className="material-symbols-rounded me-2">logout</span>
                                            Cerrar sesión
                                        </button>
                                    </li>
                                </>
                            )}
                        </ul>
                    </li>
                </ul>

                <Link to="/main" className="navbar-brand d-flex align-items-center">
                    <span className="material-symbols-rounded" style={{ fontSize: '36px', color: 'white' }}>home</span>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
