import React from "react";
import {useState, useEffect} from "react";

import database from "./Database";
import Card from "./Card";

const Game = () => {
    const [listOfCardLink, setListOfCardLink] = useState([]);
    const [listOfCurrentCardLink, setListOfCurrentCardLink] = useState([]);
    const [currentScore, setCurrentScore] = useState(0);
    const [maxScore, setMaxScore] = useState(0);

    useEffect(() => {
        //initialize the cards link
        let temp = [];
        for (let i = 0; i < 12; i++){
            temp.push(database[`pic${i+1}`]);
        }
        setListOfCardLink(temp)
        setListOfCurrentCardLink([...temp]);
    }, []);

    const checkValue = (event) => {
        let key = parseInt(event.target.id.split("-")[1]);
        
        if (listOfCurrentCardLink[key]){
            let temp = [...listOfCurrentCardLink];
            temp[key] = null;
            setListOfCurrentCardLink(temp);

            //add score
            if (currentScore + 1 > maxScore) setMaxScore(currentScore + 1);
            setCurrentScore(currentScore + 1);
        } else {
            setCurrentScore(0);
            setListOfCurrentCardLink([...listOfCardLink]);
        }
    }

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    const displayListOfCard = () => {
        let listOfCards = listOfCardLink.map((link, index) => {
            return <Card link={link} id={index} key={index} checkValue={checkValue}/>
        });
        shuffleArray(listOfCards);

        return listOfCards;
    }

    const reset = () => {
        setListOfCurrentCardLink([...listOfCardLink]);
        setCurrentScore(0);
        setMaxScore(0);
    }

    return(
        <div className="game">
            <div className="game-title">"Remember the card"</div>
            <div className="scoreboard">
                <div>Current Score: {currentScore}</div>
                <div>Max Score: {maxScore}</div>
            </div>
            <div className="game-cardDisplay">
                {displayListOfCard()}
            </div>
            <button onClick={reset}>Reset</button>
        </div>
    );
};

export default Game;