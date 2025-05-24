import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import TaskPage from './components/TaskPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tasks" element={<ProtectedRoute><TaskPage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

