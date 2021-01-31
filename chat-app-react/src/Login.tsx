import React, {useState} from 'react';
import axios, {AxiosRequestConfig} from 'axios';
import {AccountDetailsModel} from './models/AccountDetails.model';

interface Props {
    loginCallback(userDetails: AccountDetailsModel): void
}

export const Login = (props: Props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const sendLogin = () => {
        let config: AxiosRequestConfig = {
            auth: {
                username,
                password,
            },
        };
        axios.get('/api/accounts/me', config)
             .then(r => {
                 console.log('Logged in! Userdetails:', r.data);
                 props.loginCallback(r.data);
             })
             .catch(console.warn);
    };

    return (
        <div className='container'>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input onChange={e => setUsername(e.target.value)} value={username} type="text"
                           className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input onChange={e => setPassword(e.target.value)} value={password} type="password"
                           className="form-control" id="exampleInputPassword1"/>
                </div>
                <button type="button" className="btn btn-primary" onClick={sendLogin}>Login</button>
            </form>
        </div>
    );

};
