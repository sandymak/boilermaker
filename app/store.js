
import { createStore, applyMiddleware } from 'redux';
import { loggingMiddleware } from 'redux-logger';
import { thunkMiddleware } from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

export default createStore(rootReducer, applyMiddleware(thunkMiddleware, loggingMiddleware));
