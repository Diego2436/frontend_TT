import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Verification = () => {
  const { fileID } = useParams();
  const [data, setData] = useState([]);
  const [verificationStatus, setVerificationStatus] = useState([]);
  const [fileInfo, setFileInfo] = useState({ file_status: '', verified_count: 0, total_verifications: 0 });

  // Obtener datos de verificación y estado del archivo
  useEffect(() => {
    fetchData();
  }, [fileID]);

  // Función para obtener datos de verificación y de información del archivo
  const fetchData = async () => {
    if (!fileID) {
      console.error("No fileID in the URL");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      // Obtener verificaciones del archivo
      const response = await axios.get(`http://127.0.0.1:8000/api/files/verificacion/${fileID}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);

      // Obtener información del archivo
      const fileInfoResponse = await axios.get(`http://127.0.0.1:8000/api/files/verificacion/${fileID}/info`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFileInfo(fileInfoResponse.data);
    } catch (error) {
      console.error("Error al obtener datos", error);
    }
  };

  const handleCheckboxChange = (id, isChecked) => {
    setVerificationStatus(prevStatus => {
      const updatedStatus = prevStatus.filter(item => item.id !== id);
      updatedStatus.push({ id, is_verified: isChecked });
      return updatedStatus;
    });
  };

  const handleVerificationSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://127.0.0.1:8000/api/files/verificacion/${fileID}/update`,
        { verifications: verificationStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Mostrar mensaje de éxito
      alert("Verificación actualizada correctamente");

      // Llamar a fetchData para actualizar los datos de la tabla y la información del archivo
      await fetchData();
    } catch (error) {
      console.error("Error al actualizar la verificación", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Columna de la tabla */}
        <div className="col-6">
          <h2>Verificación del archivo</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Verificado</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nombre}</td>
                    <td>{item.descripcion}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={verificationStatus.some((status) => status.id === item.id && status.is_verified)}
                        onChange={(e) => handleCheckboxChange(item.id, e.target.checked)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No hay datos disponibles</td>
                </tr>
              )}
            </tbody>
          </table>
          <button onClick={handleVerificationSubmit} className="btn btn-primary">
            Verificar
          </button>

          {/* Información del archivo debajo de la tabla */}
          <div className="mt-4">
            <h4>Información del archivo</h4>
            <ul className="list-group">
              <li className="list-group-item">
                <strong>Estado del archivo:</strong> {fileInfo.file_status}
              </li>
              <li className="list-group-item">
                <strong>Verificaciones realizadas:</strong> {fileInfo.verified_count} / {fileInfo.total_verifications}
              </li>
            </ul>
          </div>
        </div>

        {/* Columna reservada para el visor de PDF */}
        <div className="col-6">
          {/* Aquí se agregará el visor de PDF en el futuro */}
        </div>
      </div>
    </div>
  );
};

export default Verification;
