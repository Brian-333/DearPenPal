import { useContext, useState } from 'react'
import '../styles/login.css'
import { LogMeIn } from '../api'
import { UserContext } from './UserContext'

const ManagerLogin = ({setCurrForm}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const {access_token: [,,setToken]} = useContext(UserContext)

    function onSubmit()
    {
        LogMeIn({username, password, setToken, type: 'm'})
    }

    return (
        <div class = 'loginbg'>
            <div class = 'backbuttonpad'>
                <button type="button" class='buttoncolour' onClick={() => setCurrForm("None")}>Back</button>
            </div>
            <div class= 'title'>
                <label>Manager Login</label><br></br>
            </div>
            <div class = 'inputtext'>
                <label for = "username">Username:</label><br></br>
                <input class ='inputboxsize' type = "text" id = "username" name = "username" value={username} onChange={(e) => setUsername(e.target.value)}></input><br></br>
                <label for = "password">Password:</label><br></br>
                <input class ='inputboxsize' type = "text" id = "password" name = "password" value={password} onChange={(e) => setPassword(e.target.value)}></input><br></br>
            </div>
            <div class = 'submitbuttonpad'>
                <button class = 'buttoncolour' type = "submit" onClick={onSubmit}>Submit</button>
            </div>
        </div>
    )
}

export { ManagerLogin }