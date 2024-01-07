import { useContext, useEffect, useState } from 'react';
import '../styles/Inbox.css'
import { FetchLetters } from '../api';
import { UserContext } from './UserContext';
import { Link } from "react-router-dom";

const InboxPage = () => {
    const [sent, setSent] = useState([])
    const [received, setReceived] = useState([])
    const [receivedDisplayed, setReceivedDisplayed] = useState(true)
    const [selectedLetter, setSelectedLetter] = useState(null)
    const [letterText, setLetterText] = useState("Select a letter to view its content")
    const {access_token: [token,,]} = useContext(UserContext)

    useEffect(() => {
        FetchLetters({token, setSent, setReceived})
    }, [token])

    useEffect(() => {
        if(selectedLetter == null) {
            setLetterText("Select a letter to view its content")
        }
        else {
            const sentMatch = sent.filter((value) => value.id === selectedLetter)
            const receivedMatch = received.filter((value) => value.id === selectedLetter)

            if(sentMatch.length > 0){
                setLetterText(sentMatch[0].text)
            }
            else if(receivedMatch.length > 0) {
                setLetterText(receivedMatch[0].text)
            }
            else {
                setLetterText("Select a letter to view its content")
            }
        }
    }, [selectedLetter])

    function onDisplayChange() {
        setReceivedDisplayed(!receivedDisplayed)
    }

    return(
        <div class = 'inboxbg'>
            <Link to='/Send'><button class = 'readlettersbutton' type="button">Send a Letter</button></Link> <br/>
            {receivedDisplayed ? 
            <div>
                <button disabled="disabled">Received</button> 
                <button onClick={onDisplayChange}>Sent</button> 
            </div> :
            <div>
                <button onClick={onDisplayChange}>Received</button> 
                <button disabled="disabled">Sent</button> 
            </div>
            }      
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
                    {receivedDisplayed ?
                    received?.map((letter, i) => <ReceivedLetter className={selectedLetter === letter.id ? 'active-row' : ''} key={i} id={letter.id} name={letter.owner_name} date={letter.date} setSelectedLetter={setSelectedLetter}></ReceivedLetter>) :
                    sent?.map((letter, i) => <SentLetter className={selectedLetter === letter.id ? 'active-row' : ''} key={i} id={letter.id} name={letter.receiver_name} date={letter.date} setSelectedLetter={setSelectedLetter}></SentLetter>)}
                </table>
                </div>
                <div class = 'letterviewer'>
                    <p class = 'letterviewertext'>{letterText}</p>
                </div>
            </div>
        </div>
    );
}

const ReceivedLetter = ({className, id, name, date, setSelectedLetter}) => {
    return (
        <tr className={className}>
            <td>From: {name}</td>
            <td>{date}</td>
            <td><button id = {id} onClick={() => setSelectedLetter(id)}>Open</button></td>
        </tr>
    );
}

const SentLetter = ({className, id, name, date, setSelectedLetter}) => {
    return (
        <tr className={className}>
            <td>To: {name}</td>
            <td>{date}</td>
            <td><button id = {id} onClick={() => setSelectedLetter(id)}>Open</button></td>
        </tr>
    );
}

export default InboxPage