import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import * as actions from '../../Actions/userActions'
import {FiEdit} from 'react-icons/fi'
import ReactTooltip from "react-tooltip";
import {Modal} from 'react-bootstrap'
import Uploader from '../Globals/UploaderRefactor'
import {Spinner} from 'react-bootstrap'
import DefaultImage from '../Globals/DefaultImage'

const SettingsImage = () => {
    
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)

    const userID            = useSelector(state => state.userReducer.userID)


    useEffect(()=>{
        
        const getUserID = () => dispatch(actions.getUserIDAction())
        getUserID()
    }, [])



    useEffect(()=>{
        if(userID !== null){
            console.log(userID)
            const getUserImage = () => dispatch(actions.getUserImageAction(userID))
            getUserImage()
        }
        
    }, [userID])

    const userImage         = useSelector(state => state.userReducer.userImage)
    const userImageLoading  = useSelector(state => state.userReducer.userImageLoading)
    const userImageError    = useSelector(state => state.userReducer.userImageError)

    const userInfo          = useSelector(state => state.userReducer.userInfo)
    const userInfoError     = useSelector(state => state.userReducer.userInfoError)
    const userInfoLoading   = useSelector(state => state.userReducer.userInfoLoading)
    
    const handleClose   = () => setShow(false)
    const handleShow    = () => setShow(true)

    
    const saveUserImage = (data) => {

        dispatch(actions.updateUserImageAction(userID, data))
        handleClose()
    }

    useEffect(()=>{
        console.log(userInfo)
    }, [userInfo])
    
    return(
        <>

            <Modal 
                show={show} 
                onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="edit-image"
                
                backdropClassName="no-bg"
                >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
        
                    <Uploader
                        userID={userID}
                        handleOnSave={saveUserImage}
                        multiple={false}
                        fieldName="profile_image"
                        className=""
                    
                    /> 
                </Modal.Body>
                
            </Modal>

            <div className="image-box">
                <div className="image-wrapper">
                    {userImage ? 

                    <img className="rounded-circle settings-image" src={userImage} alt="profile pic" /> 
                    
                    : 

                    <DefaultImage username={userInfo.username} customClass={"big"} />

                    }
                    <button onClick={handleShow} disabled={userImageLoading} className="edit-image" data-tip data-for="edit-image"><FiEdit /></button>
                    {userImageLoading ? 

                        <div className="image-loading-box">
                            <Spinner animation="border" variant="light" />
                        </div>
                    
                    : null}
                    <ReactTooltip id="edit-image" place="top" effect="solid">
                        Edit image
                    </ReactTooltip>
                </div>
                {!userInfoLoading && !userInfoError && userInfo ? <p>{userInfo.username }</p> : null}
                {userInfoLoading ? <div className="container"> <Spinner animation="border" variant="light" /></div> : null}
            </div>
        </>
    )
}

export default SettingsImage