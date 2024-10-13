import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CardMenus from "../../Components/CardMenus/Index";


const Main = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="container col-12 col-sm-12 col-md-12 col-lg-12 col-xl-8 mt-3 mb-3">

                <div className="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-3">
                    <div className="col">
                        <CardMenus
                            href="/edd"
                            icon="assignment"
                            title="Beca para el Estímulo al Desempeño Docente (EDD)"
                        />
                    </div>
                    <div className="col">
                        <CardMenus
                            href="/edi"
                            icon="science"
                            title="Beca para el Estímulo al Desempeño de los Investigadores (EDI)"
                        />
                    </div>
                </div>
            </div>
        </>
    ); 
};

export default Main;