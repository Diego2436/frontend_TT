import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import ocrImage from '../../Images/OCR.jpg';
import moduleImage from '../../Images/DiagramaBloquesModulo.png';
import sistemImage from '../../Images/DiagramaBloquesSistema.png';

import main from '../../Images/Main.png';
import mainOptions from '../../Images/MainOptions.png';
import tareaDetalles from '../../Images/TareaDetalles.png';
import verificacionArchivo from '../../Images/VerificacionArchivo.png';

const Landing = () => {
    const navigate = useNavigate();

    const ocrInfo = [
        "“Optical Character Recognition” o en resumen, OCR, es una herramienta que permite digitalizar textos.",
        "Esta herramienta es capaz de identificar imágenes, símbolos o caracteres en diferentes idiomas y digitalizarlos de forma rápida y eficiente. Por ejemplo, si quieres pasar a una versión digital y editable un póster o cualquier documento que contenga texto e imágenes, el OCR es lo que necesitas.",
        "El OCR a veces se denomina reconocimiento de texto. Un programa de OCR extrae y reutiliza datos de documentos escaneados, imágenes de cámara y archivos PDF de solo imagen. El software OCR selecciona las letras de la imagen, las pone en palabras y luego las convierte en oraciones, lo que permite el acceso y la edición del contenido original. También elimina el esfuerzo desperdiciado de la entrada manual de datos redundante.",
        "Los sistemas OCR utilizan una combinación de hardware y software para convertir documentos físicos impresos en texto legible por máquina. El hardware, como un escáner óptico o una placa de circuito especializada, copia o lee texto, luego el software generalmente maneja el procesamiento avanzado.",
    ];

    const sisInfo = [
        "El sistema funcionará con una API hecha en Django para las peticiones, contaremos con la seguridad de proteger el sistema de ataques exteriores, así como los datos del usuario.",
    ];

    const modInfo = [
        "El módulo para la detección de errores consta de primero escanear el PDF con el OCR para posteriormente acceder al texto del mismo PDF.",
        "Posteriormente se analizará y con los datos del usuario se compararán cadenas de texto con procesamiento del lenguaje natural, específicamente expresiones regulares.",
        "Con esto ofreceremos retroalimentación en tiempo real. Además de ofrecer este módulo de detección automatizado, ofreceremos al usuario la capacidad de realizar su propia verificación.",
    ];

    return (
        <>
            {/* Título de la sección */}
            <div className="container">
                <h1 className="text-center">Descripción del sistema</h1>
            </div>
    
            {/* Sección OCR */}
            <div className="container-fluid d-flex flex-wrap mb-5">
                <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center text-center">
                    <h2 className="text-primary">¿Qué es OCR?</h2>
                    {ocrInfo.map((paragraph, index) => (
                        <p key={index} className="text-black">{paragraph}</p>
                    ))}
                </div>
                <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
                    <img
                        src={ocrImage}
                        alt="OCR"
                        className="img-fluid"
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>
            </div>
    
            {/* Sección Módulo */}
            <div className="container-fluid d-flex flex-wrap mb-5">
                <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
                    <img
                        src={moduleImage}
                        alt="Módulo"
                        className="img-fluid"
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>
                <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center text-center">
                    <h2 className="text-primary">¿Cómo funciona nuestro módulo de detección de errores?</h2>
                    {modInfo.map((paragraph, index) => (
                        <p key={index} className="text-black">{paragraph}</p>
                    ))}
                </div>
            </div>
    
            {/* Sección Sistema */}
            <div className="container-fluid d-flex flex-wrap mb-5">
                <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center text-center">
                    <h2 className="text-primary">¿Cómo funciona el sistema?</h2>
                    {sisInfo.map((paragraph, index) => (
                        <p key={index} className="text-black">{paragraph}</p>
                    ))}
                </div>
                <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
                    <img
                        src={sistemImage}
                        alt="Sistema"
                        className="img-fluid"
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>
            </div>
    
            {/* Carrusel */}
            <div className="container my-5">
                <h2 className="text-center mb-4">Explora nuestro sistema</h2>
                <div id="featureCarousel" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={main} className="d-block w-100" alt="Tablero Inicial" />
                        </div>
                        <div className="carousel-item">
                            <img src={mainOptions} className="d-block w-100" alt="Calendario" />
                        </div>
                        <div className="carousel-item">
                            <img src={tareaDetalles} className="d-block w-100" alt="Menú" />
                        </div>
                        <div className="carousel-item">
                            <img src={verificacionArchivo} className="d-block w-100" alt="Tareas y Archivos" />
                        </div>
                    </div>
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#featureCarousel"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#featureCarousel"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Landing;