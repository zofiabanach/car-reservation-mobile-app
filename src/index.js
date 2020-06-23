import React from "react";
import { Container } from "@cerebral/react";
import ReactDOM from 'react-dom';
import './index.css';
import app from "./app";
import AppMain from './components/AppMain';
import * as serviceWorker from './serviceWorker';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import { Page } from 'react-onsenui';


ReactDOM.render(
    <Container app={app} >
        <Page>
            <AppMain />
        </Page>
    </Container>,
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();