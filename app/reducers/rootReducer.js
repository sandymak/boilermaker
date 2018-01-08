import { combineReducers } from 'redux';
import { studioReducer } from './studioReducer';

const rootReducer = combineReducers({
  studios: studioReducer
});

export default rootReducer;
