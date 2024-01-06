import { useState } from "react";
import { ManagerLogin } from "./ManagerLogin";
import { PersonLogin } from "./PersonLogin";
import { ManagerSignup } from "./ManagerSignup";
import '../styles/landing.css'

const LandingPage = () =>{
    const [currForm, setCurrForm] = useState("None");

    const renderForm = () => {
        if(currForm === "None"){
            return (<div class='landingbg'>
                        <div class= 'placetitle'>
                            <label class = 'landingtitle'>Dear Pen Pal</label>
                        </div>
                        <div class = 'placelogin'>
                            <button class = 'loginbutton' type="button" onClick={() => setCurrForm("PLgn")}>Login</button>
                        </div>
                        <div class = 'placemanagerbtns'>
                            <button class = 'managerbtnleft' type="button" onClick={() => setCurrForm("MLgn")}>Manager Login</button>
                            <button class = 'managerbtnright' type="button" onClick={() => setCurrForm("MSgp")}>Manager Signup</button>
                        </div>
                    </div>)
        }
        else if(currForm === "MLgn"){
            return <ManagerLogin setCurrForm={setCurrForm}/>
        }
        else if(currForm === "PLgn"){
            return <PersonLogin setCurrForm={setCurrForm}/>
        }
        else if(currForm === "MSgp"){
            return <ManagerSignup setCurrForm={setCurrForm}/>
        }
        else{
            return null
        }
    }

    return(
        <>
            {renderForm()}
        </>
    )
}

export default LandingPage;