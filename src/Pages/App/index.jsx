import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../../App.css'

import Navbar from '../../Components/Navbar';

import Landing from '../Landing/index';
import Login from '../Login/index';
import Signup from '../Signup/index';
import RecoverPassword from '../Login/recoverPassword';
import Main from '../Main/index';
import Profile from '../Main/profile';
import Archives from '../Main/archives'
import Documentation from '../Main/documentation';
import ArchivesActivities from '../Main/archivesActivities'
import Comments from '../Main/comments';

import EDD from '../Main/edd';
import EDI from '../Main/edi'
import EddDetails from '../Main/eddDetails';
import EddCreate from '../Main/eddCreate';
import EdiDetails from '../Main/ediDetails';
import EdiCreate from '../Main/ediCreate';

import Verification from '../Main/verification';
import VerificationNLP from '../Main/verificationNLP';


const App = () => {

    const showNavbar = window.location.pathname !== '/' && window.location.pathname !== '/signup' && window.location.pathname !== '/recoverPassword';

    return (
        <>
        <BrowserRouter>
            {showNavbar && <Navbar />}
            <Routes>
                <Route path="/landing" element={<Landing />}></Route>
                <Route path="/" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route path="/main" element={<Main />}></Route>
                <Route path="/recoverPassword" element={<RecoverPassword />}></Route>

                <Route path="/edd" element={<EDD/>}></Route>
                <Route path="/edi" element={<EDI/>}></Route>
                <Route path="/eddCreate" element={<EddCreate/>}></Route>
                <Route path="/ediCreate" element={<EdiCreate/>}></Route>
                <Route path="/eddDetails/:taskID" element={<EddDetails/>}></Route>
                <Route path="/ediDetails/:taskID" element={<EdiDetails/>}></Route>

                <Route path="/perfil" element={<Profile />}></Route>
                <Route path="/archivos" element={<Archives />}></Route>
                <Route path="/documentacion" element={<Documentation />}></Route>
                <Route path="/comentarios" element={<Comments />}></Route>

                <Route path="/archivosActividades/:taskID" element={<ArchivesActivities />}></Route>

                <Route path='/verificacion/:fileID' element={<Verification/>}></Route>
                <Route path='/verificacionNLP' element={<VerificationNLP/>}></Route>
            </Routes>
        </BrowserRouter>
        </>
    )
}

export default App
