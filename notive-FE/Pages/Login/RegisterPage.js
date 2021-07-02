import React from 'react'
import Register from './Register'
import {Link} from 'react-router-dom'
import * as CgIcons from 'react-icons/cg'

const RegisterPage = ({history}) => {
    return(
        <div className="default-loading">
            
            <div className="form-page container">
                <div className="form-box login-box glass-normal">
                    <div className="login-logo">
                        <CgIcons.CgNotes />
                    </div>
                        
                    <Register history={history} />
                    
                    <div className="link-to-auth">
                        <Link to="/">
                            <span>Already have an account? Sign in</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default RegisterPage