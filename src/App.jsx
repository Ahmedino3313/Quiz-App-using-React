import { useState, useEffect } from "react";
import Landing from "./Landing";

function App() {
    const [questions, setQuestions] = useState([]);
    const [current, setCurrent] = useState(0)
    const [answers, setAnswers] = useState([])
    const [finished, setFinished] = useState(false);
    const [started, setStarted] = useState(false)
    const [timeleft, setTimeleft] = useState(300);

    useEffect(() => {
        if (!started) return;
        fetch("https://opentdb.com/api.php?amount=10&type=multiple")
            .then((res) => res.json())
            .then((data) => {
                if (data.results && data.results.length > 0) {
                    setQuestions(data.results);
                }
            });
    }, [started]);

    useEffect(() => {
        if (!started || finished) return;
        if (timeleft === 0) {
            setFinished(true);
            return;
        }
        const timer = setTimeout(() => {
            setTimeleft(timeleft - 1);
        }, 1000);
        return () => clearTimeout(timer);
    }, [timeleft, started, finished]);


    if (!started) {
        return <Landing onStart={() => setStarted(true)} />;
    }

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

    function playAgain() {
        setQuestions([]);
        setCurrent(0);
        setAnswers([]);
        setFinished(false);
        setStarted(false)
    }

    if (finished) {
        return (
            <div className="container">
                <h1>Quiz Finished!</h1>
                <p>Your Score: {getScore()} / 10</p>
                <div>
                    {questions.map((q, index) => (
                        <div key={index} style={{ marginBottom: "16px"}}>
                            <p><strong>Q{index + 1}: {q.question}</strong></p>
                            <p style={{ color: answers[index] === q.correct_answer ? "green" : "red"}}>
                                Your answer: {answers[index]}
                            </p>
                            
                            {answers[index] !== q.correct_answer && (
                                <p style={{ color: "green" }}>correct answer: {q.correct_answer}</p>
                            )}
                        </div>
                    ))}
                </div>
                <button className="nextBtn" onClick={playAgain}>Play Again</button>
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
            <p style={{ color: timeleft <= 30 ? "red" : "green"}}>
                {Math.floor(timeleft / 60)}:{String(timeleft % 60).padStart(2,"0")}
            </p>
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
            <div className="navButtons">
                <div>
                    {current > 0 && (
                        <button className="nextBtn" onClick={prevQuestion}>
                            <i className="fa-solid fa-caret-left"></i>Previous
                        </button>
                    )}
                </div>
                <div>
                    {answers[current] !== undefined && (
                        current + 1 === questions.length
                            ? <button className="nextBtn submit-Btn" onClick={nextQuestion}>Submit</button>
                            : <button className="nextBtn" onClick={nextQuestion}>
                                Next Question<i className="fa-solid fa-caret-right"></i>
                            </button>
                    )}
                </div> 
            </div>
        </div>

    );
}


export default App;