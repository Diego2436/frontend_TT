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
            const response = await axios.post('https://irontigersmart.com:444/api/authentication/iniciar-sesion/', {
                email,
                password,
            });


            console.log('data:', response.data);
            localStorage.setItem('token', response.data.access_token);

            navigate('/menu-operaciones');

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
                <h3 className="text-center mt-4 mb-4">Registrar</h3>
    
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
                    <div className="form-group mb-3">
                        <label htmlFor="email">Username / Nickname</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="email">Nombre completo</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Registrar
                    </button>
                </form>
                {error && <p>{error}</p>}
            </div>
        </div>
    );    
};

export default Login;