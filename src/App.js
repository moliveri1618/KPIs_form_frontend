import './App.css';
import StartingForm from './Components/StartingForm';
import FormSuccess from './Components/FormSuccess'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import React, {useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/home" element={<StartingForm/>} />
        <Route path="/success" element={<FormSuccess/>} />
        <Route index element={<StartingForm />} /> {/* Index route for the default starting page */}
      </Routes>
    </Router>
  );
}

export default App;
