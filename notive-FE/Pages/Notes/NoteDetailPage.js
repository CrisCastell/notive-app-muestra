import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useParams, Link} from 'react-router-dom'
import * as Constants from '../../Utils/Constants'
import {history} from '../../Helpers/History'
import LoadingInfinite from '../Globals/Loading/LoadingInfinite'
import * as actions from '../../Actions/notesActions'
import NoteEditorDetailPage from './NoteEditorDetailPage'
import { Spinner } from 'react-bootstrap'

const NoteDetailPage = () => {


    const parameters = useParams()
    const noteID = parameters.id
    const dispatch = useDispatch()


    // const content = '{"blocks":[{"key":"335tn","text":"Esta es la prueba con negrita, subrayado y italico","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":22,"length":7,"style":"BOLD"},{"offset":31,"length":9,"style":"UNDERLINE"},{"offset":43,"length":7,"style":"ITALIC"}],"entityRanges":[],"data":{}}],"entityMap":{}}'
    // const [body, setBody] = useState(content)
    
    useEffect(()=>{
        const getNoteDetail = () => dispatch(actions.getNoteDetailAction(noteID))
        getNoteDetail()

    }, [])

    useEffect(()=>{
        const getNoteDetail = () => dispatch(actions.getNoteDetailAction(noteID))
        getNoteDetail()

    }, [noteID])
    

    useEffect(()=>{
        const token = localStorage.getItem(Constants.USER_TOKEN)
        if(token === null){
            history.push("/");
        }
        
    }, [])

    

    const [timeoutID, setTimeoutID] = useState(null)

    const noteObj         = useSelector(state => state.noteReducer.note)
    const loading         = useSelector(state => state.noteReducer.loading)
    const error           = useSelector(state => state.noteReducer.error)
    const errorMessage    = useSelector(state => state.noteReducer.errorMessage)

    const autoSaveSuccess = useSelector(state => state.noteReducer.autoSaveSuccess)
    const autoSaveLoading = useSelector(state => state.noteReducer.autoSaveLoading)
    const autoSaveError   = useSelector(state => state.noteReducer.autoSaveError)


    const handleAutoSave = (content) => {
            
        if (timeoutID) clearTimeout(timeoutID)
        const newTimeoutID = setTimeout(function () {

            const body = content
            const newNote = {...noteObj}
            newNote['body'] = body
            
            dispatch(actions.autoSaveNoteAction(newNote))

        }, 1000);
        setTimeoutID(newTimeoutID)
    }


    useEffect(()=>{
        if(autoSaveSuccess === true){
            setTimeout(()=>{
                dispatch(actions.autoSaveToFalseAction())
            }, 3000)
        }
        
    }, [autoSaveSuccess])

    // useEffect(()=>{
        
    //     if(noteObj.body){
    //         setBody(noteObj.body)
    //         console.log(noteObj.body)
    //         console.log('Si esta pasando por aca')
    //     }
        
    // }, [noteObj])


    return(
        
        <div className="note-detail-page">
            {loading ? <Spinner animation="border" variant="dark"/> : null}
            {error ? <div className="alert alert-error">Error: {errorMessage}</div> : null}

            
            { loading || error ? 
                null
            :

            <div className="note-detail-wrapper glass-normal">
                
                
                <div className="note-detail-content">
                    <div className="note-detail-title">
                        <h2>{noteObj.title}</h2>
                        {autoSaveSuccess ? <p>saved</p> : null}
                        {autoSaveLoading ? <p>saving...</p> : null}
                        {autoSaveError   ? <p>error saving</p> : null}
                    </div>
                    {noteObj.image !== null ? <img className="note-detail-img" src={noteObj.image} alt="Foto" /> : null}

                    {noteObj.body !== undefined ? <NoteEditorDetailPage content={noteObj.body} handleAutoSave={handleAutoSave} /> : null}
                    
                    {/* <p>{noteObj.body}</p> */}
                    {/* <input className="form-control login-form-input" type="text" onChange={handleAutoSave} value={body} /> */}
                </div>
            </div>
            }
        </div>
        
        
    )
}

export default NoteDetailPage