import React, {useState, useEffect} from 'react'
import NotesCarousel from './NotesCarousel'
import NotesAll from './NotesAll'
import NoteAdd from './NoteAdd'
import Note from './Note'
import NoteCardAdd from './NoteCardAdd'
import {useLocation} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../Actions/notesActions'
import Modal from 'react-bootstrap/Modal';
import {AiOutlinePlus} from 'react-icons/ai';
import LoadingInfinite from '../Globals/Loading/LoadingInfinite'
import ReactTooltip from "react-tooltip";
import * as BiIcons from 'react-icons/bi'
import * as AiIcons from 'react-icons/ai'
import Spinner from 'react-bootstrap/Spinner'
import useWindowSize from '../../Utils/useWindowSize'

const NotesPage = ({carousel, changeCarousel}) => {

    

    useEffect(()=>{
        let query = {order:false, category:false}
        getNotes(query)

        query = {order:true, category:false}
        getNotes(query)

    }, [])

    
    const query                   = useQuery()
    const category                = query.get("category")

    
    const windowSize              = useWindowSize()
    const smallSize               = windowSize.width > 768 

    const dispatch                = useDispatch()
    const getNotes                = (query) => dispatch(actions.getAllNotesAction(query))

    const [show, setShow]                         = useState(false);
    const [categoryBool, setCategoryBool]         = useState(false)
    const [myNote, setMyNote]                     = useState({id:0});
    const [myFavoriteNote, setMyFavoriteNote]     = useState({id:0});
    const handleClose             = () => setShow(false);
    const handleShow              = () => setShow(true);
    

    const notes          = useSelector(state => state.noteReducer.notes)
    const notesFavorites = useSelector(state => state.noteReducer.notesFavorites)
    const success        = useSelector(state => state.noteReducer.createdSuccess)
    const loading        = useSelector(state => state.noteReducer.loading)
    const error          = useSelector(state => state.noteReducer.error)
    const errorMessage   = useSelector(state => state.noteReducer.errorMessage)
    const isDark            = useSelector(state => state.globalReducer.isDark)




    useEffect(()=>{
        if(success == true){
            const query = {order:false, category:false}
            getNotes(query)

        }
        
        
    }, [success])

    
    useEffect(()=>{
        if(notes.length > 0){
            setMyNote(notes[0])
        }

    }, [notes])

    useEffect(()=>{
        if(notesFavorites.length > 0){
            setMyFavoriteNote(notesFavorites[0])
        }

    }, [notesFavorites])

    useEffect(()=>{

        let query = {}

        if(category !== null){
            setCategoryBool(true)
            changeCarousel()
            query = {category:true, categoryStr:category, order:false}
            getNotes(query)
        } else {
            setCategoryBool(false)
            query = {category:false, order:false}
            getNotes(query)

            query = {category:false, order:true}
            getNotes(query)
        }

        
        
    }, [category])



    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    const spinner = isDark ? <Spinner animation="border" variant="light" /> :  <Spinner animation="border" variant="dark" />


    const DefaultNotesPage = <>
                    {carousel && smallSize ?
                    <>
                    <div className="col-md-3 ul-cards important">
                        <div className="row">
                            <div className="col-12 important-card-wrapper">
                                <div className="important-card">
                                    
                                    {notes.length === 0 ? 
                                    
                                    <NoteCardAdd handleShow={handleShow} />
                                    
                                    :
                                    
                                    <Note info={myNote}/>
                                    
                                    }
                                </div>
                            </div>
                            <div className="col-12 important-card-wrapper">
                                <div className="important-card">
                                    
                                    {notes.length === 0 ? 
                                    
                                    <NoteCardAdd handleShow={handleShow} />
                                    
                                    :
                                    
                                    <Note info={myFavoriteNote}/>
                                    
                                    }
                                </div>
                            </div>
                    
                        </div>
                    </div>
                    <div className="col-md-8">
                        <NotesCarousel notes={notes} notesFavorites={notesFavorites} handleShow={handleShow} />
                    </div>
                    </>
                    :

                    <div className="col-md-11 ul-cards important all-notes-wrapper">
                        <div className="container all-notes">
                    
                            <NotesAll notes={notes} handleShow={handleShow} />
                        
                        </div>
                    </div>

                    
                    }

                    </>

    const categoryPage = <>

                        <div className="col-md-11 ul-cards important all-notes-wrapper">
                            <div className="container all-notes">
                        
                                <NotesAll notes={notes}  />
                            
                            </div>
                        </div>
                        </>

    const dashboardPrevious =   <div className="col-md-11 b">
                                    <div className="container-fluid loading-infinite-wrapper">

                                        {error   ? <div className="alert alert-danger">{errorMessage} </div> : null }
                                        {loading ? spinner : null }
                                        {/* {loading ? <Spinner animation="border" size="lg" /> : null } */}
                                        
                                    </div>
                                </div>
    
    return(
        <>
            <Modal 
                show={show} 
                onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="note-add"
                
                backdropClassName="no-bg"
                >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <NoteAdd handleClose={handleClose} />
                </Modal.Body>
                
            </Modal>
            
                            

            <div className="container-fluid all-notes-wrapper">
                <div className="row">
                    
                    <div className="col-md-1 change-carousel-button">
                        <button onClick={changeCarousel} data-tip data-for="toggle-list-view" className="toggle-list-view" disabled={categoryBool} >
                            {carousel ?
                                <AiIcons.AiOutlineUnorderedList />
                            : 
                                <BiIcons.BiCarousel />
                            }
                        </button>
                        <ReactTooltip id="toggle-list-view" place="top" effect="solid">
                            {carousel ? "View as list" : "View as carousel"}
                        </ReactTooltip>

                        
                    </div>
                    
                    {loading || error ? dashboardPrevious : 
                    
                    categoryBool ? categoryPage : DefaultNotesPage

                    
                    }
                    
                    
                </div>
            </div>
            <button onClick={handleShow} data-tip data-for="create-note" className="create-new-note"><AiOutlinePlus /></button>
            <ReactTooltip id="create-note" place="top" effect="solid">
                Create New Note
            </ReactTooltip>
                        


            
        </>
    )
}

export default NotesPage