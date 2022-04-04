import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';

import Footer from './Components/Footer';
import Header from './Components/Header';
import Home from './Components/Home';
import User from './Components/User/User';
import Login from './Components/Login/Login';
import {UserStorage} from './UserContext'
import ProtectedRoute from './Components/Helper/ProtectedRoute';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <UserStorage>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login/*" element={<Login />} />
            <Route path="conta/*" element={<ProtectedRoute> <User/> </ProtectedRoute>} />
          </Routes>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </div>
  );
};

export default App;
