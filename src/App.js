import logo from './logo.svg';
import './App.css';
import Form from './Components/Form'
import BasicButtons from './Components/BasicButtons';
import AddressForm from './Components/AddressForm';
import CheckoutPage from './Components/Checkout';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BasicButtons/>} />
        <Route path="/about" element={<BasicButtons/>} />
      </Routes>
    </Router>
  );
}

export default App;
