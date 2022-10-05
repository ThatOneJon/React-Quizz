import React from "react"

export default function Play (props){
    const[questions, setQuestions] = React.useState([])
    const[gameFinished,setGameFinished] = React.useState(false)
    const[pointCount, setPointCount] = React.useState(0)

    function replay() {
        props.restart()
    }
    
    function handleSubmit(event){
            event.preventDefault()
            questions.map(question => {
                question.correct_answer === question.selectedAnswer ? (setQuestions(prev => {
                    return (prev.map(x => {
                        return (x.id === question.id ? { ...x, answeredCorrectly: true} : x) 
                    })
                )}), setPointCount(prev => prev + 1))         
                 : question
            })
    setGameFinished(true)
    }
    
    function handleChange(event){
        const{value, name} = event.target 
        setQuestions(prev => prev.map(question => {
            return (question.id === parseInt(name) ? {...question, selectedAnswer: value} : question )
        }))
             
    }
    
    let id = 0

    React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10")
    .then((response) => {
        return response.json()
        })
    .then((data) => {
        setQuestions(data.results.map(result => {
            id++
            return ({id: id, ...result, selectedAnswer: "", answeredCorrectly: false})
        }
            ))
        
    })
    }, [])

const questionRender = questions.map(question => {
        const allAnswers = [question.correct_answer, ...question.incorrect_answers]
            
            !question.selectedAnswer && allAnswers.sort(() => Math.random() - 0.5)
            
            const answerArray= allAnswers.map(answer => gameFinished === false ? <option value ={answer} style = {question.selectedAnswer === answer ? {backroundColor: "#D6DBF5"} : {backgroundColor: "white"}}>{answer}</option> 
            : 
            <option value ={answer} name ={answer} style = {answer === question.correct_answer ? {backgroundColor: "#94D7A2"} : {backgroundColor: "#F8BCBC"}}>{answer}</option>
            )
        return(
            <div key ={question.id}>
                <h2 className="questionText">{question.question}</h2>
                    <select  name = {question.id} className ="answerSelect" onChange={handleChange} multiple >
                        {answerArray}         
                    </select>
                     {gameFinished && question.answeredCorrectly ? 
                        <h1 className="correctA">Correct!</h1>
                        :
                        (gameFinished && <div className="wrongA"><h2>Your answer: {question.selectedAnswer ? question.selectedAnswer : "None"}</h2> <h1>X</h1></div>)                     
                    }
                    <hr/>
            </div>
        )
    })
    
    return (
        
        <div className = "questionBlock">
            <form onSubmit = {handleSubmit}>
                    {questionRender}
            {!gameFinished && <button>Submit Answers</button>}
            </form>
            {gameFinished && <button className ="replayButton" onClick={replay}>replay?</button>}
            {gameFinished && <h1 className ="points">You got {pointCount} / 10 answers</h1>}
        </div>
    )}
    
    
    