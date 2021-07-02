import React from 'react'
import InsightsPage from './Insights/InsightsPage'
import SettingsPage from './Settings/SettingsPage'
import NotesPage from './Notes/NotesPage'
import {  Switch, Route } from 'react-router-dom';


const Content = ({carousel, history, match}) => {
    return(
        <>
            <div className="dashboard">
                <Switch>
                    <Route exact path={`${match.path}`} render={()    => <NotesPage 
                                                                history={history}
                                                                carousel={carousel} />} 
                    />
                    
                    <Route path={`${match.path}/insights/`}     render={props => <InsightsPage     {...props} history={history} />} />
                    <Route path={`${match.path}/settings/`}     render={props => <SettingsPage     {...props} history={history} />} />
                </Switch>
            </div>
        </>
    )
}

export default Content