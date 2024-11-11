import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RecoverPassword = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setError(null);

        // Verificar que las contraseñas coincidan
        if (newPassword !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/authentication/recover_password_login/', {
                email,
                new_password: newPassword,
                confirm_password: confirmPassword,
            });

            console.log('data:', response.data);

            // Navegar a la página de inicio de sesión o de éxito
            navigate('/');
        } catch (err) {
            if (err.response) {
                setError(err.response.data.error || 'Error al restablecer la contraseña.');
            } else {
                setError('Ocurrió un error inesperado.');
            }
        }
    };

    return (
        <div className="container-fluid vh-100 p-0 d-flex justify-content-center align-items-center">
            <div className="col-11 col-xl-3">
                <h3 className="text-center mt-4 mb-4">Recuperar contraseña</h3>

                <form onSubmit={handlePasswordReset}>
                    <div className="form-group mb-3">
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="newPassword">Nueva Contraseña</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="confirmPassword">Confirmar Nueva Contraseña</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="form-control"
                        />
                    </div>

                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="showPasswordCheckbox"
                            onChange={() => setShowPassword(!showPassword)}
                        />
                        <label className="form-check-label mb-3" htmlFor="showPasswordCheckbox">
                            Mostrar contraseña
                        </label>
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Restablecer contraseña
                    </button>
                </form>

                {error && <p className="text-danger mt-3">{error}</p>}
            </div>
        </div>
    );    
};

export default RecoverPassword;