import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import store from './Store/store';
import createHistory from "history/createBrowserHistory";
import { Router, Route} from 'react-router-dom';
import App from './Containers/App';
import './css/index.css'

const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <Router history={createHistory()}>
                <Route path="/" component={App}/>
        </Router>
    </Provider>,
        MOUNT_NODE);


registerServiceWorker();

export default createHistory();