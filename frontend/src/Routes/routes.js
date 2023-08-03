import React from 'react'
import Login from '../Pages/Login/index'
import ProtectedRoutes from './ProtectedRoutes';
import Register from '../Pages/Register';
import Home from '../Pages/Home';

import { BrowserRouter as  Router, Routes, Route } from 'react-router-dom';


const Routering = () => {
    return (
      <Router>
       <Routes>
       <Route path="*" element={<Login/>} />
       <Route path="/register" element={<Register/>}/>
       <Route path="/home" element={
        <ProtectedRoutes>
          <Home/>
        </ProtectedRoutes>
          }
        />
       </Routes>
      </Router>
    );
}

export default Routering;