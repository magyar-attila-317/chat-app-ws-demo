import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8080';

ReactDOM.render(<App/>, document.getElementById('root'));

