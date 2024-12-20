import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import Calendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './MyCalendar.css';
import EdiCreate from './ediCreate'; 

const EDI = () => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState('kanban');
    const [titles, setTitles] = useState([]); 
    const [date, setDate] = useState(new Date()); 
    const [showEdiCreate, setShowEdiCreate] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [showEdiDetails, setShowEdiDetails] = useState(false);
    const [selectedTitle, setSelectedTitle] = useState("");

    // Recuperar las actividades cuando se monta el componente
    useEffect(() => {
        fetch("http://localhost:8000/api/user/tasks/edi", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                // Si hay un mensaje, actualiza el estado del error
                setError(data.message);
                setTitles([]); // Asegúrate de que el array de títulos esté vacío
            } else {
                setTitles(data); // Actualiza el estado con las actividades si existen
                setError(""); // Limpia el mensaje de error si la solicitud fue exitosa
            }
        })
        .catch(error => setError("Error al cargar las actividades"));
    }, []);
    
    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const handleEditActivity = (activity) => {
        navigate(`/ediDetails/${activity.id}`);
    };

    const onDateChange = (newDate) => {
        setDate(newDate);
        const formattedDate = formatDate(newDate); // Formatear la fecha
        const titleEntry = titles.find(title => title.fecha_vencimiento === formattedDate);
        setSelectedTitle(titleEntry ? titleEntry.descripcion : ""); // Actualizar el título correspondiente
    };

    const tileContent = ({ date }) => {
        const formattedDate = formatDate(date); // Formatear la fecha
        const activity = titles.find(title => title.fecha_vencimiento === formattedDate);

        if (activity) {
            let tileClass = '';

            // Cambiar el color de la fecha según el estado
            switch (activity.estado) {
                case 'en progreso':
                    tileClass = 'gris';
                    break;
                case 'completada':
                    tileClass = 'verde';
                    break;
                case 'errores':
                    tileClass = 'rojo';
                    break;
                case 'precaucion':
                    tileClass = 'amarillo';
                    break;
                default:
                    tileClass = ''; // Si no tiene un estado relevante
                    break;
            }

            return <div className={`highlight-date ${tileClass}`} style={{ height: '100%', width: '100%' }}></div>;
        }
    };

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript comienzan en 0
        const year = date.getFullYear();
        return `${day}-${month}-${year}`; // Formato dd-mm-yyyy
    };

    const handleEditActivityFromCalendar = (date) => {
        const formattedDate = formatDate(date);
        const activityToEdit = titles.find(title => title.fecha_vencimiento === formattedDate);
        if (activityToEdit) {
            navigate(`/ediDetails/${activityToEdit.id}`);
        }
    };

    const updateActivity = (updatedActivity) => {
        setTitles((prevTitles) => {
            return prevTitles.map((activity) =>
                activity.fecha_vencimiento === selectedActivity.fecha_vencimiento ? updatedActivity : activity
            );
        });
        setShowEdiDetails(false); // Cerrar el modal de edición después de actualizar
    };

    const convertToSortableDate = (dateStr) => {
        const [day, month, year] = dateStr.split('-');
        return `${year}-${month}-${day}`;  // Retorna el formato YYYY-MM-DD
    };

    // Filtrar y ordenar las actividades por su estado para las columnas del Kanban
    const kanbanColumns = {
        actividades: titles
            .filter(activity => activity.estado === 'en progreso')
            .sort((a, b) => new Date(convertToSortableDate(a.fecha_vencimiento)) - new Date(convertToSortableDate(b.fecha_vencimiento))),
        errores: titles
            .filter(activity => activity.estado === 'errores')
            .sort((a, b) => new Date(convertToSortableDate(a.fecha_vencimiento)) - new Date(convertToSortableDate(b.fecha_vencimiento))),
        correciones: titles
            .filter(activity => activity.estado === 'precaucion')
            .sort((a, b) => new Date(convertToSortableDate(a.fecha_vencimiento)) - new Date(convertToSortableDate(b.fecha_vencimiento))),
        finalizadas: titles
            .filter(activity => activity.estado === 'completada')
            .sort((a, b) => new Date(convertToSortableDate(a.fecha_vencimiento)) - new Date(convertToSortableDate(b.fecha_vencimiento)))
    };

    return (
        <div className="container mt-5 text-center">
            <h1>Actividades EDI</h1>
            <div className="mt-4">
                <button
                    className={`btn btn-lg me-3 ${selectedOption === 'kanban' ? 'text-primary' : 'text-dark'}`}
                    onClick={() => handleOptionClick('kanban')}
                    style={{
                        border: 'none',
                        borderBottom: selectedOption === 'kanban' ? '3px solid blue' : '3px solid transparent',
                        backgroundColor: 'transparent',
                        width: '200px'
                    }}
                >
                    KanBan
                </button>

                <button
                    className={`btn btn-lg ${selectedOption === 'calendario' ? 'text-primary' : 'text-dark'}`}
                    onClick={() => handleOptionClick('calendario')}
                    style={{
                        border: 'none',
                        borderBottom: selectedOption === 'calendario' ? '3px solid blue' : '3px solid transparent',
                        backgroundColor: 'transparent',
                        width: '200px'
                    }}
                >
                    Calendario
                </button>
            </div>

            {selectedOption === 'calendario' && (
                <>
                    <div className="mt-4">
                        <Calendar
                            onChange={onDateChange}
                            value={date}
                            tileContent={tileContent} // Cambiar color de las fechas con títulos
                            className="custom-calendar" // Añadir clase personalizada
                        />
                    </div>
                    {selectedTitle && (
                        <div className="mt-4">
                            <h5>Título para {formatDate(date)}:</h5>
                            <p>{selectedTitle}</p>
                            <button className="btn btn-info" onClick={() => handleEditActivityFromCalendar(date)}>Detalles</button>
                        </div>
                    )}
                    <div className="mt-4">
                        <button className="btn btn-primary" onClick={() => setShowEdiCreate(true)}>
                            Crear Actividad
                        </button>
                    </div>
                </>
            )}

            {selectedOption === 'kanban' && (
                <>
                    <div className="d-flex justify-content-between mt-4" style={{ flexWrap: 'wrap' }}>
                        <div className="kanban-column actividades" style={{ flex: '1 1 23%' }}>
                            <h4>Actividades</h4>
                            <ul>
                                {kanbanColumns.actividades.map((activity, index) => (
                                    <li key={index} style={{ marginBottom: '10px' }}>
                                        <strong>{activity.descripcion}</strong> - {activity.fecha_vencimiento}
                                        <div className="mt-2">
                                            <button className="btn btn-info" onClick={() => handleEditActivity(activity)}>Detalles</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="kanban-column errores" style={{ flex: '1 1 23%' }}>
                            <h4>Errores</h4>
                            <ul>
                                {kanbanColumns.errores.map((activity, index) => (
                                    <li key={index} style={{ marginBottom: '10px' }}>
                                        <strong>{activity.descripcion}</strong> - {activity.fecha_vencimiento}
                                        <div className="mt-2">
                                            <button className="btn btn-info" onClick={() => handleEditActivity(activity)}>Detalles</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="kanban-column correciones" style={{ flex: '1 1 23%' }}>
                            <h4>Correciones</h4>
                            <ul>
                                {kanbanColumns.correciones.map((activity, index) => (
                                    <li key={index} style={{ marginBottom: '10px' }}>
                                        <strong>{activity.descripcion}</strong> - {activity.fecha_vencimiento}
                                        <div className="mt-2">
                                            <button className="btn btn-info" onClick={() => handleEditActivity(activity)}>Detalles</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="kanban-column finalizadas" style={{ flex: '1 1 23%' }}>
                            <h4>Finalizadas</h4>
                            <ul>
                                {kanbanColumns.finalizadas.map((activity, index) => (
                                    <li key={index} style={{ marginBottom: '10px' }}>
                                        <strong>{activity.descripcion}</strong> - {activity.fecha_vencimiento}
                                        <div className="mt-2">
                                            <button className="btn btn-info" onClick={() => handleEditActivity(activity)}>Detalles</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="mt-4">
                        <button className="btn btn-primary" onClick={() => setShowEdiCreate(true)}>
                            Crear Actividad
                        </button>
                    </div>
                </>
            )}

            {showEdiCreate && <EdiCreate onClose={() => setShowEdiCreate(false)} setTitles={setTitles} />}
            {showEdiDetails && <EdiDetails activity={selectedActivity} onSave={updateActivity} onClose={() => setShowEdiDetails(false)} />}
        </div>
    );
};

export default EDI;