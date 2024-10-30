import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../../App.css'

import Navbar from '../../Components/Navbar';

import Landing from '../Landing/index';
import Login from '../Login/index';
import Signup from '../Signup/index';
import Main from '../Main/index';
import Profile from '../Main/profile';
import Archives from '../Main/archives'
import Documentation from '../Main/documentation';
import ArchivesActivities from '../Main/archivesActivities'

import EDD from '../Main/edd';
import EddDetails from '../Main/eddDetails';
import EddCreate from '../Main/eddCreate';


const App = () => {

    const showNavbar = window.location.pathname !== '/' && window.location.pathname !== '/signup';

    return (
        <>
        <BrowserRouter>
            {showNavbar && <Navbar />}
            <Routes>
                <Route path="/landing" element={<Landing />}></Route>
                <Route path="/" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route path="/main" element={<Main />}></Route>

                <Route path="/edd" element={<EDD/>}></Route>
                <Route path="/eddCreate/:taskID" element={<EddCreate/>}></Route>
                <Route path="/eddDetails/:taskID" element={<EddDetails/>}></Route>

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
