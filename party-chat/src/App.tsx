import React, {useEffect, useRef, useState} from 'react';
import './App.css';
// @ts-ignore
import SockJsClient from 'react-stomp';

interface Greeting {
    text: string
}

export const App = () => {

    const [messages, setMessages] = useState<Greeting[]>([]);

    let wsRef: any = useRef<any>(null);
    const [message, setMessage] = useState<string>('');
    const [user, setUser] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
    }, []);

    const handleMessage = (msg: any) => {
        console.log('Received message:', msg);
        setMessages((prevState: any[]) => [...prevState, msg]);
    };

    const sendMessage = () => {
        console.log('Sent message:', message);
        wsRef.sendMessage('/topics/all', `${user}: ${message}`);
    };

    return (
        <div>
            {!loggedIn &&
             <React.Fragment>
                 <input
                     onChange={e => setUser(e.target.value)}
                     value={user}
                     type="text"
                     placeholder={'Enter username'}
                 />
                 <button onClick={() => setLoggedIn(true)} disabled={!user}>Login</button>
             </React.Fragment>
            }
            {loggedIn &&
             <React.Fragment>
                 <SockJsClient
                     url='http://localhost:8080/ws'
                     topics={['/topics/all']}
                     onMessage={handleMessage}
                     ref={(client: any) => {
                         wsRef = client;
                     }}
                 />
                 <input
                     onChange={e => setMessage(e.target.value)}
                     value={message}
                     type="text"
                 />
                 <button onClick={sendMessage}>send</button>
             </React.Fragment>
            }
            {messages.map(m => <p>{m}</p>)}
        </div>
    );
};
;
