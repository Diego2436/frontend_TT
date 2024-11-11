import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import Calendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './MyCalendar.css';
import EddCreate from './eddCreate'; 

const EDD = () => {

    const navigate = useNavigate();

    const [selectedOption, setSelectedOption] = useState('kanban');
    const [titles, setTitles] = useState([]); 
    const [date, setDate] = useState(new Date()); 
    const [showEddCreate, setShowEddCreate] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [showEddDetails, setShowEddDetails] = useState(false);
    const [selectedTitle, setSelectedTitle] = useState("");

    // Recuperar las actividades cuando se monta el componente
    useEffect(() => {
        fetch("http://localhost:8000/api/user/tasks/edd", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(data => {
            setTitles(data); // Actualizamos el estado con las actividades
        })
        .catch(error => console.error("Error al cargar las actividades:", error));
    }, []);
    

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const handleEditActivity = (activity) => {
        navigate(`/eddDetails/${activity.id}`);
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
                case 'precaución':
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
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`; 
    };

    const handleEditActivityFromCalendar = (date) => {
        const formattedDate = formatDate(date);
        const activityToEdit = titles.find(title => title.fecha_vencimiento === formattedDate);
        if (activityToEdit) {
            navigate(`/eddDetails/${activityToEdit.id}`);
        }
    };

    const updateActivity = (updatedActivity) => {
        setTitles((prevTitles) => {
            return prevTitles.map((activity) =>
                activity.fecha_vencimiento === selectedActivity.fecha_vencimiento ? updatedActivity : activity
            );
        });
        setShowEddDetails(false); // Cerrar el modal de edición después de actualizar
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
            .filter(activity => activity.estado === 'precaución')
            .sort((a, b) => new Date(convertToSortableDate(a.fecha_vencimiento)) - new Date(convertToSortableDate(b.fecha_vencimiento))),
        finalizadas: titles
            .filter(activity => activity.estado === 'completada')
            .sort((a, b) => new Date(convertToSortableDate(a.fecha_vencimiento)) - new Date(convertToSortableDate(b.fecha_vencimiento)))
    };

    return (
        <div className="container mt-5 text-center">
            <h1>Actividades EDD</h1>
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
                        <button className="btn btn-primary" onClick={() => setShowEddCreate(true)}>
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
                        <button className="btn btn-primary" onClick={() => setShowEddCreate(true)}>
                            Crear Actividad
                        </button>
                    </div>
                </>
            )}

            {showEddCreate && <EddCreate onClose={() => setShowEddCreate(false)} setTitles={setTitles} />}
            {showEddDetails && <EddDetails activity={selectedActivity} onSave={updateActivity} onClose={() => setShowEddDetails(false)} />}
        </div>
    );
};

export default EDD;