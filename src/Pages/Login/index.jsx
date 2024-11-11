import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/authentication/login/', {
                email,
                password,
            });


            console.log('data:', response.data);
            localStorage.setItem('token', response.data.access_token);

            navigate('/main');
            window.location.reload();

        } catch (err) {
            if (err.response) {
                setError(err.response.data.detail || 'Inicio de sesión fallido. Verifica tus credenciales.');
            } else {
                setError('Ocurrió un error inesperado.');
            }
        }
    };

    return (
        <div className="container-fluid vh-100 p-0 d-flex justify-content-center align-items-center">
            <div className="col-11 col-xl-3">
                <h3 className="text-center mt-4 mb-4">Iniciar sesión</h3>
    
                <form onSubmit={handleLogin}>
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
                        Iniciar sesión
                    </button>
                </form>
                {error && <p>{error}</p>}

                <div className="text-center mt-4">
                    <p className="mb-1">¿No estás registrado?</p>
                    <button
                        className="btn btn-outline-primary btn-sm mb-3"
                        onClick={() => navigate('/signup')}
                        style={{ textDecoration: 'none', fontWeight: 'bold' }}
                    >
                        Ingresa aquí
                    </button>
                </div>

                <div className="text-center mt-4">
                    <p className="mb-1">¿Olvidaste tu contraseña?</p>
                    <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => navigate('/recoverPassword')}
                        style={{ textDecoration: 'none', fontWeight: 'bold' }}
                    >
                        Recuperar contraseña
                    </button>
                </div>
            </div>
        </div>
    );    
};

export default Login;