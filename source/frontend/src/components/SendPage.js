import '../styles/Inbox.css'

const SendPage = () => {
    return (
        <div class = 'inboxbg'>
            <button class = 'inboxbbutton'>Back</button>
            <label class = 'waywtlabel'>Who are you writing to: </label>
            <select class = 'selectperson'>
                <option value = 'Kid1'>kid 1</option>
                <option value = 'kid2'>kid 2</option>
            </select>
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

