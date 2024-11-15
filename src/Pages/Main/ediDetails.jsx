import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EdiDetails = () => {

    const navigate = useNavigate();

    const { taskID } = useParams();
    const token = localStorage.getItem('token');
    const [activity, setActivity] = useState(null);
    const [activityOptions, setActivityOptions] = useState([]); 
    const [dueDate, setDueDate] = useState(""); 
    const [description, setDescription] = useState(""); 
    const [selectedActivityId, setSelectedActivityId] = useState("");
    const [points, setPoints] = useState("");
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fileSelected, setFileSelected] = useState(false);

    const [filterText, setFilterText] = useState("");
    const [filteredOptions, setFilteredOptions] = useState(activityOptions);

    // Cargar detalles de la actividad específica
    useEffect(() => {
        const fetchActivityDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/user/activities/${taskID}/details`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                });
                const data = response.data;
                setActivity(data);

                // Rellenar campos con los datos obtenidos
                setDueDate(data.fecha_vencimiento);
                setDescription(data.descripcion);
                setPoints(data.puntos);
                setSelectedActivityId(data.actividad_id);
            } catch (error) {
                console.error("Error al obtener los detalles de la actividad:", error);
            }
        };

        if (taskID) {
            fetchActivityDetails();
        }
    }, [taskID, token]);

    // Cargar lista de actividades desde el endpoint `api/beca/list_beca/edd`
    useEffect(() => {
        const fetchActivityOptions = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/beca/list_beca/edi", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                // Extraemos las actividades de la respuesta
                const activities = response.data.Actividades || [];
                setActivityOptions(activities); // Aseguramos que es un arreglo
            } catch (error) {
                console.error("Error al cargar la lista de actividades:", error);
            }
        };

        fetchActivityOptions();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/api/user/activities/${taskID}/update`,
                {
                    fecha_vencimiento: dueDate,
                    descripcion: description,
                    puntos: points,
                    actividad_id: selectedActivityId,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                }
            );
            // Mostrar mensaje de éxito o redirigir
            alert("Tarea actualizada con éxito");
        } catch (error) {
            console.error("Error al guardar los cambios:", error);
            alert("Hubo un error al guardar los cambios. Intenta nuevamente.");
        }
    };

    // Función para obtener los archivos por task_id
    useEffect(() => {
        const fetchFiles = async () => {
            try {
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
            const response = await axios.get(`http://127.0.0.1:8000/api/view_pdf/${fileId}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const pdfUrl = response.data.pdf_url;
            window.open(pdfUrl, '_blank');
        } catch (error) {
            console.error('Error fetching the PDF:', error);
        }
    };

    // Función para eliminar un archivo
    const handleDelete = async (fileId) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/files/delete/${fileId}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // Filtrar los archivos eliminados
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
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Hubo un error al subir el archivo.');
        } finally {
            // Reiniciar el input después de la carga
            event.target.value = null;  // Reiniciar el valor del input
            setFileSelected(false);  // Permitir seleccionar un nuevo archivo
        }
    };

    const handleTaskDelete = async () => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/user/tasks/${taskID}/delete`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            // Mensaje de éxito y redirección
            alert("Actividad eliminada con éxito");
            navigate("/edi"); // Redirige a la página deseada
        } catch (error) {
            console.error("Error al eliminar la actividad:", error);
            alert("Hubo un error al eliminar la actividad. Intenta nuevamente.");
        }
    };   

    // Actualiza las opciones filtradas cuando cambia el texto de filtro
    useEffect(() => {
        // Filtra las opciones que empiezan con el texto del filtro
        let newFilteredOptions = activityOptions.filter((option) =>
            option.Codigo.toLowerCase().startsWith(filterText.toLowerCase())
        );

        // Agrega la opción seleccionada actual si no está en las opciones filtradas
        const selectedOption = activityOptions.find(option => option.ID === selectedActivityId);
        if (selectedOption && !newFilteredOptions.includes(selectedOption)) {
            newFilteredOptions = [selectedOption, ...newFilteredOptions];
        }

        setFilteredOptions(newFilteredOptions);
    }, [filterText, selectedActivityId, activityOptions]);

    // Maneja el cambio en el campo de entrada del filtro
    const handleFilterChange = (e) => {
        setFilterText(e.target.value);
    };

    // Calcular los límites de fechas mínimas y máximas
    const getDateLimits = () => {
        const currentDate = new Date();

        // Limite hacia atrás: 6 años antes de la fecha actual
        const minDate = new Date(currentDate);
        minDate.setFullYear(minDate.getFullYear() - 6);

        // Limite hacia adelante: 2 años después de la fecha actual
        const maxDate = new Date(currentDate);
        maxDate.setFullYear(maxDate.getFullYear() + 2);

        // Formatear las fechas como yyyy-mm-dd
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        return {
            min: formatDate(minDate),
            max: formatDate(maxDate)
        };
    };

    const { min, max } = getDateLimits();

    if (loading) {
        return <p>Cargando archivos...</p>;
    }

    return (
        <div className="container my-4">
            <h3>Editar Detalles de la Actividad</h3>
            <form onSubmit={handleSubmit}>
                <div className="row gy-3 mt-4">

                    <div className="col-12 col-md-4">
                        <label>Fecha de Vencimiento</label>
                        <input
                            type="date"
                            className="form-control"
                            value={dueDate}
                            min={min}
                            max={max}
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                    </div>

                    <div className="col-12 col-md-4">
                        <label>Descripción</label>
                        <input
                            type="text"
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="col-12 col-md-4">
                        <label>Puntos</label>
                        <input
                            type="number"
                            className="form-control"
                            value={points}
                            onChange={(e) => setPoints(e.target.value)}
                            min="0"
                        />
                    </div>
                </div>

                <div className="row gy-3 mt-4">
                    <div className="col-12 col-md-4">
                        <label>Selecciona código de la actividad</label>
                        <input
                            type="text"
                            className="form-control"
                            value={filterText}
                            onChange={handleFilterChange}
                            placeholder="Escribe el código para filtrar"
                        />
                    </div>

                    <div className="col-12 col-md-4">
                        <label>Seleccionar Actividad</label>
                        <select
                            className="form-select"
                            value={selectedActivityId}
                            onChange={(e) => setSelectedActivityId(e.target.value)}
                        >
                            <option value="">Seleccionar</option>
                            {filteredOptions.map((option) => (
                                <option key={option.ID} value={option.ID}>
                                    {option.Codigo} - {option.Nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="d-flex justify-content-center my-4">
                    <button type="submit" className="btn btn-primary me-2">Guardar</button>
                    <a href="/edi" className="btn btn-outline-dark">Volver a buscar</a>
                </div>
            </form>

            <div className="d-flex justify-content-center my-4">
                <button className="btn btn-danger me-2" onClick={handleTaskDelete}>
                    Eliminar
                </button>
            </div>

            <hr />
            
            {/* Sección de Gestión de Archivos */}
            <h3>Archivos de la Actividad</h3>
            <div className="row">
                {files.length > 0 ? (
                    files.map(file => (
                        <div className="col-md-4 mb-4" key={file.id}>
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title mb-3">{file.name}</h5>
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
                                <div className="card-footer d-flex justify-content-center">
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(file.id)}
                                    >
                                        Eliminar
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
                    onChange={handleUpload} 
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

export default EdiDetails;