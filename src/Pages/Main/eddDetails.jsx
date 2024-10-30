import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MyCalendar.css'; // Importar estilos personalizados

const EddDetails = ({ onClose, selectedActivity, updateActivity }) => {
    const [date, setDate] = useState(new Date(selectedActivity.date));
    const [newTitle, setNewTitle] = useState(selectedActivity.title);

    const onManualDateChange = (e) => {
        const newDate = new Date(e.target.value + 'T00:00:00');
        setDate(newDate);
    };

    const saveChanges = () => {
        updateActivity({ date: date.toDateString(), title: newTitle });
        onClose(); // Cierra el modal o panel después de guardar los cambios
    };

    return (
        <div className="container mt-5 text-center" style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <h2>Editar Actividad</h2>

            <h4 className="mt-4">Selecciona una nueva fecha:</h4>
            <input
                type="date"
                value={date.toISOString().split('T')[0]}
                onChange={onManualDateChange}
                className="form-control mt-3"
            />

            <h4 className="mt-4">Selecciona un nuevo título:</h4>
            <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="form-control mt-3"
            />

            <button onClick={saveChanges} className="btn btn-primary mt-2">Guardar Cambios</button>

            <div><button className="btn btn-secondary mt-4" onClick={onClose}>Cerrar</button></div>
        </div>
    );
};

export default EddDetails;