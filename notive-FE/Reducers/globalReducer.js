import {THEME} from '../Actions/ActionTypes'

const initialState = {
    isDark: false
}

export default function globalReducer(state=initialState, action){
    switch(action.type){
        case THEME:
            return{...state,
                isDark: action.payload
            }
        default:
            return state
    }
}