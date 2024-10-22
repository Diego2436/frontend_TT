import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Documentation = () => {
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
            </div>
        </div>
    );
};

export default Documentation;
