import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

function EdiCreate({ onClose, setTitles }) {
    const token = localStorage.getItem("token");
    const [activityOptions, setActivityOptions] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [filteredOptions, setFilteredOptions] = useState(activityOptions);

    const [actividad, setActividad] = useState({
        actividad_id: "",
        descripcion: "",
        fecha_vencimiento: "",
        puntos: ""
    });
    
    useEffect(() => {
        const fetchActivityOptions = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/beca/list_beca/edi", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const activities = response.data.Actividades || [];
                setActivityOptions(activities);
                setFilteredOptions(activities);  // Inicializamos opciones filtradas
            } catch (error) {
                console.error("Error al cargar la lista de actividades:", error);
            }
        };
        fetchActivityOptions();
    }, [token]);

    const handleFilterChange = (e) => {
        const value = e.target.value;
        setFilterText(value);

        // Filtra las opciones de actividad en base al código ingresado
        const newFilteredOptions = activityOptions.filter((option) =>
            option.Codigo.toLowerCase().startsWith(value.toLowerCase())
        );
        setFilteredOptions(newFilteredOptions);
    };

    const handleOptionChange = (selectedOption) => {
        setActividad({
            ...actividad,
            actividad_id: selectedOption.value,
        });
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setActividad({
            ...actividad,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            console.error("No se ha encontrado un token de autenticación.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/api/user/activities/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    actividad_id: parseInt(actividad.actividad_id),
                    descripcion: actividad.descripcion,
                    fecha_vencimiento: actividad.fecha_vencimiento,
                    puntos: parseInt(actividad.puntos)
                })
            });

            if (!response.ok) {
                throw new Error("Error en la solicitud");
            }
            
            const data = await response.json();
            setTitles(prevTitles => [...prevTitles, data]);
            onClose();
        } catch (error) {
            console.error("Error al crear la actividad:", error);
        }
    };

        // Calcular los límites de fechas mínimas y máximas
    const getDateLimits = () => {
        const currentDate = new Date();
        const minDate = new Date(currentDate);
        minDate.setFullYear(minDate.getFullYear() - 6);
        const maxDate = new Date(currentDate);
        maxDate.setFullYear(maxDate.getFullYear() + 2);

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

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4 text-primary">Crear Actividad</h1>
            <form onSubmit={handleSubmit} className="border p-4 rounded shadow-lg mx-auto" style={{ maxWidth: '500px', backgroundColor: '#f8f9fa' }}>
                
                <div className="row gy-3 mt-4">
                    {/* Filtro de Actividades por Código y Selección de Actividad en la misma fila */}
                    <div className="col-md-6">
                        <label htmlFor="filter" className="form-label text-secondary">Filtrar por Código:</label>
                        <input
                            type="text"
                            id="filter"
                            value={filterText}
                            onChange={handleFilterChange}
                            className="form-control"
                            placeholder="Escribe el código"
                        />
                    </div>
    
                    {/* Menú de selección con React-Select */}
                    <div className="col-md-12">
                        <label htmlFor="actividad" className="form-label text-secondary">Actividad:</label>
                        <Select
                            options={filteredOptions.map((option) => ({
                                value: option.ID,
                                label: `${option.Codigo} - ${option.Nombre}`,
                            }))}
                            onChange={handleOptionChange}
                            placeholder="Seleccione una actividad"
                            styles={{
                                menu: (provided) => ({ ...provided, zIndex: 999 }), // Asegura que el menú no se corte
                                option: (provided) => ({
                                    ...provided,
                                    whiteSpace: "normal",
                                    wordBreak: "break-word",
                                }),
                            }}
                        />
                    </div>
                </div>
    
                {/* Descripción */}
                <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label text-secondary">Descripción:</label>
                    <input
                        type="text"
                        id="descripcion"
                        name="descripcion"
                        value={actividad.descripcion}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
    
                {/* Fecha de vencimiento */}
                <div className="mb-3">
                    <label htmlFor="fecha_vencimiento" className="form-label text-secondary">Fecha de Vencimiento:</label>
                    <input
                        type="date"
                        id="fecha_vencimiento"
                        name="fecha_vencimiento"
                        value={actividad.fecha_vencimiento}
                        onChange={handleChange}
                        className="form-control"
                        required
                        min={min}
                        max={max}
                    />
                </div>
    
                {/* Puntos */}
                <div className="mb-3">
                    <label htmlFor="puntos" className="form-label text-secondary">Puntos:</label>
                    <input
                        type="number"
                        id="puntos"
                        name="puntos"
                        value={actividad.puntos}
                        onChange={handleChange}
                        className="form-control"
                        required
                        min="0"
                    />
                </div>
    
                {/* Botón de envío */}
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-success">Crear Actividad</button>
                </div>
            </form>
        </div>
    );    
}

export default EdiCreate;