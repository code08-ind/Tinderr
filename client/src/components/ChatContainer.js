import ChatHeader from './ChatHeader';
import React, { useState } from 'react';
import ChatDisplay from './ChatDisplay';
import MatchesDisplay from './MatchesDisplay';

const ChatContainer = ({ user }) => {
    const [clikedUser, setClickedUser] = useState(null);
    return (
        <div className='chat-container'>
            <ChatHeader user={user} />
            <div>
                <button className='option' onClick={() => setClickedUser(null)}>Matches</button>
                <button className='option' disabled={!clikedUser}>Chat</button>
            </div>
            {!clikedUser &&
                <MatchesDisplay matches={user.matches} setClickedUser={setClickedUser} />
            }
            {clikedUser &&
                <ChatDisplay />}
        </div>
    );
}

export default ChatContainer;