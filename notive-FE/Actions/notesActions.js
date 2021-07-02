import * as actions from './ActionTypes'
import {authenticatedAxios} from '../Utils/platformAxios'
import {errorRequestHandler} from '../Utils/utilFunctions'

export const getAllNotesAction = (query) => {
    
    return async (dispatch) =>{
        dispatch(getNotesInit())
        
        try {
            const preUrl    = query.order ? `/notes/?order=true` : `/notes/`
            const url       = query.category ? `/notes/?category=${query.categoryStr}` : preUrl
            
            const response = await authenticatedAxios.get(url)
            if(query.order){
                dispatch(getFavoriteNotesSuccess(response.data))
            } else {
                dispatch(getNotesSuccess(response.data))
            }
            
        } catch (error) {

            const message = errorRequestHandler(error)
            dispatch(getNotesError(message))
           
        }
    }
}

const getNotesInit = () => ({
    type: actions.GET_ALL_NOTES_INIT,
    payload: true
})

const getNotesSuccess = (results) => ({
    type: actions.GET_ALL_NOTES_SUCCESS,
    payload: results
})

const getFavoriteNotesSuccess = (results) => ({
    type: actions.GET_FAVORITES_NOTES_SUCCESS,
    payload: results
})

const getNotesError = (message) => ({
    type: actions.GET_ALL_NOTES_ERROR,
    payload: message
})


export const getNoteDetailAction = (id) => {
    
    return async (dispatch) =>{
        dispatch(getNoteDetailInit())
        
        try {
            const response = await authenticatedAxios.get(`notes/note/${id}`)
            console.log(response.data)
            dispatch(getNoteDetailSuccess(response.data))
            
            
        } catch (error) {

            const message = errorRequestHandler(error)
            dispatch(getNoteDetailError(message))
            
        }
    }
}

const getNoteDetailInit = () => ({
    type: actions.GET_DETAIL_NOTE_INIT,
    payload: true
})

const getNoteDetailSuccess = (result) => ({
    type: actions.GET_DETAIL_NOTE_SUCCESS,
    payload: result
})

const getNoteDetailError = (message) => ({
    type: actions.GET_DETAIL_NOTE_ERROR,
    payload: message
})


export const createNoteAction = (data) => {
    
    return async (dispatch) =>{
        dispatch(createNoteInit())
        
        try {
            const response = await authenticatedAxios.post(`notes/note/`, data)
            dispatch(createNoteSuccess(response.data))
            console.log(response.data)
        } catch (error) {

            const message = errorRequestHandler(error)
            dispatch(createNoteError(message))
        }
    }
}

const createNoteInit = () => ({
    type: actions.CREATE_NOTE_INIT,
    payload: true
})

const createNoteSuccess = (result) => ({
    type: actions.CREATE_NOTE_SUCCESS,
    payload: result
})

const createNoteError = (message) => ({
    type: actions.CREATE_NOTE_ERROR,
    payload: message
})

export const autoSaveNoteAction = (data) => {
    
    return async (dispatch) =>{
        dispatch(autoSaveNoteInit())
        
        try {
            const response = await authenticatedAxios.put(`notes/note/update/${data.id}`, data)
            console.log(response)
            dispatch(autoSaveNoteSuccess(response.data))
        } catch (error) {

            const message = errorRequestHandler(error)
            dispatch(autoSaveNoteError(message))
        }
    }
}

const autoSaveNoteInit = () => ({
    type: actions.AUTO_SAVE_NOTE_INIT,
    payload: true
})

const autoSaveNoteSuccess = (result) => ({
    type: actions.AUTO_SAVE_NOTE_SUCCESS,
    payload: result
})

const autoSaveNoteError = (message) => ({
    type: actions.AUTO_SAVE_NOTE_ERROR,
    payload: message
})

export const autoSaveToFalseAction = () => ({
    type: actions.AUTO_SAVE_TO_FALSE,
    payload: false
})