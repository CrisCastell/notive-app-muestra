import {useEffect} from 'react'
import * as Constants from '../../Utils/Constants'

const Logout = ({history}) => {

    useEffect(()=>{        
        signMeOut()
    }, [])

    function signMeOut() {
        localStorage.removeItem(Constants.USER_TOKEN);
        history.push("/");
    }
    return (
        <div className="container">
            Logout
        </div>
    )
}


export default Logout