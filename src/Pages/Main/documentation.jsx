import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Folder from '../../Components/Folder/Folder';
import axios from 'axios';

const Documentation = () => {
    const [folders, setFolders] = useState([]);

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
                    name: `Task ID: ${task.task_id}`,
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

    return (
        <div className="container mt-5">
            <h1>My Activities</h1>
            {folders.length > 0 ? (
                folders.map((folder, index) => (
                    <Folder key={index} name={folder.name} files={folder.files} taskId={folder.taskId} />
                ))
            ) : (
                <p>No hay actividades</p>
            )}
        </div>
    );
};

export default Documentation;
