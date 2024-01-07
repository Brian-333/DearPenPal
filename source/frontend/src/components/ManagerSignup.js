import { SignMeUp } from '../api'
import { useState } from 'react'
import '../styles/login.css'

const ManagerSignup = ({setCurrForm}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [fullName, setFullName] = useState("")

    async function onSubmit()
    {
        await SignMeUp({username, password, email, name: fullName});
    }

    return(
    <div class = 'loginbg'>
        <div class = 'backbuttonpad'>
            <button class = 'buttoncolour' type="button" onClick={() => setCurrForm("None")}>Back</button>
        </div>
        <div class = 'inputtext'>
        <form onSubmit={onSubmit}>
            <label>I am a:</label><br></br>
            <select name = 'Choose One...' id= 'choose'>
                <option value = 'Teacher'>Teacher</option>
                <option value = 'Manager'>Retirement Community Manager</option>
            </select><br></br>
            <label>Username:</label><br></br>
            <input type = "text" id = "username" name = "Username" value={username} onChange={(e) => setUsername(e.target.value)}></input><br></br>
            <label>Password:</label><br></br>
            <input type = "password" id = "password" name = "password" value={password} onChange={(e) => setPassword(e.target.value)}></input><br></br>
            <label>Full Name:</label><br></br>
            <input type = "text" id = "name" name = "name" value={fullName} onChange={(e) => setFullName(e.target.value)}></input><br></br>
            <label>Email:</label><br></br>
            <input type = "text" id = "email" name = "email" value={email} onChange={(e) => setEmail(e.target.value)}></input><br></br>
            <input class = 'signupsubmit' type = "submit"></input>
        </form>
        </div>
    </div>)
}

export { ManagerSignup };