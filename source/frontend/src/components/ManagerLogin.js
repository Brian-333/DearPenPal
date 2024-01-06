import '../styles/login.css'
const ManagerLogin = () => {
    return (
        <div>
            <div>
                <button type="button" onClick={() => setCurrForm("None")}>Back</button>
            </div>
            <div>
            <form>
                <label for = "username">Username:</label><br></br>
                <input type = "text" id = "username" name = "Username"></input><br></br>
                <label for = "password">Password:</label><br></br>
                <input type = "text" id = "password" name = "password"></input><br></br>
                <input type = "submit"></input>
            </form>
            </div>
        </div>
    )
}

export default ManagerLogin