import { Routes, Route } from "react-router-dom";
import LandingPage from './components/LandingPage'
import ManagerPage from './components/ManagerPage'
import ManagerLogin from './components/ManagerLogin'
import PersonLogin from './components/PersonLogin'
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <LandingPage/> }></Route>
      <Route path="/Manager" element={ <ManagerPage/> }></Route>
    </Routes>
  );
}

export default App;
