import { Routes, Route } from "react-router-dom";
import LandingPage from './components/LandingPage'
import ManagerLogin from './components/ManagerLogin'
import PersonLogin from './components/PersonLogin'
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <ManagerLogin/> }></Route>
    </Routes>
  );
}

export default App;
