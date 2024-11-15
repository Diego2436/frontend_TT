import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';  // Importar el hook para la navegación

const Folder = ({ name, files, taskId }) => {
    const navigate = useNavigate();  // Usar el hook useNavigate para la navegación

    // Función para manejar el clic en el folder
    const handleFolderClick = () => {
        navigate(`/archivosActividades/${taskId}`);  // Navegar a la página con el ID de la tarea
    };

    return (
        <div className="card mb-3" onClick={handleFolderClick} style={{ cursor: 'pointer' }}>
            <div className="card-body">
                <h5 className="card-title">
                    <i className="bi bi-folder-fill"></i> {name}
                </h5>
                <div className="card-text"> {/* Reemplazado <p> por <div> */}
                    {files.length > 0 ? (
                        <div>
                            {files.map((file, index) => (
                                <span key={index} className="badge bg-info me-2">
                                    {file}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <span className="text-muted">La actividad no tiene ningun documento.</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Folder;

