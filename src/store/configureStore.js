import { createStore, combineReducers } from 'redux';
import dataR from './reducers/dataR';

const rootReducer = combineReducers({
    dataR: dataR
});

const configureStore = () => {
    //mount it on the store
    const store = createStore(
        rootReducer,
    );
    return store;
};
export default configureStore;