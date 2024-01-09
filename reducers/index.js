import { combineReducers } from 'redux';
import parameterReducer from './parameterReducer'; // Create this file later

const rootReducer = combineReducers({
  parameters: parameterReducer,
  // Add more reducers as needed
});

export default rootReducer;