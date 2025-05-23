import './App.css';
import StartingForm from './Components/StartingForm';
import SignInSide from './Components/SignInSide';
import FormFail from './Components/FormFail'
import FormSuccess from './Components/FormSuccess'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
      <Router>
        <Routes>
          <Route path="" element={<SignInSide />} />
          <Route path="/KPIs_form_frontend/start" element={<StartingForm />} />
          <Route path="/KPIs_form_frontend/fail" element={<FormFail />} />
          <Route path="/KPIs_form_frontend/success" element={<FormSuccess />} />
        </Routes>
      </Router>
  );
}

export default App;
