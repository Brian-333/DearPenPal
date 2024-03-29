import { SignMeUp } from '../api'
import { useContext, useState } from 'react'
import '../styles/login.css'
import { UserContext } from './UserContext'

const ManagerSignup = ({setCurrForm}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [fullName, setFullName] = useState("")
    const [type, setType] = useState("student")
    const [error, setError] = useState(null)
    const {access_token: [,,setToken],
        user: [,,,setUsertype]} = useContext(UserContext)

    async function onSubmit()
    {
        await SignMeUp({username, password, acc_type: type, email, name: fullName, setToken, setUsertype, setError});
    }

    return(
    <div class = 'loginbg'>
        <div class = 'backbuttonpad'>
            <button class = 'buttoncolour' type="button" onClick={() => setCurrForm("None")}>Back</button>
        </div>
        <div class = 'inputtext'>
            <div>
                <div class= 'mltitle'>
                    <label>Manager Signup </label><br></br>
                </div>
                <label>I am a:</label><br></br>
                <select name = 'Choose One...' id= 'choose' value={type} onChange={(e) => setType(e.target.value)}>
                    <option value = 'student'>Teacher</option>
                    <option value = 'senior'>Retirement Community Manager</option>
                </select><br></br>
                <label>Username:</label><br></br>
                <input type = "text" id = "username" name = "Username" value={username} onChange={(e) => setUsername(e.target.value)}></input><br></br>
                <label>Password:</label><br></br>
                <input type = "password" id = "password" name = "password" value={password} onChange={(e) => setPassword(e.target.value)}></input><br></br>
                <label>Full Name:</label><br></br>
                <input type = "text" id = "name" name = "name" value={fullName} onChange={(e) => setFullName(e.target.value)}></input><br></br>
                <label>Email:</label><br></br>
                <input type = "text" id = "email" name = "email" value={email} onChange={(e) => setEmail(e.target.value)}></input><br></br>
            
            </div>
            <div className='error'>
                <p>{error}</p>
            </div>
            <div>
                <button class = 'signupsubmit' type = "submit" onClick={onSubmit}>Submit</button>
            </div>
        </div>
    </div>)
}

export { ManagerSignup };