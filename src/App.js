import './App.css';
import StartingForm from './Components/StartingForm';
import FormSuccess from './Components/FormSuccess'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartingForm/>} />
        <Route path="/success" element={<FormSuccess/>} />
      </Routes>
    </Router>
  );
}

export default App;
