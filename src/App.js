import './App.css';
import StartingForm from './Components/StartingForm';
import FormFail from './Components/FormFail'
import FormSuccess from './Components/FormSuccess'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import React, {useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';


function App() {

  return (
    <div className="App">
        {/* <Form /> */}
        <BasicButtons />
        {/* <Form /> */}
        {/* <AddressForm /> */}
        {/* <CheckoutPage /> */}
    </div>
  );
}

export default App;
