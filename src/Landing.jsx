function Landing({ onStart }) {
    return (
        <div className="container">
            <h1>Quiz App</h1>
            <p>Test your Knowledge with 10 random questions!</p>
            <button className="nextBtn" onClick={onStart}>Take Quiz</button>
        </div>
    );
}

export default Landing;
