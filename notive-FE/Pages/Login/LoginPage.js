import React from 'react'
import Login from './Login'
import Register from './Register'
import {Link} from 'react-router-dom'
import * as CgIcons from 'react-icons/cg'

const LoginPage = ({register, history}) => {

    return(
        <div className="form-page container">
            <div className="form-box login-box glass-normal">
                
                    <div className="login-logo">
                        <CgIcons.CgNotes />
                    </div>

                    <Login history={history} />
                
                    <div className="link-to-auth">
                        <Link to="/register">
                            <span>Do not have an account yet? Sign Up here</span>
                        </Link>
                    </div>
            </div>
        </div>

    )
}

export default LoginPage