import { useContext, useState } from 'react';
import { LogMeOut, SendLetter } from '../api';
import '../styles/Inbox.css'
import { UserContext } from './UserContext';
import { Link } from "react-router-dom";

const SendPage = () => {
    const {access_token: [token, removeToken, ]} = useContext(UserContext)
    const [content, setContent] = useState("")
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)

    function onLogOut()
    {
        LogMeOut({token, removeToken})
    }

    function onSend()
    {
        SendLetter({token, content}).then((msg) => {
            if(msg === null) {
                setContent("")
                setError(null)
                setMessage("You successfully sent your letter")
            }
            else {
                setError(msg)
                setMessage(null)
            }
        })
        
    }

    return (
        <div class = 'inboxbg'>
            <button class = 'logoutbutton' onClick={onLogOut}>Logout</button>
            
            <Link to='/Inbox'><button class = 'readlettersbutton' type="button">Read Your Letters</button></Link>
            <div class = 'sidebyside'>
                <div>
                    <textarea rows = '80' cols = '5' class = 'sendletter' value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                </div>
                <div class = 'sendbutton'>
                    <button class = 'inboxbbutton' onClick={onSend}>Send</button>
                </div>
                <div>
                    {message === null ? null : <p>{message}</p>}
                    {error === null ? null : <p>{error}</p>}
                </div>
            </div>
        </div>
    );
} 

export default SendPage