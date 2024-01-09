import { combineReducers } from 'redux';
import nitrateReducer from './nitrateReducer'; // Create this file later
import nitriteReducer from './nitriteReducer'; // Create this file later
import ammoniaReducer from './ammoniaReducer'; // Create this file later
import phReducer from './phReducer'; // Create this file later

const rootReducer = combineReducers({
  nitrate: nitrateReducer,
  nitrite: nitriteReducer,
  ammonia: ammoniaReducer,
  ph: phReducer,
});

export default rootReducer;