import React from 'react'
import {useSelector} from 'react-redux'

const DefaultImage = ({username, customClass}) => {


    return(
        <div className="default-profile-pic">
            {username ?<span className={customClass && customClass}>{username[0]}</span> : null }
        </div>
    )
}

export default DefaultImage