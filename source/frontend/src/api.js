async function SignMeUp({username, password, acc_type, email, name})
{
    console.log(username)
    console.log(password)
    console.log(acc_type)
    console.log(email)
    console.log(name)
    return await fetch("/manager_create", {
    method: "POST",
    headers:{
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
        const jsonResponse = await response.json()

        if(!response.ok){
            console.log("Error");
        }
    })
}

export {SignMeUp};