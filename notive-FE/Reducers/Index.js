import { combineReducers } from 'redux'
import noteReducer from './noteReducer'
import userReducer from './userReducer'
import globalReducer from './globalReducer'
import categoryReducer from './categoryReducer'


const rootReducer = combineReducers({
    noteReducer,
    userReducer,
    globalReducer,
    categoryReducer
});

export default rootReducer