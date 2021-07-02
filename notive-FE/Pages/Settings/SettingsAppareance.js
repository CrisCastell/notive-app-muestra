import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {setDarkState} from '../../Actions/globalActions'
import {darkThemeValues, lightThemeValues, changeThemeMode} from '../../Utils/utilFunctions'
import {FaMoon, FaSun} from 'react-icons/fa';

const SettingsAppareance = () => {

    const dispatch = useDispatch()

    const isDark        = useSelector(state => state.globalReducer.isDark)


    const setThemeMode = () =>{
        const styles  = isDark ?  lightThemeValues : darkThemeValues
        const theme   = isDark ?  'light' : 'dark'
        dispatch(setDarkState(!isDark))
        changeThemeMode(styles)
        localStorage.setItem('theme', theme)
    }


    return(
        // <div className="">
        //     <div className="switch-box">
        //         <label className="switch">
        //           <input type="checkbox" checked={isDark} onChange={setThemeMode}/>
        //           <span className="slider round"></span>
        //         </label>
        //         <div className={`icon-wrapper ${isDark ? "light" : ""}`}>{isDark ? <FaSun /> : <FaMoon /> }</div>
        //       </div>
        // </div>
        <div className="settings-appareance">
           <div className="">
                Dark Mode
            </div>
            <div className="switch-box">
                <div className={`icon-wrapper ${isDark ? "light" : ""}`}><FaSun /></div>
                <label className="switch">
                    <input type="checkbox" checked={isDark} onChange={setThemeMode}/>
                    <span className="slider round"></span>
                </label>
                <div className={`icon-wrapper ${isDark ? "light" : ""}`}> <FaMoon /></div>
            </div>
        </div>
    )
}

export default SettingsAppareance