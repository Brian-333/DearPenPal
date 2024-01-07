async function SignMeUp({username, password, email, name})
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
        "email": email,
        "name": name
    })
    }).then(async (response) => {
        console.log(response)
        const jsonResponse = await response.json()

        if(!response.ok){
            console.log("Error");
        }
    })
}

function LogMeIn({username, password, setToken, type})
{
    const url = type === "m" ? "/manager_login" : "/person_login"
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
            // throw new Error(jsonResponse.msg)
        }
        else {
            setToken(jsonResponse.access_token)
        }
    })
}

export {SignMeUp, LogMeIn};