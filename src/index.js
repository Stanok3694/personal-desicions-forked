import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import { BrowserRouter, Route } from 'react-router-dom'
import { Workers, Worker, CreateWorker } from './components';

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route path="/" component={App} />
            <Route path="/workers" component={Workers} />
            <Route path="/createWorker" component={CreateWorker} />
            <Route path="/worker/:workerId" component={Worker} />
        </div>
    </BrowserRouter>,
    document.getElementById('root')
);
