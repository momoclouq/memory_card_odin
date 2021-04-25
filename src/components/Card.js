import React from "react";
import {useState, useEffect} from "react";

const Card = (props) => {
    const [isHoverOn, setIsHoverOn] = useState(false);

    const toggleHoverOn = () => {
        setIsHoverOn(true);
    }

    const toggleHoverOut = () => {
        setIsHoverOn(false);
    }

    const valueCheck = isHoverOn ? "card-onHover" : "error";
    const classes = `card ${valueCheck}`;

    return (
        <div 
            className={classes} 
            onMouseOver={toggleHoverOn} 
            onMouseOut={toggleHoverOut}
        >
            <img 
                className="card-photo" 
                src={props.link} 
                alt="random img" 
                onClick={props.checkValue}
                id={`card-${props.id}`}/>
        </div>
    );
};

export default Card;