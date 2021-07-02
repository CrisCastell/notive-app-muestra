import * as actions from './ActionTypes'
import {authenticatedAxios} from '../Utils/platformAxios'

export const getAllCategoriesAction = () => {
    
    return async (dispatch) =>{
        dispatch(getCategoryInit())
        
        try {
            const response = await authenticatedAxios.get('/notes/categories')
            dispatch(getCategorySuccess(response.data))
            
        } catch (error) {
            dispatch(getCategoryError())
            console.log(error)
        }
    }
}

const getCategoryInit = () => ({
    type: actions.GET_ALL_CATEGORIES_INIT,
    payload: true
})

const getCategorySuccess = (results) => ({
    type: actions.GET_ALL_CATEGORIES_SUCCESS,
    payload: results
})

const getCategoryError = () => ({
    type: actions.GET_ALL_CATEGORIES_ERROR,
    payload: true
})



export const createCategoryAction = (data) => {
    
    return async (dispatch) =>{
        dispatch(createCategoryInit())
        
        try {
            const response = await authenticatedAxios.post(`notes/category`, data)
            dispatch(createCategorySuccess(response.data))
            console.log(response.data)

        } catch (error) {
            dispatch(createCategoryError())
            console.log(error)
        }
    }
}

const createCategoryInit = () => ({
    type: actions.CREATE_CATEGORY_INIT,
    payload: true
})

const createCategorySuccess = (result) => ({
    type: actions.CREATE_CATEGORY_SUCCESS,
    payload: result.status
})

const createCategoryError = () => ({
    type: actions.CREATE_CATEGORY_ERROR,
    payload: true
})