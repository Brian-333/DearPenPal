import { Routes, Route } from "react-router-dom";
import LandingPage from './components/LandingPage'
import ManagerPage from './components/ManagerPage'
import { UserContext } from "./components/UserContext";
import InboxPage from './components/InboxPage'
import SendPage from './components/SendPage'
import './App.css';
import useToken from "./components/useToken";
import { useState } from "react";
import  { Navigate } from 'react-router-dom'

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
        <Route path="/Home" element={ <LandingPage/> }></Route>
        <Route path="/Manager" element={ <ManagerPage/> }></Route>
        <Route path= "/Inbox" element={<InboxPage/>}></Route>
        <Route path= "/Send" element={<SendPage/>}></Route>
      </Routes>
    }
    </UserContext.Provider>
  );
}

export default App;
