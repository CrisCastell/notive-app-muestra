import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../Actions/userActions'
import { Spinner } from 'react-bootstrap';


export const Login = ({history}) => {
    const dispatch = useDispatch()
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const submitLogin = (e) => { 
        e.preventDefault();
        const data = { username, password }
        dispatch(actions.loginAction(data))
    }
    
    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };
    
    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };


    
    const loading               =  useSelector(state => state.userReducer.loading)
    const error                 =  useSelector(state => state.userReducer.error ) 
    const errorMessage          =  useSelector(state => state.userReducer.errorMessage ) 
    const isLoggedIn            =  useSelector(state => state.userReducer.isLoggedIn )


   

    
    useEffect(() => {
        if (isLoggedIn === true ) {
            console.log('Si funciona')
            history.push("/dashboard")
        } else {
            dispatch(actions.checkIfLogged())
        }
    }, [isLoggedIn])


    return(
        <>
            <span className="auth-message">Sign in to Notive</span>
            <form className="login-form" onSubmit={submitLogin}>
            
                <div className="form-label-group">

                    <label htmlFor="login-input-username">Username</label>

                    <div className="input-icon-group password">
                        {/* <div className="input-icon email"></div> */}
                        <input 
                            type="text"
                            name="username" 
                            id="login-input-username" 
                            className="form-control login-form-input" 
                            onChange= { onChangeUsername }
                            placeholder="username"
                            required="required"
                        /*value={this.state.username}*/
                            />
                    </div>
                    
                </div>
                <div className="form-label-group">
                    <label htmlFor="login-input-password">Password</label>
                    
                    
                    <div className="input-icon-group password">
                        {/* <div className="input-icon password"></div> */}

                        <input 
                            type="password"
                            name="password" 
                            id="login-input-password" 
                            className="form-control login-form-input" 
                            onChange= { onChangePassword }
                            placeholder="password" 
                            required="required"
                            />
                    </div>
                </div>
                { loading ? <div className="container  d-flex justify-content-center pb-3"><Spinner animation="border" variant="dark" /></div>  : null }
                { error ? <div className="alert alert-danger login-error">Error: {errorMessage}</div> : null }
                    <input 
                        type="submit" 
                        className="btn btn-login"     
                        value="Ingresar"
                        disabled={loading || (username === "" || password === "")} />

                
            </form>
        </>
    )

}

export default Login