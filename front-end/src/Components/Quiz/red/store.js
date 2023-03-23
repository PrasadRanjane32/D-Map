import { combineReducers, configureStore} from '@reduxjs/toolkit';

// call reducer
import  questionReducer  from './question_reducer';
import  resultReducer  from './result_reducer';

const rootReducer = combineReducers({
    questions:questionReducer,
    result:resultReducer
})

/** create store with resducer */
export default configureStore({reducer:rootReducer})