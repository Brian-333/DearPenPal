import { useContext, useEffect, useState } from 'react';
import '../styles/Inbox.css'
import { FetchLetters } from '../api';
import { UserContext } from './UserContext';

const InboxPage = () => {
    const [sent, setSent] = useState([])
    const [received, setReceived] = useState([])
    const [receivedDisplayed, setReceivedDisplayed] = useState(true)
    const {access_token: [token,,]} = useContext(UserContext)

    useEffect(() => {
        FetchLetters({token, setSent, setReceived})
        console.log(sent)
        console.log(received)
    }, [])

    return(
        <div class = 'inboxbg'>
            <button class = 'inboxbbutton'>Back</button>
            <table class = 'tabletop'>
                <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Open</th>
                </tr>
            </table>
            <div class = 'sidebyside'>
                <div class = "inletter">
                <table>
                    <ReceivedLetter name = "John" date = '2024-01-06'></ReceivedLetter>
                    <SentLetter name = 'Rolanda' date = '2024-01-05'></SentLetter>
                </table>
                </div>
                <div class = 'letterviewer'>
                    <label class = 'letterviewertext'>Hello fasjkl;dsajkla;fjdskl dsajkld sjjhfhw eie wojiafweiojewf jefjwfjejfewa kfakdfkdsla jfdklasjkajheu iheawjkfadsl kjdsfkjhfasd</label>
                </div>
            </div>
        </div>
    );
}

const ReceivedLetter = (props) => {
    return (
        <tr>
            <td>from: {props.name}</td>
            <td>{props.date}</td>
            <td><button id = {props.name}>Open</button></td>
        </tr>
    );
}

const SentLetter = (props) => {
    return (
        <tr>
            <td>To: {props.name}</td>
            <td>{props.date}</td>
            <td><button id = {props.name}>Open</button></td>
        </tr>
    );
}

export default InboxPage