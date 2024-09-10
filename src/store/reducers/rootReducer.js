
import { combineReducers } from 'redux';
import ProfReducer from './ProfReducer';
import chosenReducer from './ChosenReducer';


const rootReducer = combineReducers({
    ProfReducer,
    chosenReducer
});

export default rootReducer;
