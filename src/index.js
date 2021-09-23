import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as atatus from 'atatus-spa';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
require('dotenv').config();
atatus.config(process.env.REACT_APP_ATATUS_KEY).install();


ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorkerRegistration.register();

reportWebVitals();

