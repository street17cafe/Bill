import { createStore, applyMiddleware, compose } from 'redux';
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
            {
                Cart: getState().Cart,
                Settings: getState().Settings,
                Dish: getState().Dish,
                Auth: getState().Auth
            }
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

const store = createStore(app, persistedStore, composeEnhancers(applyMiddleware(localStorageMiddleware)));

// const store = configureStore()

export default store;