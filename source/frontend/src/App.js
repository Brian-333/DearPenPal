import { Routes, Route } from "react-router-dom";
import LandingPage from './components/LandingPage'
import ManagerPage from './components/ManagerPage'
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <LandingPage/> }></Route>
      <Route path="/manager" element={ <ManagerPage/> }></Route>
    </Routes>
  );
}

export default App;
