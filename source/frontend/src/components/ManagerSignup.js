const ManagerSignup = ({setCurrForm}) => {
    return(
    <div>
        <div>
            <button type="button" onClick={() => setCurrForm("None")}>Back</button>
        </div>
        <div>
        <form>
            <label>Username:</label><br></br>
            <input type = "text" id = "username" name = "Username"></input><br></br>
            <label>Password:</label><br></br>
            <input type = "text" id = "password" name = "password"></input><br></br>
            <label>Full Name:</label><br></br>
            <input type = "text" id = "name" name = "name"></input><br></br>
            <label>Email:</label><br></br>
            <input type = "text" id = "email" name = "email"></input><br></br>
            <button type = "submit"></button>
        </form>
        </div>
    </div>)
}

export default ManagerSignup;