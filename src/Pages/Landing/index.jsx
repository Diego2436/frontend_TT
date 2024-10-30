import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ocrImage from '../../Images/OCR.jpg';
import moduleImage from '../../Images/DiagramaBloquesModulo.png'
import sistemImage from '../../Images/DiagramaBloquesSistema.png'

const Landing = () => {

    const navigate = useNavigate();

    const ocrInfo = [
        "“Optical Character Recognition” o en resumen, OCR, es una herramienta que permite digitalizar textos.",
        "Esta herramienta es capaz de identificar imágenes, símbolos o caracteres en diferentes idiomas y digitalizarlos de forma rápida y eficiente. Por ejemplo, si quieres pasar a una versión digital y editable un póster o cualquier documento que contenga texto e imágenes, el OCR es lo que necesitas.",
        "El OCR a veces se denomina reconocimiento de texto. Un programa de OCR extrae y reutiliza datos de documentos escaneados, imágenes de cámara y archivos PDF de solo imagen. El software OCR selecciona las letras de la imagen, las pone en palabras y luego las convierte en oraciones, lo que permite el acceso y la edición del contenido original. También elimina el esfuerzo desperdiciado de la entrada manual de datos redundante.",
        "Los sistemas OCR utilizan una combinación de hardware y software para convertir documentos físicos impresos en texto legible por máquina. El hardware, como un escáner óptico o una placa de circuito especializada, copia o lee texto, luego el software generalmente maneja el procesamiento avanzado."
    ];

    const sisInfo = [
        "El sistema funcionara con API hecha en django para las peticiones, contaremos con la seguridad de proteger el sistema de ataques exteriores, asi como los datos del usuario."
    ];

    const modInfo = [
        "El modulo para la deteccion de errores consta de primero escanear el PDF con el OCR para posteriormente acceder al texto del mismo PDF.",
        "Posteriormente se analizara y con los datos del usuario se compararan cadenas de texto con procesamiento del lenguaje natural especificamente expresiones regulares.",
        "Con esto ofreceremos retoralimentacion en tiempo real ademas de ofecer este modulo de deteccion automatizado ofreceremos al usuario la capacidad de realizar su propia verificacion."
    ];


    return (
        <>
            <div className="container">
                <h1 className="text-center">Descripción del sistema</h1>
            </div>
            <main className="container-fluid vh-100 d-flex flex-wrap">
                <div className="col-6 col-md-8 d-flex flex-column justify-content-center align-items-center text-white text-center">
                    <h2 className="text-primary text-center">¿Qué es OCR?</h2>
                    {ocrInfo.map((paragraph, index) => (
                            <p key={index} className="text-black">{paragraph}</p>
                        ))}
                </div>

                <div className="col-2 col-md-4 d-flex justify-content-center align-items-center text-white">
                    <img src={ocrImage} alt="Descripción de la imagen" className="img-fluid" loading="lazy" style={{ maxWidth: '80%', height: 'auto' }} />
                </div>

                <div className="col-4 col-md-6 d-flex justify-content-center align-items-center text-white">
                    <img src={moduleImage} alt="Descripción de la imagen" className="img-fluid" loading="lazy" style={{ maxWidth: '80%', height: 'auto' }} />
                </div>

                <div className="col-4 col-md-6 d-flex flex-column justify-content-center align-items-center text-white text-center">
                    <h2 className="text-primary text-center">¿Como funciona nuestro modulo de deteccion de errores?</h2>
                    {modInfo.map((paragraph, index) => (
                            <p key={index} className="text-black">{paragraph}</p>
                        ))}
                </div>

                <div className="col-4 col-md-6 d-flex flex-column justify-content-center align-items-center text-dark text-center">
                    <h2 className="text-primary text-center">¿Como funciona el sistema?</h2>
                    {sisInfo.map((paragraph, index) => (
                            <p key={index} className="text-black">{paragraph}</p>
                        ))}
                </div>

                <div className="col-4 col-md-6 d-flex justify-content-center align-items-center text-white">
                    <img src={sistemImage} alt="Descripción de la imagen" className="img-fluid" loading="lazy" style={{ maxWidth: '80%', height: 'auto' }} />
                </div>
            </main>
        </>
    );
};

export default Landing;
