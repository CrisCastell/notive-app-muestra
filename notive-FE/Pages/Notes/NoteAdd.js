import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import NoteEditor from './NoteEditorAdd'
import * as actions from '../../Actions/notesActions'
import {getUserIDAction} from '../../Actions/userActions'
import Uploader from '../Globals/Uploader'
import * as AiIcons from 'react-icons/ai';

const NoteAdd = ({handleClose}) => {
    const dispatch = useDispatch()

    useEffect(()=>{
        const getID = () => dispatch(getUserIDAction())
        getID()

        
    }, [])

    
    const [title, setTitle]               = useState("")
    const [body, setBody]                 = useState("")
    const [image, setImage]               = useState(null)
    const [category, setCategory]         = useState(null)
    const [showUploader, setShowUploader] = useState(false)
    const [preview, setPreview]           = useState(null)

    const userID     = useSelector(state => state.userReducer.userID)
    const categories = useSelector(state => state.categoryReducer.categories)

    const createNote = e => {
        e.preventDefault()
        
        const data = {
            title: e.target.title.value,
            body: body,
            image: image,
            category: parseInt(e.target.category.value)
        }

        console.log(data)


        dispatch(actions.createNoteAction(data))
        
        handleClose()
    }

    const titleOnChange = (e) => {
        e.preventDefault()
        setTitle(e.target.value)
    }

    const bodyOnChange = (content) => {
        setBody(content)
    }


    const selectImage = (userID, data) => {
        
        setShowUploader(false)
        setImage(data.image)
        setPreview(data.croppedImageUrl)
    }

    const uploaderButton = image !== null ? null :
                    <div className="d-flex justify-content-center ">
                        <button onClick={()=> setShowUploader(true)} className="toggle-dropzone note-add-btn glass-normal">Would you like to add a cover image?</button>
                    </div>

    return(
        <div>
            <form onSubmit={createNote}>
                <select id="category" name="category" class="form-label-group" aria-label="Default select example">
                    {categories.map((cat, index) =>

                        <option key={cat.id} selected={cat.title === "Uncategorized" ? true : false } 
                        value={cat.id}
                        >{cat.title}</option>
                    
                    )}
                </select>

                <div className="form-label-group">
                    {/* <label htmlFor="title">Title</label> */}
                    <input name="title" id="title" type="text" onChange={titleOnChange} placeholder="Title" />
                </div>
                

                <div className="form-label-group">
                    {/* <label htmlFor="body">Enter your note content</label> */}
                    <NoteEditor bodyOnChange={bodyOnChange} />
                </div>


                {showUploader ? 
                <>
                    <div className="toggle-dropzone-wrapper">
                        <button onClick={()=> setShowUploader(false)} className="toggle-dropzone close">
                            <AiIcons.AiOutlineClose />
                        </button>
                    </div>
                    <div className="">
                        
                        <Uploader
                            userID={userID}
                            handleOnSave={selectImage} 
                            className=""
                        
                        /> 
                    </div>
                </>
                    
                
                :

                    uploaderButton
                
                    
                }

                {preview ? <img src={preview} alt="prueba" /> : null}

                
                <div className="d-flex justify-content-center">
                    <button className="note-add-btn glass-normal" type="submit">Create</button>
                </div>

            </form>
            
            
            
            
        </div>
    )
}

export default NoteAdd