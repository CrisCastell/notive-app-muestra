import React from 'react'
import Note from './Note'
import {FcIdea} from 'react-icons/fc'
import useWindowSize from '../../Utils/useWindowSize'
import NoteCardAdd from './NoteCardAdd'

const NotesAll = ({notes, handleShow}) => {
    const windowSize = useWindowSize()
    return(
        <div className="container-fluid">
            <h2 className="all-notes-title">All notes</h2>
            <div className="row">
                {notes.length > 0 ?
                    <>
                   { notes.map(note => 
                        <div key={note.id} className="col-lg-3 col-md-4 col-6 ul-cards card-wrapper">
                            <Note key={note.id} info={note}/>
                        </div>    
                    )}

                    {windowSize.width < 768 &&
                        <div className="col-lg-3 col-md-4 col-6 ul-cards card-wrapper">
                            <NoteCardAdd handleShow={handleShow} />
                        </div>    
                    }
                    </>
                    
                :
                <div className="all-notes-empty container">
                    <div className="">
                        
                        <FcIdea />
                        
                    </div>

                    <p>You don't have any note yet. Click the 'Create New Note' button and let's start writting!</p>
                    
                </div>
                    
                }


                
            </div>
        </div>
    )
}

export default NotesAll