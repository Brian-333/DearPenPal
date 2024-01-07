const PersonLogin = ({setCurrForm}) => {
    return (
        <div>
            <div>
                <button type="button" onClick={() => setCurrForm("None")}>Back</button>
            </div>
            <div>
            <div>
                <label for = "username">Username:</label><br></br>
                <input type = "text" id = "username" name = "Username"></input><br></br>
                <label for = "password">Password:</label><br></br>
                <input type = "text" id = "password" name = "password"></input><br></br>
                <button type = "submit">Submit</button>
            </div>
            </div>
        </div>
    )
}

export { PersonLogin }