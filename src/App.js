import './App.css';
import StartingForm from './Components/StartingForm';
import FormFail from './Components/FormFail'
import FormSuccess from './Components/FormSuccess'
import HandleRedirect from './Components/HandleRedirect';
import React, {useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SPLoader from './Components/SpinnerLoader';

//link from sharepoint: http://localhost:3000/KPIs_form_frontend/asdfg1234
//homepage:             http://localhost:3000/KPIs_form_frontend

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/KPIs_form_frontend/asdfg1234" element={<HandleRedirect />} />
          <Route path="/KPIs_form_frontend" element={<StartingForm />} />
          <Route path="/KPIs_form_frontend/fail" element={<FormFail />} />
          <Route path="/KPIs_form_frontend/success" element={<FormSuccess />} />
        </Routes>
      </Router>
  );
}

export default App;
