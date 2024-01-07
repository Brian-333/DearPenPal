import { Routes, Route } from "react-router-dom";
import LandingPage from './components/LandingPage'
import ManagerPage from './components/ManagerPage'
import InboxPage from './components/InboxPage'
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <LandingPage/> }></Route>
      <Route path="/Manager" element={ <ManagerPage/> }></Route>
      <Route path= "/Inbox" element={<InboxPage/>}></Route>
    </Routes>
  );
}

export default App;
