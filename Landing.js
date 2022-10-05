import React from "react"


export default function Landing(props) {
    return(
        <div className="contentLanding">
            <h1 className="indexHeadline">Quizzical App</h1>
            <p className="descriptionLanding">Welcome to our quizz, have fun!</p>
            <button className= "startButton" onClick = {props.startGame}>Start quiz</button>
        </div>
        )
}