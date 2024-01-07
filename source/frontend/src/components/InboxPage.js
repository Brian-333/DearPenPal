import '../styles/Inbox.css'

const InboxPage = () => {
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
                    <Letter name = "John" date = '2024-01-06'></Letter>
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
                    <label class = 'letterviewertext'>Hello fasjkl;dsajkla;fjdskl dsajkld sjjhfhw eie wojiafweiojewf jefjwfjejfewa kfakdfkdsla jfdklasjkajheu iheawjkfadsl kjdsfkjhfasd</label>
                </div>
            </div>
        </div>
    );
}

const Letter = (props) => {
    return (
        <tr>
            <td>from: {props.name}</td>
            <td>{props.date}</td>
            <td><button id = {props.name}>Open</button></td>
        </tr>
    );
}
export default InboxPage