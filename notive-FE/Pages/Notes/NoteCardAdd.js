import React from 'react'
import {AiOutlinePlus} from 'react-icons/ai';

const NoteCardAdd = ({handleShow}) => {

    const localHandleShow = () => {
        handleShow()
    }
    return(
        <>
            <button onClick={localHandleShow}>
                <div className="card create-card glass-normal">
                    <div className="">
                        <AiOutlinePlus />
                        <h3>Create New card</h3>
                    </div>
                </div>
            </button>
            
        </>
    )
}

export default NoteCardAdd
