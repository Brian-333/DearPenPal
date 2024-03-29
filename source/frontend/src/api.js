async function SignMeUp({username, password, acc_type, email, name, setToken, setUsertype, setError})
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
            LogMeIn({username, password, setToken, type: "m", setUsertype, setError})
        }
    })
}

function LogMeIn({username, password, setToken, type, setUsertype, setError})
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
            setUsertype(type)
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

function GetAccType({token, setUsertype})
{
    fetch('get_acc_type', {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then(async (response) => {
        const jsonResponse = await response.json()
        if(response.ok){
            setUsertype(jsonResponse.type)
        }
        else{
            console.log("Error checking type")
        }
    })
}

function FetchLetters({token, setSent, setReceived})
{
    fetch("/get_letters", {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then(async (response) => {
        const jsonResponse = await response.json()
        console.log(jsonResponse)


        if(response.ok) {
            setSent(jsonResponse.sent)
            setReceived(jsonResponse.received)
        }
        else {
            console.log(jsonResponse.msg)
        }
    })
}

function FetchSubAccts({token, setSubAccts, setDisplayedSubAccts})
{
    console.log(token)
    fetch("/get_sub_accts", {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then(async (response) => {
        const jsonResponse = await response.json()
        console.log(jsonResponse)


        if(response.ok) {
            // console.log(jsonResponse.msg)
            const accts = jsonResponse.msg
            accts.reverse()
            setSubAccts(accts)
            setDisplayedSubAccts(accts)
        }
        else {
            console.log(jsonResponse.msg)
        }
    })
}

function AddSubAcct({token, username, password, name})
{
    return fetch("/add_sub_acct", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
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
            // setError(jsonResponse.msg)
            return jsonResponse.msg
        }
        else {
            return null
        }
    })
}

function SendLetter({token, content})
{
    return fetch('/send_letter', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            'content': content
        })
    }).then(async (response) => {
        const jsonResponse = await response.json()
        if(!response.ok) {
            return jsonResponse.msg
        }
        else {
            return null
        }
    })
}

export {SignMeUp, LogMeIn, LogMeOut, GetAccType, FetchLetters, FetchSubAccts, AddSubAcct, SendLetter};