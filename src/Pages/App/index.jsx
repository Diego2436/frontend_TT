import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../../App.css'

import Navbar from '../../Components/Navbar';

import Landing from '../Landing/index';
import Login from '../Login/index';
import Signup from '../Signup/index';
import Main from '../Main/index';
import EDD from '../Main/edd';
import EDI from '../Main/edi';
import Profile from '../Main/profile';
import Archives from '../Main/archives'
import Documentation from '../Main/documentation';
import ArchivesActivities from '../Main/archivesActivities'


const App = () => {

    const showNavbar = location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/signup';

    return (
        <>
        <BrowserRouter>
            {showNavbar && <Navbar />}
            <Routes>
                <Route path="/" element={<Landing />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route path="/main" element={<Main />}></Route>
                <Route path="/edd" element={<EDD />}></Route>
                <Route path="/edi" element={<EDI />}></Route>
                <Route path="/perfil" element={<Profile />}></Route>
                <Route path="/archivos" element={<Archives />}></Route>
                <Route path="/documentacion" element={<Documentation />}></Route>

                <Route path="/archivosActividades/:taskID" element={<ArchivesActivities />}></Route>
            </Routes>
        </BrowserRouter>
        </>
    )
}

export default App
