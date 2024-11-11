import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Folder from '../../Components/Folder/Folder';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Archives = () => {
    const [folders, setFolders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await axios.get('http://127.0.0.1:8000/api/files/activities/all/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const tasksData = response.data.tasks;

                const formattedFolders = tasksData.map(task => ({
                    name: `${task.due_date} - ${task.actividad_beca.nombre_beca} - ${task.actividad_beca.nombre_actividad}`,
                    files: task.pdf.length > 0 ? task.pdf : [],
                    taskId: task.task_id 
                }));

                setFolders(formattedFolders);
            } catch (error) {
                console.error('Error fetching files:', error);
            }
        };

        fetchFiles();
    }, []);

    // Función para manejar el clic y redirigir a la página de la actividad
    const handleFolderClick = (taskId) => {
        navigate(`/archivosActividades/${taskId}`);
    };

    return (
        <div className="container mt-5">
            <h1>Mis actividades</h1>
            {folders.length > 0 ? (
                folders.map((folder, index) => (
                    <div
                        key={index}
                        onClick={() => handleFolderClick(folder.taskId)}
                        style={{ cursor: 'pointer' }}
                    >
                        <Folder name={folder.name} files={folder.files} taskId={folder.taskId} />
                    </div>
                ))
            ) : (
                <p>No hay actividades</p>
            )}
        </div>
    );
};

export default Archives;
