import React, {useState, useEffect} from 'react';
import Carousel from "react-elastic-carousel";
import 'react-multi-carousel/lib/styles.css';
import Note from './Note'
import NoteCardAdd from './NoteCardAdd'

export const NotesCarousel = ({notes, notesFavorites, handleShow}) => {
    
    const [array, setArray] = useState([])
    
    const localHandleShow = () => {
        handleShow()
    }
    
    useEffect(()=>{
        creationCards()
    }, [notes])

    const creationCards = () => {
        const count = 4 - notes.length
        console.log(count)
        if(count <= 0 ) return

        let newArray = []

        for(let i=0; i < count; i++){
            const elem = {id:i}
            newArray.push(elem)
        }

        setArray(newArray)

        
    }

    const breakPoints = [
        {width: 1, itemsToShow: 1},
        {width: 370, itemsToShow: 1},
        {width: 550, itemsToShow: 3},
        {width: 764, itemsToShow: 4},
        {width: 1200, itemsToShow: 4},
    ]



    return(
        <>
            
            <div className="container ul-cards">
                <h2>Latest</h2>
                <Carousel breakPoints={breakPoints}>
                    
                    
                    {notes.map(note => <Note key={note.id} info={note}/>)}
                    {notes.length < 4 ?
                     array.map((note, index) => <NoteCardAdd key={index} handleShow={localHandleShow} />) : null}

                </Carousel>
            </div>
            <div className="container ul-cards">
                <h2>Favorites</h2>
                <Carousel breakPoints={breakPoints}>
                    {/* {notesFavorites.length < 1 ? <p>No tienes notas aun</p> : null } */}
                    {notesFavorites.map(note => <Note key={note.id} info={note}/>)}
                    {notesFavorites.length < 4 ?
                     array.map((note, index) => <NoteCardAdd key={index} handleShow={localHandleShow} />) : null}

                </Carousel>
            </div>
        </>
    )

}

export default NotesCarousel