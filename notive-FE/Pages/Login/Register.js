import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../Actions/userActions'
import LoadingInfinite from '../Globals/Loading/LoadingInfinite'
import {Spinner, Alert} from 'react-bootstrap'
import * as GrIcons from 'react-icons/gr'

export const Register = ({history}) => {


    const dispatch = useDispatch()
    
    const [disabled, setDisabled] = useState(true)
    const [data, setData] = useState({email: "", username:"", password:"", password2:""})
    const [isDataFilled, setDataFilled] = useState({email: false, username:false, password:false, password2:false})

    const handleSubmit = (e) => { 
        e.preventDefault();
        dispatch(actions.registrationAction(data))
    }
    

    const onChange = (e) => {
        e.preventDefault()
        const type  = e.target.id
        const value = e.target.value
        const isFilled = value !== "" ? true : false

        const newData = { ...data}
        const newDataFilled = {...isDataFilled}
        newData[type] = value
        newDataFilled[type] = isFilled
        setData(newData)
        setDataFilled(newDataFilled)
    }


    
    const registrationLoading  =  useSelector(state => state.userReducer.registrationLoading)
    const registrationError    =  useSelector(state => state.userReducer.registrationError ) 
    const registrationSuccess  =  useSelector(state => state.userReducer.registrationSuccess ) 
    const isLoggedIn           =  useSelector(state => state.userReducer.isLoggedIn )
    const isDark                =  useSelector(state => state.globalReducer.isDark)


    const spinner = <Spinner animation="border" variant="dark" />
    
    useEffect(() => {
        if (isLoggedIn === true ) {
            console.log('Si funciona')
            history.push("/dashboard")
        } else {
            dispatch(actions.checkIfLogged())
        }
    }, [isLoggedIn])

    useEffect(() => {
        if(registrationSuccess === true){
            console.log("Se esta activando el useEffect")
            const loginData = {username:data.email, password:data.password}
            console.log(loginData)
            dispatch(actions.loginAction(loginData))
            
        }
        
    }, [registrationSuccess])


    useEffect(() => {

        const disabled = !(isDataFilled.email && isDataFilled.username && isDataFilled.password && isDataFilled.password2)
        setDisabled(disabled)
        
    }, [isDataFilled])


    return(
        <>
            <span className="auth-message">Create your account</span>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-label-group">

                    <label htmlFor="email">Email</label>

                    <div className="input-icon-group password">
                        {/* <div className="input-icon email"></div> */}
                        <input 
                            type="email"
                            name="email" 
                            id="email" 
                            className="form-control login-form-input" 
                            onChange= { onChange }
                            placeholder="email"
                            required="required"
                            />
                    </div>

                </div>
                <div className="form-label-group">

                    <label htmlFor="username">Username</label>

                    <div className="input-icon-group password">
                        {/* <div className="input-icon email"></div> */}
                        <input 
                            type="text"
                            name="username" 
                            id="username" 
                            className="form-control login-form-input" 
                            onChange= { onChange }
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
                            id="password" 
                            className="form-control login-form-input" 
                            onChange= { onChange }
                            placeholder="password" 
                            required="required"
                            />
                    </div>

                    
                </div>
                <div className="form-label-group">
                    <label htmlFor="password2">Confirmation</label>
                    
                    
                    <div className="input-icon-group password">
                        {/* <div className="input-icon password"></div> */}

                        <input 
                            type="password"
                            name="password2" 
                            id="password2" 
                            className="form-control login-form-input" 
                            onChange= { onChange }
                            placeholder="confirmation" 
                            required="required"
                            />
                    </div>

                    
                </div>
                { registrationLoading ? <div className="container d-flex justify-content-center  pb-3">{spinner}</div>  : null }
                { registrationError ? <p className="success alert-warning">We are sorry :(. There was an error</p>: null }
                { registrationSuccess ? 
                        <Alert variant="success">
                            Registration successfull! You will be redirected. Enjoy!
                        </Alert> 
                : null }
                    <input 
                        type="submit" 
                        className="btn btn-login"     
                        value="Sing Up"
                        disabled={registrationLoading || disabled} />
            </form>
        </>
    )

}

export default Register