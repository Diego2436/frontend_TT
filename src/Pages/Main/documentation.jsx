import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Documentation = () => {

    const navigate = useNavigate();

    return (
        <div className="container mt-5">
            <h1>Documentación</h1>
            <div className="mt-4">
                <a 
                    href="https://www.ipn.mx/seacademica/comisionescomites/edd/"
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary ms-2" 
                >
                    Información para la beca EDD
                </a>
                
                <a 
                    href="https://www.ipn.mx/investigacion/estimulos/edi/"
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary ms-2" 
                >
                    Información para la beca EDI
                </a>
                
                <a 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    class="btn btn-danger ms-2" 
                >
                    Descargar manual de usuario
                </a>

                <a 
                    onClick={() => navigate('/landing')}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary ms-2" 
                >
                    ¿Aun tienes dudas acerca del sistema?
                </a>

            </div>
        </div>
    );
};

export default Documentation;
