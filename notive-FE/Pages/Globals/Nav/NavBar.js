import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Dropdown} from 'react-bootstrap'
import * as FaIcons from 'react-icons/fa';
import ReactTooltip from "react-tooltip";
import * as actions from '../../../Actions/userActions'
import DefaultImage from '../../Globals/DefaultImage'

const NavBar = ({onSidebarActive, userImage}) => {

    const dispatch = useDispatch()

    useEffect(()=>{
        getuserID()
        
    }, [])

    const userID = useSelector(state => state.userReducer.userID)

    useEffect(()=>{
        if(userID === null ) return
        getUserBasicInfo()
    }, [userID])


    const getuserID = () => dispatch(actions.getUserIDAction())
    const getUserBasicInfo = () => dispatch(actions.getUserBasicInfoAction(userID))

    const userBasicInfo = useSelector(state => state.userReducer.userBasicInfo)
    console.log(userBasicInfo)


    return (
        <div className='container-fluid navbar'>
            <div className="menu-btn">
                <FaIcons.FaBars data-tip data-for="menu" onClick={onSidebarActive} />
            </div>

            <ReactTooltip id="menu" place="top" effect="solid">
                Menu
            </ReactTooltip>

            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <div className="dropdown-image">
                        
                        
                        <div className="dropdown-image-wrapper">
                            {userImage? 
                            
                            <img className="rounded-circle" src={userImage} alt="Profile Pic" />
                            
                            : 
                            <DefaultImage username={userBasicInfo.username} />
                            }
                        </div>
                    </div>
                </Dropdown.Toggle>

                <Dropdown.Menu>

                    <div className="dropdown-image">
                        
                        
                        <div className="dropdown-image-wrapper">
                            {userBasicInfo.profile_image? 
                            
                            <img className="rounded-circle" src={userBasicInfo.profile_image} alt="Profile Pic" />
                            
                            : 
                            <DefaultImage />
                            }
                        </div>
                    </div>
                    <div className="d-flex justify-content-center p-2">
                        {userBasicInfo.username ?
                            <p>{userBasicInfo.username}</p>
                        :
                            null
                        }
                    </div>
                    {/* <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}

                    <Dropdown.Item href="/logout">Logout</Dropdown.Item>

                </Dropdown.Menu>
            </Dropdown>
        </div>
    )


}

export default NavBar