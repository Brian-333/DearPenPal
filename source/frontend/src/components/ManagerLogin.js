const ManagerLogin = () => {
    return (
        <div>
        <form>
            <label for = "username">Username:</label><br></br>
            <input type = "text" id = "username" name = "Username"></input><br></br>
            <label for = "password">Password:</label><br></br>
            <input type = "text" id = "password" name = "password"></input><br></br>
            <input type = "submit"></input>
        </form>
        </div>
    )
}

export default ManagerLogin