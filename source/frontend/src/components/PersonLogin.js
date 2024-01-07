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

            <div class="inputtext">
            <div>
                <label for = "username">Username:</label><br></br>
                <input type = "text" class = 'inputboxsize' id = "username" name = "Username"></input><br></br>
                <label for = "password">Password:</label><br></br>
                <input type = "password" class = 'inputboxsize' id = "password" name = "password"></input><br></br>
            </div>
            <div class = 'submitbuttonpad'>
                <button class = 'buttoncolour' type = "submit"></button>
            </div>
            </div>
        </div>
    )
}

export { PersonLogin }