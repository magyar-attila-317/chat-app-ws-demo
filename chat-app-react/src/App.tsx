import React, {useRef, useState} from 'react';
// @ts-ignore
import SockJsClient from 'react-stomp';
import {Login} from './Login';
import {AccountDetailsModel} from './models/AccountDetails.model';

interface Greeting {
    text: string
}

export const App = () => {

    const [messages, setMessages] = useState<Greeting[]>([]);
    const [privateMessages, setPrivateMessages] = useState<Greeting[]>([]);

    let wsRef: any = useRef<any>(null);
    const [message, setMessage] = useState<string>('');
    const [user, setUser] = useState<AccountDetailsModel | null>(null);

    const handleMessage = (msg: any) => {
        console.log('Received message:', JSON.stringify(msg));
        setMessages((prevState: any[]) => [...prevState, msg]);
    };

    const handlePrivateMessage = (msg: any) => {
        console.log('Received private message:', msg);
        setPrivateMessages((prevState: any[]) => [...prevState, msg]);
    };

    const sendMessage = () => {
        console.log('Sent message:', message);
        setMessage('');
        wsRef.sendMessage('/app/chat.send', `${user?.username}: ${message}`);
    };

    const sendPrivateMessage = () => {
        console.log('Sent private message:', message);
        setMessage('');
        wsRef.sendMessage('/app/private.send', `${user?.username}: ${message}`);
    };

    const loggedInHandler = (userDetails: any) => {
        setUser(userDetails);
    };

    return (
        <div>
            <React.Fragment>
                <Login
                    loginCallback={loggedInHandler}
                />
                <SockJsClient
                    url='http://localhost:8080/ws'
                    topics={['/topics/public', '/user/reply']}
                    onMessage={handleMessage}
                    ref={(client: any) => wsRef = client}
                />
                <div className='container'>
                    <input
                        onChange={e => setMessage(e.target.value)}
                        value={message}
                        type="text"
                    />
                    <button onClick={sendMessage}>send</button>
                </div>
                <button onClick={sendPrivateMessage}>send private message</button>

            </React.Fragment>
            {messages.map((m, index) => <p key={index}>{m}</p>)}
        </div>
    );

};
