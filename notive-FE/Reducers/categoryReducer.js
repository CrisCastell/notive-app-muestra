import * as actions from '../Actions/ActionTypes.js'

const initialState = {
    categories:[],
    loading: false,
    error: false,
    createdSuccess: false,
    messageSuccess:""
}

export default function categoryReducer(state=initialState, action){
    switch(action.type){
        case actions.GET_ALL_CATEGORIES_INIT:
            return{...state,
                error:false,
                loading: true
            }

        case actions.GET_ALL_CATEGORIES_SUCCESS:
            return{...state,
                error: false,
                loading: false,
                categories: action.payload
            }

        case actions.GET_ALL_CATEGORIES_ERROR:
            return{...state,
                error:true,
                loading: false
            }
        
        case actions.CREATE_CATEGORY_INIT:
            return{...state,
                error:false,
                loading: true
            }

        case actions.CREATE_CATEGORY_SUCCESS:
            return{...state,
                error: false,
                loading: false,
                createdSuccess: true,
                messageSuccess: action.payload
            }

        case actions.CREATE_CATEGORY_ERROR:
            return{...state,
                error:true,
                loading: false
            }
        default:
            return state
    }
}