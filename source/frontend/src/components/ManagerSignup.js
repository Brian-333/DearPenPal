import { SignMeUp } from '../api'
import { useState } from 'react'

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
    <div>
        <div>
            <button type="button" onClick={() => setCurrForm("None")}>Back</button>
        </div>
        <div>
        <form onSubmit={onSubmit}>
            <label>Username:</label><br></br>
            <input type = "text" id = "username" name = "Username" value={username} onChange={(e) => setUsername(e.target.value)}></input><br></br>
            <label>Password:</label><br></br>
            <input type = "text" id = "password" name = "password" value={password} onChange={(e) => setPassword(e.target.value)}></input><br></br>
            <label>Full Name:</label><br></br>
            <input type = "text" id = "name" name = "name" value={fullName} onChange={(e) => setFullName(e.target.value)}></input><br></br>
            <label>Email:</label><br></br>
            <input type = "text" id = "email" name = "email" value={email} onChange={(e) => setEmail(e.target.value)}></input><br></br>
            <input type = "submit"></input>
        </form>
        </div>
    </div>)
}

export { ManagerSignup };