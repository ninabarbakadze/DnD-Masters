import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import allReducer from '../reducers';

const appStore = createStore(allReducer, applyMiddleware(thunk));

export default appStore;
