import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import * as actions from '../../Actions/userActions'
import {Spinner} from 'react-bootstrap'

const SettingsForm = ({userID}) => {


    const dispatch = useDispatch()
    const [data, setData] = useState({})
    const [dataArray, setDataArray] = useState([])

    useEffect(()=>{
        const getUserInfo = () => dispatch(actions.getUserInfoDetailAction(userID))
        
        getUserInfo()
    }, [])

    



    const userInfo          = useSelector(state => state.userReducer.userInfo)
    const userInfoError     = useSelector(state => state.userReducer.userInfoError)
    const userInfoLoading   = useSelector(state => state.userReducer.userInfoLoading)
    const isDark            = useSelector(state => state.globalReducer.isDark)

    const onChange = (e) => {
        e.preventDefault()
        const type  = e.target.id
        const value = e.target.value

        const newData = { ...data}
        newData[type] = value
        setData(newData)
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(data)
        dispatch(actions.updateUserInfoDetailAction(userID, data))
    }

    useEffect(()=>{
        if(userInfo !== undefined && userInfo.email !== undefined){
            const newData = {...userInfo}
            setData(newData)
            const newDataArray= Object.keys(newData)
            setDataArray(newDataArray)

        }
    }, [userInfo])

    const spinner = isDark ? <Spinner animation="border" variant="light" /> :  <Spinner animation="border" variant="dark" />
    console.log(dataArray)

    return(
        <form className="custom-form" onSubmit={handleSubmit}>

            {dataArray.map((field, index)=>
                <div key={index} className="form-label-group">

                    <label htmlFor={field}>{field.replaceAll('_', ' ')}</label>

                    <div className="input-icon-group password">
                        <input 
                            type={field ==="email" ? "email" : "text"}
                            name={field}
                            id={field}
                            className="form-control form-input" 
                            onChange= { onChange }
                            placeholder="username"
                            required="required"
                            value={data[field]}
                            />
                    </div>

                </div>
            )}
            { userInfoLoading ? <div className="container">{spinner}</div>  : null }
            { userInfoError ? <p className="success alert-warning">We are sorry :(. There was an error</p>: null }
            
                <input 
                    type="submit" 
                    className="btn btn-login"     
                    value="Save" />
        </form>
    )
}

export default SettingsForm