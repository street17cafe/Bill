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

const localStorageMiddleware = ({getState}) => { // <--- FOCUS HERE
    return (next) => (action) => {
        const result = next(action);
        localStorage.setItem('reduxState', JSON.stringify(
            {Cart: getState().Cart}
        ));
        return result;
    };
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let persistedStore = {}

try{
    persistedStore = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {}
}catch(err){
    console.log("Unable to read store from localstorage", err)
}

const configureStore = () => {
    return createStore(app, persistedStore, composeEnhancers(applyMiddleware(createLogger(), thunk, localStorageMiddleware)));
};

export default configureStore;