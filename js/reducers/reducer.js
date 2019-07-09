import { combineReducers } from 'redux';
import { securityData, userData } from './reducersmodule'
import { addNavigationHelpers } from 'react-navigation';

const rootReducer = combineReducers({
    securityData,
    userData
});

export default rootReducer;