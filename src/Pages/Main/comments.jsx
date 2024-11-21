import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const Comments = () => {
    const [comments, setComments] = useState([]); 
    const [loading, setLoading] = useState(true);  
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [comment, setComment] = useState("");  

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/comments/obtener', { 
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setComments(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error("Error al cargar comentarios:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchComments();
    }, []);

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const saveComment = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:8000/api/comments/create',
                { comentario: comment },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                }
            );

            // Agrega el nuevo comentario al estado de comentarios
            setComments([...comments, response.data]);

            // Cierra el modal y limpia el campo de comentario
            setIsModalOpen(false);
            setComment("");
        } catch (error) {
            console.error("Error al guardar el comentario:", error);
            alert("Ocurrió un error al guardar el comentario.");
        }
    };

    if (loading) {
        return <p>Cargando comentarios...</p>;
    }

    return (
        <>
            <div className="container mt-4">
                <h2>Comentarios de los usuarios</h2>
                <table className="table table-bordered mt-3">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Comentario</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments.length > 0 ? (
                            comments.map((comment) => (
                                <tr key={comment.id}>
                                    <td>
                                        <strong>{comment.usuario}</strong>
                                        <div style={{ fontSize: "0.8rem", color: "#666" }}>
                                            {new Date(comment.created).toLocaleString()}
                                        </div>
                                    </td>
                                    <td>{comment.descripcion}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" className="text-center">No hay comentarios disponibles.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Botón para abrir el modal */}
            <div className="fixed-bottom mb-4 me-4 d-flex justify-content-end">
                <button 
                    className="btn btn-success me-2" 
                    onClick={() => setIsModalOpen(true)}
                >
                    <span className="material-symbols-outlined">add</span>
                </button>
            </div>

            {/* Modal */}
            <div className={`modal fade ${isModalOpen ? 'show' : ''}`} 
                style={{ display: isModalOpen ? 'block' : 'none' }} 
                tabIndex="-1" 
                aria-labelledby="modalLabel" 
                aria-hidden={!isModalOpen}
            >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalLabel">Agregar Comentario</h5>
                            <button 
                                type="button" 
                                className="btn-close" 
                                onClick={() => setIsModalOpen(false)} 
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="commentInput" className="form-label">Comentario</label>
                                <textarea
                                    className="form-control"
                                    id="commentInput"
                                    rows="2"
                                    value={comment}
                                    onChange={handleCommentChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="btn btn-secondary" 
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancelar
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-primary" 
                                onClick={saveComment}
                            >
                                Subir
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Comments;
