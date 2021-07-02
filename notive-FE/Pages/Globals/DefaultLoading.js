import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { history } from '../../Helpers/History'
import * as actions from '../../Actions/userActions'
import LoginPage from '../Login/LoginPage'
import * as CgIcons from 'react-icons/cg'

const DeafultLoading = () => {

    const dispatch                          = useDispatch()
    const [alreadyProved, setAlreadyProved] = useState(false)
    const [showLogin, setShowLogin]         = useState(false)
    const isLoggedIn                        = useSelector(state => state.userReducer.isLoggedIn )
    
    useEffect(() => {
        if (isLoggedIn === true ) {
            console.log('Esta pasando por aqui')
            console.log('Si funciona')
            history.push("/dashboard")
        }
        if(isLoggedIn === false && alreadyProved === false) {
            console.log('Pasa por el check if')
            setAlreadyProved(true)

            dispatch(actions.checkIfLogged())
        }
        if(isLoggedIn === false && alreadyProved === true){
            console.log('Esta pasando por show login')
            setShowLogin(true)
        }
    }, [isLoggedIn, alreadyProved])

    return(
        <div className="default-loading ">
            {showLogin ? (

            <LoginPage history={history} />

            ) : (

            <div className="logo-box container">
                <div className="default-logo">
                    <CgIcons.CgNotes />
                </div>
            </div>

            )}
            
        </div>
    )
}

export default DeafultLoading