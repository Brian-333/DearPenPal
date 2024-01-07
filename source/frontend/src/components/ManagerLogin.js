import '../styles/login.css'
const ManagerLogin = ({setCurrForm}) => {
    return (
        <div class = 'loginbg'>
            <div class = 'backbuttonpad'>
                <button type="button" class='buttoncolour' onClick={() => setCurrForm("None")}>Back</button>
            </div>
            <div class= 'title'>
                <label>Manager Login</label><br></br>
            </div>
            <div>
            <form class = 'inputtext'>
                <label>Username:</label><br></br>
                <input class ='inputboxsize' type = "text" id = "username" name = "Username"></input><br></br>
                <label>Password:</label><br></br>
                <input class ='inputboxsize' type = "password" id = "password" name = "password"></input><br></br>
            </form>
            <div class = 'submitbuttonpad'>
                <button class = 'buttoncolour' type = "submit">Submit</button>
            </div>
            </div>
        </div>
    )
}

export { ManagerLogin }