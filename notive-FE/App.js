import './App.css';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { history } from './Helpers/History'
import Dashboard from './Pages/Dashboard'
import Logout from './Pages/Login/Logout'
import LoginPage from './Pages/Login/LoginPage'
import DeafultLoading from './Pages/Globals/DefaultLoading'
import NotFound from './Pages/Globals/NotFound/NotFound'
import NoteDetailPage from './Pages/Notes/NoteDetailPage'
import {setDarkState} from './Actions/globalActions'
import {getAllCategoriesAction} from './Actions/categoryActions'
import {getUserImageAction, getUserInfoDetailAction} from './Actions/userActions'
import {darkThemeValues, lightThemeValues, changeThemeMode} from './Utils/utilFunctions'
import SideBar from './Pages/Globals/Nav/Sidebar'
import NavBar from './Pages/Globals/Nav/NavBar'
import InsightsPage from './Pages/Insights/InsightsPage'
import SettingsPage from './Pages/Settings/SettingsPage'
import RegisterPage from './Pages/Login/RegisterPage'


function App() {

    const isAuthView = history.location.pathname === '/' || history.location.pathname === '/register' ? false : true
    
    const dispatch = useDispatch()
  

    const getThemeLocal = () => {
        const theme   = localStorage.getItem('theme')
        const isDark  = theme === 'dark' ? true : false
        const styles  = theme === 'dark' ? darkThemeValues : lightThemeValues
        dispatch(setDarkState(isDark))
        changeThemeMode(styles)
    }

    useEffect(()=>{

        
        
        getThemeLocal()

        if(isAuthView){
          getCategories()
          getUserImage()
        }
      
    }, [])
    

    const getCategories = () => dispatch(getAllCategoriesAction())
    const getUserImage = () => dispatch(getUserImageAction())
    

    const createdSuccess = useSelector(state=>state.categoryReducer.createdSuccess)

    useEffect(()=>{

      if(isAuthView){
        getCategories()
      }
      
    }, [createdSuccess])

    const [sidebarActive, setSidebarActive] = useState(false);
    const [carousel, setCarousel]           = useState(true)

    const changeCarousel = () => setCarousel(!carousel)
    const onSidebarActive = ()=> setSidebarActive(!sidebarActive)
    
    

    const categories    = useSelector(state => state.categoryReducer.categories)
    const error         = useSelector(state => state.categoryReducer.error)
    const loading       = useSelector(state => state.categoryReducer.loading)
    const userImage     = useSelector(state => state.userReducer.userImage)

    console.log(history.location.pathname)

    return (
      <div className="App">
          <BrowserRouter>
            {isAuthView ? 
            <>
              <SideBar active={sidebarActive} 
                  categories={categories} 
                  onSidebarActive={onSidebarActive}
                  // setCarousel={setCarousel}
                  history={history}
                  carousel={carousel} />

              <NavBar active={sidebarActive} userImage={userImage} onSidebarActive={onSidebarActive} />
            </> 
            : 
            null}

            <Switch>
              <Route exact path="/"    render={()    => <DeafultLoading              history={history} />} />
              <Route path='/dashboard' render={props => <Dashboard   changeCarousel={changeCarousel}  carousel={carousel}   categories={categories}            {        ...props}  />} />
              <Route path='/note/:id'  render={props => <NoteDetailPage  categories={categories}   {...props} history={history} />} />
              <Route path='/logout'    render={props => <Logout           {...props} history={history} />} />
              <Route path='/register'  render={props => <RegisterPage     {...props} history={history} />} />
              <Route path='/insights/' render={props => <InsightsPage     {...props} history={history} />} />
              <Route path='/settings/' render={props => <SettingsPage     {...props} history={history} />} />
              <Route component ={NotFound}  />
            </Switch>
          </BrowserRouter>
      </div>
    );
}

export default App;