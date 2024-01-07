import '../styles/Inbox.css'

const SendPage = () => {
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
                    <Letter name = "John" date = '2024-01-06' ></Letter>
                    <Letter name = "John" date = '2024-01-06' ></Letter>
                    <Letter name = "John" date = '2024-01-06' ></Letter>
                    <Letter name = "John" date = '2024-01-06' ></Letter>
                    <Letter name = "John" date = '2024-01-06' ></Letter>
                    <Letter name = "John" date = '2024-01-06' ></Letter>
                    <Letter name = "John" date = '2024-01-06' ></Letter>
                    <Letter name = "John" date = '2024-01-06' ></Letter>
                    <Letter name = "John" date = '2024-01-06' ></Letter>
                    <Letter name = "John" date = '2024-01-06' ></Letter>
                </table>
                </div>
                <div class = 'letterviewer'>
                    <textarea rows = '80' cols ='50' class = 'sendletter'></textarea> 
                </div>
                <div class = 'Send Button'>
                <button class = 'inboxbbutton'>Send</button>
            </div>
            </div>
        </div>
    );
}

const Letter = (props) => {
    return (
        <tr>
            <td>To: {props.name}</td>
            <td>{props.date}</td>
            <td><button id = {props.name}>Open</button></td>
        </tr>
    );
} 

export default SendPage