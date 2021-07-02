import React, { useEffect, useState } from 'react';
import {  Switch, Route } from 'react-router-dom';
import * as Constants from '../Utils/Constants'
import {history} from '../Helpers/History'
import NotesPage from './Notes/NotesPage'


import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../Actions/categoryActions'

export const Dashboard = (props) => {

    const { match, carousel, changeCarousel} = props

    // const [sidebarActive, setSidebarActive] = useState(false);
    // const [carousel, setCarousel]           = useState(true)


    // const onSidebarActive = ()=>setSidebarActive(!sidebarActive)
    

    

    return(
        <>
            <div className="dashboard">
                <Switch>
                    <Route exact path={`${match.path}/`}        render={()    => <NotesPage 
                                                                                    history={history}
                                                                                    changeCarousel={changeCarousel}
                                                                                    carousel={carousel} />} 
                    />
                    
                </Switch>
            </div>
        </>
    )

}

export default Dashboard