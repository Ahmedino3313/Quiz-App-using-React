import { useState, useEffect } from "react";

function App() {
    const [questions, setQuestions] = useState([]);
    const [current, setCurrent] = useState(0)
    const [answers, setAnswers] = useState([])
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=10&type=multiple")
            .then((res) => res.json())
            .then((data) => setQuestions(data.results));
    }, []);

    function checkAnswer(answer) {
        if (answers[current] !== undefined)
            return;
        const newAnswers = [...answers];
        newAnswers[current] = answer;
        setAnswers(newAnswers);
    }

    function nextQuestion() {
        if (current + 1 === questions.length)
        {
            setFinished(true);
        } else {
            setCurrent(current + 1);
        }
    }

    function prevQuestion() {
        setCurrent(current - 1);
    }

    function getScore() {
        return answers.filter(
            (answer, index) => answer === questions[index].correct_answer).length;
    }

    if (finished) {
        return (
            <div className="container">
                <h1>Quiz Finished!</h1>
                <p>Your Score: {getScore()} / 10</p>
            </div>
        );
    }

    if (questions.length === 0) {
        return (
            <div className="container">
            <p>Loading questions...</p>
            </div>
        );
    }

    const question = questions[current];

    return (
        <div className="container">
            <h1>Quiz App</h1>
            <p>Question {current + 1} of 10</p>
            <p>{question.question}</p>
            {[...question.incorrect_answers, question.correct_answer].map((answer, index) => (
                <button key={index} onClick={() => checkAnswer(answer)}
                style={{ opacity: answers[current] && answers[current] !== answer ? 0.5 : 1,
                    backgroundColor: answers[current] === answer ? "#7c3aed" :"",
                }}>
                    {answer}
                </button>
            )
            )}
            <div>
                {current > 0 && (
                    <button className="nextBtn" onClick={prevQuestion}><i className="fa-solid fa-caret-left"></i>Previous</button>
                    )}
                    
                    {answers[current] !== undefined && (
                        current + 1 === questions.length
                        ? <button className="nextBtn" onClick={nextQuestion}>Submit</button>
                        : <button className="nextBtn" onClick={nextQuestion}>Next Question<i className="fa-solid fa-caret-right"></i></button>
                        )}
            </div>
        </div>

    );
}


export default App;