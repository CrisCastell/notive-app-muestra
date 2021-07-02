import React, {useRef, useState, useEffect} from 'react'
import SettingsForm from './SettingsForm'
import SettingsSecurity from './SettingsSecurity'
import SettingsAppareance from './SettingsAppareance'
import SettingsDefault from './SettingsDefault'
import SettingsImage from './SettingsImage'
import {getUserIDAction} from '../../Actions/userActions'
import {Route, Link, Switch} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const SettingsPage = (props) => {

    const {match} = props
    const ulRef = useRef(null)
    const settingsNavRef = useRef(null)

    const dispatch = useDispatch()

    useEffect(()=>{
        const getUserID = () => dispatch(getUserIDAction())
        getUserID()
    }, [])

   
    const userID = useSelector(state => state.userReducer.userID)
    const navLinksArray = ['profile', 'security', 'appareance' ]
    
    return(
        <div className="form-page">
            <div className="settings-page container">

                <h2>Settings</h2>

                <div className="form-box glass-normal settings-box">
                    <div className="row">
                        <div ref={settingsNavRef} className="col-lg-2 col-md-12 settings-nav">

                            <ul className="" ref={ulRef}>

                                {navLinksArray.map((elem, index)=> 
                                    <Link key={index} to={match.path + elem}>
                                        <li className={`${props.location.pathname.replace(match.path, '') === elem ? "current" : ""}  glass-blurred `} >
                                             <div className={`icon ${elem}`}></div>
                                            <span className="no-small-views">{elem.charAt(0).toUpperCase() + elem.slice(1).toLowerCase()}</span>
                                            
                                        </li>
                                    </Link>
                                )}
                                {window.outerWidth <= 992 ? 
                                    <Link to={`${match.path}profile-image`}>
                                        <li  className={`${props.location.pathname.replace(match.path, '') === 'profile-image' ? "current" : ""} glass-blurred`} >
                                            <div className="icon image"></div>
                                            <span className="no-small-views">Profile Image</span>
                                        </li>
                                    </Link> : null}
                                
                            </ul>
                            
                            
                            

                        </div>
                        <div className="col-lg-6 col-md-12 settings-form-wrapper glass-blurred no-left-shadow">
                        <Switch>
                            <Route exact path={`${match.path}`}         render={()=> <SettingsDefault />}  />
                            <Route path={`${match.path}profile`}        render={()=> <SettingsForm userID={userID} />}  />
                            <Route path={`${match.path}security`}       render={()=> <SettingsSecurity userID={userID} />}  />
                            <Route path={`${match.path}appareance`}     render={()=> <SettingsAppareance />}  />

                            {window.outerWidth <= 992 ? 
                            <Route path={`${match.path}profile-image`}     render={()=> <SettingsImage />}  /> : null}

                        </Switch>
                            
                        </div>
                        
                        {window.outerWidth >= 992 ?

                            <div className="col-lg-4 ">

                                <SettingsImage />
    
                            </div>

                        : null}

                    </div>
                    
                    
                </div>
            </div>
            
        </div>
    )
}

export default SettingsPage