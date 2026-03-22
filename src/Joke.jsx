import { useState, useEffect } from "react";

function App() {
  const [joke, setJoke] = useState("");

  useEffect (() => {
    fetch("https://icanhazdadjoke.com/", {
      headers: {Accept: "application/json"}
    })

    .then((res) => res.json())
    .then((data) => setJoke(data.joke));
  }, []);

  return (
    <div>
      <h1>Random Joke</h1>
      <p>{joke}</p>
    </div>
  );
}

export default App;