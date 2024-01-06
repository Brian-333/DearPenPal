import { Routes, Route } from "react-router-dom";
import LandingPage from './components/LandingPage'
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <LandingPage/> }></Route>
    </Routes>
  );
}

export default App;
