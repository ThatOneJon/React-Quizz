import React from "react"
import Landing from "./Landing"
import Play from "./PlayScreen"

export default function App() {
    
    const [inProgress, setInProgress] = React.useState(false)
    
    function start(){
        setInProgress(true)
    }
    
    
    return(
        <main>
            { !inProgress ? <Landing startGame = {() => start()} /> : <Play restart = {() => setInProgress(false)} />}
        </main>
        )
    }