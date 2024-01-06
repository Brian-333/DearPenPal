import { useState } from "react";
import ManagerLogin from "./ManagerLogin";
import PersonLogin from "./PersonLogin";
import ManagerSignup from "./ManagerSignup";

const LandingPage = () =>{
    const [currForm, setCurrForm] = useState("None");

    const renderForm = () => {
        if(currForm === "None"){
            return (<div>
                        <div>
                            <button type="button" onClick={() => setCurrForm("PLgn")}>Login</button>
                            <button type="button" onClick={() => setCurrForm("MLgn")}>Manager Login</button>
                        </div>
                        <div>
                            <button type="button" onClick={() => setCurrForm("MSgp")}>Manager Signup</button>
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