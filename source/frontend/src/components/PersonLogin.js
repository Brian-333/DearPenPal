import '../styles/login.css'
const PersonLogin = ({setCurrForm}) => {
    return (
        <div class = 'loginbg'>
            <div class = 'backbuttonpad'>
                <button type="button" class = 'buttoncolour' onClick={() => setCurrForm("None")}>Back</button>
            </div>

            <div class= 'title'>
                <label>Login</label><br></br>
            </div>

            <div>
            <form class = 'inputtext'>
                <label for = "username">Username:</label><br></br>
                <input type = "text" class = 'inputboxsize' id = "username" name = "Username"></input><br></br>
                <label for = "password">Password:</label><br></br>
                <input type = "text" class = 'inputboxsize' id = "password" name = "password"></input><br></br>
            </form>
            <div class = 'submitbuttonpad'>
                <input class = 'buttoncolour' type = "submit"></input>
            </div>
            </div>
        </div>
    )
}

export { PersonLogin }