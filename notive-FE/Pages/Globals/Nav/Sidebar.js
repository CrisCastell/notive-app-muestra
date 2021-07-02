import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {IconContext} from 'react-icons'
import {sidebarLinks} from './SidebarLinks'
import {Link} from 'react-router-dom'
// import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
// import * as IoIcons from 'react-icons/io';
import {Accordion, Card, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import * as actions from '../../../Actions/categoryActions'

const Sidebar = (props) => {

    const dispatch = useDispatch()
    const { match, active, onSidebarActive} = props
    const [creatingCategory, setCreatingCategory] = useState(false)
    const [title, setTitle] = useState("")


    

    const categories    = useSelector(state => state.categoryReducer.categories)
    const error         = useSelector(state => state.categoryReducer.error)
    const loading       = useSelector(state => state.categoryReducer.loading)

    
    

    const createNewCategory = (e) => {
        e.preventDefault()
        if (title.length === 0) return

        const data = {title: title}
        dispatch(actions.createCategoryAction(data))
        setCreatingCategory(false)

    }

    const onChange = (e) => {
      e.preventDefault()
      const newTitle = e.target.value
      setTitle(newTitle)
    }



    
    return(
        <>
          <IconContext.Provider value={{ color: '#000' }}>
            
            <nav className={active ? 'sidebar active glass-blurred' : 'sidebar glass-blurred'}>
              <ul>
                <li onClick={onSidebarActive} className='sidebar-toggle'>
                  
                    <AiIcons.AiOutlineClose />
                  
                </li>
                <li onClick={onSidebarActive} className="nav-text">
                    <Link to="/dashboard">
                    <AiIcons.AiFillHome />
                    <span>Home</span>
                    </Link>
                </li>
                <li>
                    <Accordion defaultActiveKey="0">
                        <Card>
                            <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <AiIcons.AiOutlineUnorderedList />
                                <span>Categorias - {categories.length}</span>
                            </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <ul>
                                    {categories.map( category => 
                                      <li key={category.id}>
                                        <Link to={`/dashboard?category=${category.title}`}>
                                          <div className="category">
                                            {category.title}
                                          </div> 
                                        </Link>
                                      </li> 
                                    )}
                                    {creatingCategory ? 

                                        <div className="create-category">
                                          <div className="header">
                                              <button onClick={() => setCreatingCategory(false)}>
                                                <AiIcons.AiOutlineClose />
                                              </button>
                                          </div>
                                          <form onSubmit={createNewCategory}>
                                              <input type="text" id="title" onChange={onChange}  placeholder="Enter the category title" />
                                              <button >Enter</button>

                                          </form>
                                        </div>
                                      
                                    : 
                                      
                                      <button onClick={() => setCreatingCategory(true)}>+ Create New Category</button>
                                      
                                    }
                                </ul>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </li>
                
                {sidebarLinks.map((item, index) => {
                  return (
                
                    <li onClick={onSidebarActive} key={index} className={item.cName}>
                      {item.disabled ? (
                        <>
                          {item.icon}
                          <span>{item.title}</span>
                        </>
                      ) : (
                        <Link to={item.path}>
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>

                      )}
                      
                    </li>
                  );
                })}
                
                                      
              </ul>
              
            </nav>
          </IconContext.Provider>
        </>
    )
}

export default Sidebar