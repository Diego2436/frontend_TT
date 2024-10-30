import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MyCalendar.css'; // Importar estilos personalizados

const EddCreate = ({ onClose, titles, setTitles }) => {
    const [date, setDate] = useState(new Date());
    const [newTitle, setNewTitle] = useState("");
    const [selectedTitle, setSelectedTitle] = useState("");

    // Manejar cambio de fecha desde el input
    const onManualDateChange = (e) => {
        const newDate = new Date(e.target.value + 'T00:00:00');
        setDate(newDate);
        const dateKey = newDate.toDateString();
        const titleEntry = titles.find(title => title.date === dateKey);
        setSelectedTitle(titleEntry ? titleEntry.title : "");
    };

    // Manejar selección del título
    const onTitleChange = (e) => {
        setNewTitle(e.target.value);
    };

    // Agregar título a la fecha seleccionada
    const addTitle = () => {
        const dateKey = date.toDateString();
        setTitles((prevTitles) => {
            const existingTitleIndex = prevTitles.findIndex(title => title.date === dateKey);
            const updatedTitles = [...prevTitles];

            if (existingTitleIndex !== -1) {
                // Actualiza el título existente
                updatedTitles[existingTitleIndex].title = newTitle;
            } else {
                // Agrega un nuevo título
                updatedTitles.push({ date: dateKey, title: newTitle });
            }

            return updatedTitles;
        });
        setNewTitle("");
        onClose(); // Cierra el modal o panel después de agregar el título
    };

    return (
        <div className="container mt-5 text-center" style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <h2>Crear Actividad EDD</h2>

            <h4 className="mt-4">Selecciona una fecha:</h4>
            <input
                type="date"
                value={date.toISOString().split('T')[0]}
                onChange={onManualDateChange}
                className="form-control mt-3"
            />

            <h4 className="mt-4">Selecciona un título:</h4>
            <select
                value={newTitle}
                onChange={onTitleChange}
                className="form-control mt-3"
            >
                <option value="" disabled>Selecciona un título</option>
                {[
                    "Actividad I.1",
                    "Actividad I.2",
                    "Actividad I.3",
                    "Actividad I.4",
                    "Actividad I.5",
                    "Actividad I.6",
                    "Actividad II.1.1",
                    "Actividad II.1.2",
                    "Actividad II.1.3",
                    "Actividad II.2.1"
                ].map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>

            <button onClick={addTitle} className="btn btn-primary mt-2">Añadir Título</button>

            {selectedTitle && (
                <div className="mt-4">
                    <h5>Título para {date.toDateString()}:</h5>
                    <p>{selectedTitle}</p>
                </div>
            )}

            <div><button className="btn btn-secondary mt-4" onClick={onClose}>Cerrar</button></div>
        </div>
    );
};

export default EddCreate;