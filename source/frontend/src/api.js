async function SignMeUp({username, password, acc_type, email, name, setToken, setError})
{
    return await fetch("/manager_create", {
    method: "POST",
    headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "username": username,
        "password": password,
        "type": acc_type,
        "email": email,
        "name": name
    })
    }).then(async (response) => {
        console.log(response)
        const jsonResponse = await response.json()

        if(!response.ok){
            setError(jsonResponse.msg)
        }
        else {
            LogMeIn({username, password, setToken, type: "m", setError})
        }
    })
}

function LogMeIn({username, password, setToken, type, setError})
{
    const url = type === "m" ? "/manager_login" : "/sub_acct_login"
    console.log(url)
    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": username,
            "password": password
        })
    }).then(async (response) => {
        console.log(response)
        const jsonResponse = await response.json()
        if(!response.ok){
            console.log("Unsuccessfull login")
            setError(jsonResponse.msg)
            // throw new Error(jsonResponse.msg)
        }
        else {
            setError(null)
            setToken(jsonResponse.access_token)
        }
    })
}

function LogMeOut({token, removeToken})
{
    fetch("/logout", {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then((response) => {
        if(response.ok) {
            removeToken()
        }
        else{
            console.log("Error in logout")
        }
    })
}

function AddSubAcct({username, password, name, setError})
{
    fetch("/add_sub_acct", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": username,
            "password": password,
            "name": name,
        })
    }).then(async (response) => {
        console.log(response)
        const jsonResponse = await response.json()
        if(!response.ok){
            console.log("Unsuccessful Add Sub Acct")
            setError(jsonResponse.msg)
        }
        else {
            setError(null)
        }
    })
}

export {SignMeUp, LogMeIn, LogMeOut};