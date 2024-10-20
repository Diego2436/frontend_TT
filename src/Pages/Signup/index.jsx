import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/authentication/signin/', {
                username,
                email,
                password,
                full_name: fullName, // Cambiar el nombre del campo a full_name
            });

            console.log('data:', response.data);
            // Suponiendo que después de registrar, deseas redirigir a otra página
            navigate('/login'); // Cambia la ruta a donde quieras redirigir después de registrar
            window.location.reload();

        } catch (err) {
            if (err.response) {
                // Manejo de errores más específico
                setError(err.response.data.detail || 'Registro fallido. Verifica tus datos.');
            } else {
                setError('Ocurrió un error inesperado.');
            }
        }
    };

    return (
        <div className="container-fluid vh-100 p-0 d-flex justify-content-center align-items-center">
            <div className="col-11 col-xl-3">
                <h3 className="text-center mt-4 mb-4">Registrar</h3>

                <form onSubmit={handleRegister}>
                    <div className="form-group mb-3">
                        <label htmlFor="username">Username / Nickname</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="fullName">Nombre completo</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexCheckDefault"
                            onChange={() => setShowPassword(!showPassword)}
                        />
                        <label className="form-check-label mb-3" htmlFor="flexCheckDefault">
                            Mostrar contraseña
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Registrar
                    </button>
                </form>
                {error && <p className="text-danger">{error}</p>}
            </div>
        </div>
    );    
};

export default Register;
