import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const ArchivesActivities = () => {
    const navigate = useNavigate();
    const { taskID } = useParams(); 
    const [files, setFiles] = useState([]);     
    const [loading, setLoading] = useState(true);
    const [fileSelected, setFileSelected] = useState(false);
    const [dueDate, setDueDate] = useState("");
    const [nombreActividad, setNombreActividad] = useState("");

    // Función para obtener los archivos por task_id
    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://127.0.0.1:8000/api/filesEstado/${taskID}/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setFiles(response.data.files);
                setDueDate(response.data.due_date);
                setNombreActividad(response.data.actividad_beca.nombre_actividad);
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

    // Función para manejar la carga de archivos
    const handleUpload = async (event) => {
        const file = event.target.files[0];
    
        // Si ya se ha seleccionado un archivo, no hacemos nada
        if (!file || fileSelected) {
            return;
        }
    
        // Verificamos que el archivo sea un PDF
        if (!file.name.endsWith('.pdf')) {
            alert('Por favor, selecciona un archivo PDF.');
            return;
        }
    
        setFileSelected(true);  // Indica que un archivo ha sido seleccionado
    
        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('file', file);
    
            const response = await axios.post(`http://127.0.0.1:8000/api/upload_pdf/${taskID}/`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            // Actualiza el estado con el nuevo archivo subido
            setFiles([...files, response.data.file]);
            alert('Archivo subido correctamente.');
            window.location.reload();
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Hubo un error al subir el archivo.');
        } finally {
            // Reiniciar el input después de la carga
            event.target.value = null;  // Reiniciar el valor del input
            setFileSelected(false);  // Permitir seleccionar un nuevo archivo
        }
    }; 
    
    const getStatusBadge = (status) => {
        switch (status) {
            case "completada":
                return <span className="badge bg-success">Completa</span>; // Verde
            case "errores":
                return <span className="badge bg-danger">Contiene Errores</span>; // Rojo
            case "precaucion":
                return <span className="badge bg-warning text-dark">Correcciones</span>; // Amarillo con texto oscuro para contraste
            default:
                return <span className="badge bg-secondary">Sin estado</span>; // Gris para otros casos
        }
    };        
    
    if (loading) {
        return <p>Cargando archivos...</p>;
    }

    return (
        <div className="container mt-5">
            <h2>Archivos de la Actividad: {dueDate} - {nombreActividad}</h2>
            <div className="row">
                {files.length > 0 ? (
                    files.map(file => (
                        <div className="col-md-4 mb-4" key={file.id}>
                            <div className="card h-100">
                                <div className="card-body">
                                    {/* Espacio debajo del nombre del archivo */}
                                    <h5 className="card-title mb-3">{file.name}</h5>
                                    <p className="mb-3 text-center">
                                        {getStatusBadge(file.file_status)}
                                    </p>
                                    <button
                                        className="btn btn-primary w-100 mb-3"
                                        onClick={() => handleView(file.id)}
                                    >
                                        Descargar archivo
                                    </button>

                                    <button
                                        className="btn btn-primary w-100 mb-3"
                                        onClick={() => navigate(`/verificacion/${file.id}`)}
                                    >
                                        Verificar archivo
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

            <div className="fixed-bottom mb-4 me-4 d-flex justify-content-end">
                <input 
                    type="file" 
                    accept=".pdf" 
                    onChange={handleUpload}  // Maneja la carga directamente aquí
                    style={{ display: 'none' }} 
                    id="file-upload" 
                />
                <label 
                    htmlFor="file-upload" 
                    className="btn btn-success me-2" 
                >
                    <span className="material-symbols-outlined">add</span>
                </label>
            </div>

        </div>
    );
};

export default ArchivesActivities;
