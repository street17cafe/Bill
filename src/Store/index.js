import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import app from './reducers'

/**
 * @name configureStore.js
 * @type { Stateless component }
 * @requires redux-thunk,redux-logger
 * @description: this is the function that returns a store object from redux.
 */

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
    return createStore(app, composeEnhancers(applyMiddleware(createLogger(), thunk)));
};

export default configureStore;