import { useContext } from 'react';
import { LogMeOut } from '../api';
import '../styles/Inbox.css'
import { UserContext } from './UserContext';
import { Link } from "react-router-dom";

const SendPage = () => {
    const {access_token: [token, removeToken, ]} = useContext(UserContext)

    function onLogOut()
    {
        LogMeOut({token, removeToken})
    }

    return (
        <div class = 'inboxbg'>
            <button class = 'logoutbutton' onClick={onLogOut}>Logout</button>
            
            <Link to='/Inbox'><button class = 'readlettersbutton' type="button">Read Your Letters</button></Link>
            <div class = 'sidebyside'>
                <div>
                    <textarea rows = '80' cols = '5' class = 'sendletter'></textarea>
                </div>
                <div class = 'sendbutton'>
                    <button class = 'inboxbbutton'>Send</button>
                </div>
            </div>
        </div>
    );
} 

export default SendPage