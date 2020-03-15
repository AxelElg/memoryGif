import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GameBoard.css';
// import Hud from './Hud.js';

export default function GameBoard() {
    const [ cards, setcards ] = useState([]);
    const [ playObj, setPlayObj ] = useState([]);

    useEffect(() => {
        axios.get('/api/get-cards')
        .then(res => res.data)
        .then(data => {data.forEach((url, i) => {
            setcards(cards => [...cards, {
                id: i,
                gif: url,
                cardUp: false
            }])
        })})
        setPlayObj([]);
    }, []);


    function flipCard(card) {
        const id = card.id;
        setPlayObj([...playObj, card]);
        const targetCardIndex = cards.findIndex(card => card.id ==  id);
        const updateDeck = [...cards];
        updateDeck[targetCardIndex].cardUp = true;
        setcards(updateDeck);    
    }

    function determinPair() {
        const newCards = [...cards];
        setTimeout(() => {
            if (playObj[0].gif === playObj[1].gif) {
                ((playObj[0].id < playObj[1].id) ? playObj.reverse() : playObj).forEach( obj => {
                    newCards.splice(cards.findIndex( card => card.id === obj.id), 1); 
                });
            } else {
                const objInedexs = playObj.map( obj => cards.findIndex(card => card.id === obj.id));
                objInedexs.forEach( index => newCards[index].cardUp = false);
            }
            setPlayObj([]);
            setcards(newCards);
        }, 1200)
        
    
    }
    const display = <div className="game-container">
        {/* <Hud/> */}
    {playObj.length === 2 ? determinPair() : ''}
    {(cards.length > 0 )? 
    cards.map(card => 
        <div className="card" onClick={() => flipCard(card)}><div className={card.cardUp?"memory-card-up" : "memory-card-down"} id={card.id}> <img srcSet={card.gif}></img></div></div>):
        'Loding'}
    </div>;

    return display
}

// <div className="card" onClick={() => flipCard(card)}><div className={card.cardUp?"memory-card-up" : "memory-card-down"} id={card.id}> <img srcSet={card.gif}></img></div></div>