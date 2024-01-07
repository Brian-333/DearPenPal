import '../styles/Inbox.css'

const SendPage = () => {
    return (
        <div class = 'inboxbg'>
            <button class = 'inboxbbutton'>Back</button>
            <button class = 'logoutbutton'>Logout</button>
            <button class = 'readlettersbutton'>Read Your Letters</button>
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

