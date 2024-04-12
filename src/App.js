import './App.css';
import StartingForm from './Components/StartingForm';
import FormFail from './Components/FormFail'
import FormSuccess from './Components/FormSuccess'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//link from sharepoint: http://localhost:3000/KPIs_form_frontend/asdfg1234dfkljgh546hodfkljgh54458459dfklhklfgholedrghdlLHLSHFL
                        //http://127.0.0.1:8000/redirect/
//homepage:             http://localhost:3000/KPIs_form_frontend

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/KPIs_form_frontend" element={<StartingForm />} />
          <Route path="/KPIs_form_frontend/fail" element={<FormFail />} />
          <Route path="/KPIs_form_frontend/success" element={<FormSuccess />} />
        </Routes>
      </Router>
  );
}

export default App;
