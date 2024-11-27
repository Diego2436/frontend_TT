import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import manual from '../../Documents/ManualUsuario.pdf'

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
                    className="btn btn-primary ms-2 mb-3"  // Agregado mb-3 para margen inferior
                >
                    Información para la beca EDD
                </a>
                
                <a 
                    href="https://www.ipn.mx/investigacion/estimulos/edi/"
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary ms-2 mb-3"  // Agregado mb-3 para margen inferior
                >
                    Información para la beca EDI
                </a>
                
                <a
                    href={manual} // Agregamos el enlace al archivo PDF
                    target="_blank"
                    rel="noopener noreferrer"
                    download="ManualUsuario.pdf" // Especifica que se descargue con este nombre
                    className="btn btn-danger ms-2 mb-3" // Estilos de la clase
                >
                    Descargar manual de usuario
                </a>

                <a 
                    onClick={() => navigate('/landing')}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary ms-2 mb-3"  // Agregado mb-3 para margen inferior
                >
                    ¿Aun tienes dudas acerca del sistema?
                </a>

            </div>
        </div>
    );
};

export default Documentation;
