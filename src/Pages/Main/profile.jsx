import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('token'); // Obtener el token guardado
            if (!token) {
                navigate('/'); // Redirigir si no hay token
                return;
            }

            try {
                const response = await axios.get('http://127.0.0.1:8000/api/authentication/profile_user/', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Agregar el token a los encabezados
                    },
                });
                setUserData(response.data); // Guardar los datos del usuario
            } catch (err) {
                if (err.response) {
                    setError(err.response.data.detail || 'Error al obtener el perfil.');
                } else {
                    setError('Ocurrió un error inesperado.');
                }
            }
        };

        fetchUserProfile(); // Llamar a la función para obtener los datos
    }, [navigate]);

    const handleRecoverPassword = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/'); // Redirigir si no hay token
            return;
        }

        try {
            await axios.post('http://127.0.0.1:8000/api/authentication/recover_password/', {
            }, {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            });

            handleLogout();
        } catch (err) {
            if (err.response) {
                setError(err.response.data.detail || 'Error al intentar recuperar la contraseña.');
            } else {
                setError('Ocurrió un error inesperado.');
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        navigate("/"); 
        window.location.reload(); 
    };

    if (error) {
        return <p>{error}</p>; // Mostrar mensaje de error si lo hay
    }

    if (!userData) {
        return <p>Cargando...</p>; // Mostrar carga mientras se obtienen los datos
    }

    return (
        <div className="container">
            <h1 className="text-center">Perfil</h1>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Información del Usuario</h5>
                    <p><strong>Nombre completo:</strong> {userData.full_name}</p>
                    <p><strong>Nombre de usuario:</strong> {userData.username}</p>
                    <p><strong>Correo electrónico:</strong> {userData.email}</p>
                    <p><strong>Último inicio de sesión:</strong> {new Date(userData.last_login_date).toLocaleString()}</p>
                    {/* Mostrar puntos por beca */}
                    <div style={{ marginTop: '20px' }} />
                    <h5 className="card-title">Puntos por Beca</h5>
                    {Object.keys(userData.beca_points).length > 0 ? (
                        <ul className="list-group">
                            {Object.entries(userData.beca_points).map(([beca, points]) => (
                                <li className="list-group-item" key={beca}>
                                    <strong>{beca}:</strong> {points} puntos
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No se encontraron puntos por beca.</p>
                    )}
                    
                    <div style={{ marginTop: '20px' }} /> {/* Espaciado adicional */}
                </div>
            </div>
            <div className="text-center mt-4">
                <button className="btn btn-danger" onClick={handleRecoverPassword}>
                    Recuperar Contraseña
                </button>
            </div>
        </div>
    );
};

export default Profile;
