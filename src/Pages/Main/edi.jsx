import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const EDI = () => {
    const navigate = useNavigate();

    // Estado para manejar el botón seleccionado, por defecto "kanban"
    const [selectedOption, setSelectedOption] = useState('kanban');

    // Función para manejar el clic en los botones
    const handleOptionClick = (option) => {
        setSelectedOption(option);
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
            {/* Opción seleccionada */}
            {selectedOption && <h4 className="mt-4">Opción seleccionada: {selectedOption}</h4>}
        </div>
    );
};

export default EDI;