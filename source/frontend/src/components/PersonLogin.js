import { useContext, useState } from 'react'
import '../styles/login.css'
import { LogMeIn } from '../api'
import { UserContext } from './UserContext'

const PersonLogin = ({setCurrForm}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const {access_token:[,,setToken],
        user: [,,,setUsertype]} = useContext(UserContext)

    function onSubmit()
    {
        LogMeIn({username, password, setToken, type:"p", setUsertype, setError})
    }

    return (
        <div class = 'loginbg'>
            <div class = 'backbuttonpad'>
                <button type="button" class = 'buttoncolour' onClick={() => setCurrForm("None")}>Back</button>
            </div>

            <div class= 'title'>
                <label>Login</label><br></br>
            </div>

            <div class="inputtext">
                <div>
                    <label>Username:</label><br></br>
                    <input type = "text" class = 'inputboxsize' id = "username" name = "Username" value={username} onChange={(e) => setUsername(e.target.value)}></input><br></br>
                    <label>Password:</label><br></br>
                    <input type = "password" class = 'inputboxsize' id = "password" name = "password" value={password} onChange={(e) => setPassword(e.target.value)}></input><br></br>
                </div>
                {error == null ? null : 
                <div className='error'>
                    <p>{error}</p>
                </div>
                }
                <div class = 'submitbuttonpad'>
                    <button class = 'buttoncolour' type = "submit" onClick={onSubmit}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export { PersonLogin }