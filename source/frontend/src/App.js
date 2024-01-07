import { Routes, Route } from "react-router-dom";
import LandingPage from './components/LandingPage'
import ManagerPage from './components/ManagerPage'
import { UserContext } from "./components/UserContext";
import './App.css';
import useToken from "./components/useToken";
import { useState } from "react";

function App() {
  const {token, removeToken, setToken} = useToken()
  const [username, setUsername] = useState("")
  const [usertype, setUsertype] = useState("")

  return (
    <UserContext.Provider value = {{access_token: [token, removeToken, setToken], user:[username, setUsername, usertype, setUsertype]}}>
      {token === "" || token == null 
      ? <LandingPage/> :
      <Routes>
        <Route path="/" element={ <LandingPage/> }></Route>
        <Route path="/Manager" element={ <ManagerPage/> }></Route>
      </Routes>
    }
    </UserContext.Provider>
  );
}

export default App;
