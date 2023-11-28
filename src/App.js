import './App.css';
import StartingForm from './Components/StartingForm';
import FormFail from './Components/FormFail'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import React, {useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartingForm/>} />
        <Route path="/fail" element={<FormFail/>} />
      </Routes>
    </Router>
  );
}

export default App;
