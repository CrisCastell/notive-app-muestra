import * as actions from '../Actions/ActionTypes.js'

const initialState = {
    note:{},
    notes:[],
    notesFavorites:[],
    createdSuccess:false,
    loading: false,
    error: false,
    errorMessage:"",

    autoSaveSuccess:false,
    autoSaveError: false,
    autoSaveLoading:false
}

export default function noteReducer(state=initialState, action){
    switch(action.type){
        case actions.GET_ALL_NOTES_INIT:
            return{...state,
                error:false,
                loading: true,
                note:{},
                errorMessage:""
            }

        case actions.GET_ALL_NOTES_SUCCESS:
            return{...state,
                error: false,
                loading: false,
                notes:action.payload
            }

        case actions.GET_FAVORITES_NOTES_SUCCESS:
            return{...state,
                error: false,
                loading: false,
                notesFavorites:action.payload,
            }

        case actions.GET_ALL_NOTES_ERROR:
            return{...state,
                error:true,
                loading: false,
                errorMessage: action.payload
            }
        case actions.GET_DETAIL_NOTE_INIT:
            return{...state,
                error:false,
                loading: true,
                errorMessage:""
            }

        case actions.GET_DETAIL_NOTE_SUCCESS:
            return{...state,
                error: false,
                loading: false,
                note:action.payload
            }

        case actions.GET_DETAIL_NOTE_ERROR:
            return{...state,
                error:true,
                loading: false,
                errorMessage: action.payload
            }

        case actions.CREATE_NOTE_INIT:
            return{...state,
                error:false,
                loading: true,
                errorMessage:""
            }

        case actions.CREATE_NOTE_SUCCESS:
            return{...state,
                error: false,
                loading: false,
                createdSuccess: true,
                note:action.payload
            }

        case actions.CREATE_NOTE_ERROR:
            return{...state,
                error:true,
                loading: false,
                errorMessage: action.payload
            }

        case actions.AUTO_SAVE_NOTE_INIT:
            return{...state,
                autoSaveError:false,
                autoSaveLoading: true
            }

        case actions.AUTO_SAVE_NOTE_SUCCESS:
            return{...state,
                autoSaveError: false,
                autoSaveLoading: false,
                autoSaveSuccess: true,
            }

        case actions.AUTO_SAVE_NOTE_ERROR:
            return{...state,
                autoSaveError:true,
                autoSaveLoading: false
            }

        case actions.AUTO_SAVE_TO_FALSE:
            return{...state,
                autoSaveSuccess:false
            }
        default:
            return state
    }
}