import '../styles/Inbox.css'

const SendPage = () => {
    return(
        <div class = 'inboxbg'>
            <button class = 'inboxbbutton'>Back</button>
            <div class = 'sidebyside'>
                <div class = "inletter">
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

export default SendPage