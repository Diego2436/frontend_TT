import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';  // Asegúrate de tener Bootstrap importado

const ArchivesActivities = () => {
    const { taskID } = useParams();  // Extrae el taskID desde la URL
    const [files, setFiles] = useState([]);     // Estado para almacenar los archivos
    const [loading, setLoading] = useState(true); // Estado de carga

    // Función para obtener los archivos por task_id
    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://127.0.0.1:8000/api/files/${taskID}/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setFiles(response.data.files);  // Actualizamos los archivos en el estado
                setLoading(false);
            } catch (error) {
                console.error('Error fetching files:', error);
                setLoading(false);
            }
        };

        fetchFiles();
    }, [taskID]);

    // Función para ver el archivo
    const handleView = async (fileId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://127.0.0.1:8000/api/view_pdf/${fileId}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const pdfUrl = response.data.pdf_url;

            // Abrir el PDF en una nueva pestaña del navegador
            window.open(pdfUrl, '_blank');
        } catch (error) {
            console.error('Error fetching the PDF:', error);
        }
    };

    // Función para eliminar un archivo
    const handleDelete = async (fileId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://127.0.0.1:8000/api/files/delete/${fileId}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // Después de eliminar, filtramos los archivos para remover el eliminado
            setFiles(files.filter(file => file.id !== fileId));
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };

    if (loading) {
        return <p>Cargando archivos...</p>;
    }

    return (
        <div className="container mt-5">
            <h1>Archivos de la Actividad {taskID}</h1>
            <div className="row">
                {files.length > 0 ? (
                    files.map(file => (
                        <div className="col-md-4 mb-4" key={file.id}>
                            <div className="card h-100">
                                <div className="card-body">
                                    {/* Espacio debajo del nombre del archivo */}
                                    <h5 className="card-title mb-3">{file.name}</h5>
                                    <button
                                        className="btn btn-primary w-100 mb-3"
                                        onClick={() => handleView(file.id)}
                                    >
                                        Descargar archivo
                                    </button>
                                </div>

                                {/* Centrar el botón de "Eliminar" en el pie de la tarjeta */}
                                <div className="card-footer d-flex justify-content-center">
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(file.id)}  // Llamada a la función de eliminar
                                    >
                                        <span className="material-symbols-outlined">delete</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay archivos para esta actividad.</p>
                )}
            </div>
        </div>
    );
};

export default ArchivesActivities;
