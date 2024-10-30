import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MyCalendar.css'; // Importar estilos personalizados
import EddCreate from './eddCreate';
import EddDetails from './eddDetails'; // Importar el nuevo componente

const EDD = () => {
    const navigate = useNavigate();
    
    const [selectedOption, setSelectedOption] = useState('kanban');
    const [titles, setTitles] = useState([]); // Estado para almacenar títulos
    const [date, setDate] = useState(new Date()); // Fecha seleccionada
    const [showEddCreate, setShowEddCreate] = useState(false); // Controlar la visibilidad de la pantalla eddCreate
    const [selectedActivity, setSelectedActivity] = useState(null); // Estado para la actividad seleccionada
    const [showEddDetails, setShowEddDetails] = useState(false); // Controlar la visibilidad de EddDetails
    const [selectedTitle, setSelectedTitle] = useState(""); // Estado para mostrar el título correspondiente a la fecha seleccionada

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const onDateChange = (newDate) => {
        setDate(newDate);
        const dateKey = newDate.toDateString();
        const titleEntry = titles.find(title => title.date === dateKey);
        setSelectedTitle(titleEntry ? titleEntry.title : ""); // Actualizar el título correspondiente
    };

    const tileContent = ({ date }) => {
        const dateKey = date.toDateString();
        const hasTitle = titles.some(title => title.date === dateKey);
        if (hasTitle) {
            return <div className="highlight-date"></div>; // Clase que cambiará el color
        }
    };

    const handleEditActivityFromCalendar = (date) => {
        const dateKey = date.toDateString();
        const activityToEdit = titles.find(title => title.date === dateKey);
        if (activityToEdit) {
            setSelectedActivity(activityToEdit);
            setShowEddDetails(true);
        }
    };

    const handleTitleUpdate = (newTitles) => {
        setTitles(newTitles); // Actualizar los títulos cuando cambien en eddCreate.jsx
    };

    const handleEditActivity = (activity) => {
        setSelectedActivity(activity);
        setShowEddDetails(true);
    };

    const updateActivity = (updatedActivity) => {
        setTitles((prevTitles) => {
            return prevTitles.map((activity) =>
                activity.date === selectedActivity.date ? updatedActivity : activity
            );
        });
        setShowEddDetails(false); // Cerrar el modal de edición después de actualizar
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
                            <h5>Título para {date.toDateString()}:</h5>
                            <p>{selectedTitle}</p>
                            <button 
                                className="btn btn-link" 
                                onClick={() => handleEditActivityFromCalendar(date)} 
                                style={{ marginLeft: '10px' }}
                            >
                                Editar
                            </button>
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
                        <div className="kanban-column" style={{ flex: '1 1 23%', margin: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                            <h4>Actividades</h4>
                            <ul>
                                {titles.map((activity, index) => (
                                    <li key={index} style={{ cursor: 'pointer' }}>
                                        {activity.title} - {activity.date}
                                        <button 
                                            className="btn btn-link" 
                                            onClick={() => handleEditActivity(activity)} 
                                            style={{ marginLeft: '10px' }}
                                        >
                                            Editar
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="kanban-column" style={{ flex: '1 1 23%', margin: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                            <h4>Errores</h4>
                        </div>
                        <div className="kanban-column" style={{ flex: '1 1 23%', margin: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                            <h4>Correciones</h4>
                        </div>
                        <div className="kanban-column" style={{ flex: '1 1 23%', margin: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                            <h4>Completas</h4>
                        </div>
                    </div>
                    <div className="mt-4">
                        <button className="btn btn-primary" onClick={() => setShowEddCreate(true)}>
                            Crear Actividad
                        </button>
                    </div>
                </>
            )}
            {showEddCreate && (
                <div className="mt-4">
                    <EddCreate
                        onClose={() => setShowEddCreate(false)}
                        titles={titles}
                        setTitles={handleTitleUpdate}
                    />
                </div>
            )}
            {showEddDetails && selectedActivity && (
                <EddDetails
                    onClose={() => setShowEddDetails(false)}
                    selectedActivity={selectedActivity}
                    updateActivity={updateActivity}
                />
            )}
        </div>
    );
};

export default EDD;