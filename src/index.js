import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, } from 'react-router-dom'
import { ScreensRoot } from "./screens";;

ReactDOM.render(
    <BrowserRouter>
            <ScreensRoot />
    </BrowserRouter>,
    document.getElementById('root')
);