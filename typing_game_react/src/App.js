import { useEffect, useRef, useState } from "react";

function App() {
  const [words, setwords] = useState([
    "sigh",
    "tense",
    "airplane",
    "ball",
    "pies",
    "juice",
    "warlike",
    "bad",
    "north",
    "dependent",
    "steer",
    "silver",
    "highfalutin",
    "superficial",
    "quince",
    "eight",
    "feeble",
    "admit",
    "drag",
    "loving",
  ]);
  const [currentWord, setCurrentWord] = useState("");
  const [timer, setTimer] = useState(30);
  const time = useRef(30);

  const isTypingStarted = useRef(false);
  const score = useRef(0);
  const [gameOver, setGameOver] = useState(false);
  // const gameOverRef = useRef(gameOver);

  // useEffect(() => {
  //   setGameOver(gameOverRef.current);
  //   return () => {};
  // }, [gameOverRef.current]);

  useEffect(() => {
    const text = document.getElementById("text");

    const settingsBtn = document.getElementById("settings-btn");
    const settings = document.getElementById("settings");
    const settingsForm = document.getElementById("settings-form");
    const difficultySelect = document.getElementById("difficulty");

    // List of words for game

    // Init score

    // Init time

    // Set difficulty to value in ls or medium
    let difficulty =
      localStorage.getItem("difficulty") !== null
        ? localStorage.getItem("difficulty")
        : "medium";

    // Set difficulty select value
    difficultySelect.value =
      localStorage.getItem("difficulty") !== null
        ? localStorage.getItem("difficulty")
        : "medium";

    // Focus on text on start
    text.focus();

    // Start counting down

    addWordToDOM();

    // Event listeners

    // Typing

    // Settings btn click
    settingsBtn.addEventListener("click", () =>
      settings.classList.toggle("hide")
    );

    // Settings select
    settingsForm.addEventListener("change", (e) => {
      difficulty = e.target.value;
      localStorage.setItem("difficulty", difficulty);
    });
    return () => {};
  }, []);

  useEffect(() => {
    console.log("rederring..");
    setInterval(() => {
      if (isTypingStarted.current) {
        updateTime();
      }
    }, 1000);

    return () => {
      // isTypingStarted.current = false;
    };
  }, []);

  // Generate random word from array
  function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
  }

  // Add word to DOM

  // Update score
  function updateScore() {
    score.current++;
  }

  // Update time
  function updateTime() {
    console.log(time.current, "fc");
    if (time.current >= 0) {
      time.current--;
      setTimer(time.current);
    } else {
      setGameOver(true);
    }
  }
  function addWordToDOM() {
    setCurrentWord(getRandomWord());
  }
  const handleTextInput = (e) => {
    let difficulty =
      localStorage.getItem("difficulty") !== null
        ? localStorage.getItem("difficulty")
        : "medium";
    isTypingStarted.current = true;
    const insertedText = e.target.value;

    if (insertedText === currentWord) {
      console.log(insertedText, currentWord);
      addWordToDOM();
      updateScore();

      e.target.value = "";
    }
  };
  return (
    <>
      <button id="settings-btn" class="settings-btn">
        <i class="fas fa-cog"></i>
      </button>
      <div id="settings" class="settings">
        <form id="settings-form">
          <div>
            <label for="difficulty">Difficulty</label>
            <select id="difficulty">
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </form>
      </div>

      <div class="container">
        {!gameOver ? (
          <>
            {" "}
            <h2>👩‍💻 Speed Typer 👨‍💻</h2>
            <small>Type the following:</small>
            <h1 id="word">{currentWord}</h1>
            <input
              type="text"
              id="text"
              autocomplete="off"
              placeholder="Type the word here..."
              autofocus
              onChange={handleTextInput}
            />
            <p class="time-container">
              Time left: <span id="time">{timer}s</span>
            </p>
            <p class="score-container">
              Score: <span id="score">{score.current}</span>
            </p>
          </>
        ) : (
          <div id="end-game-container" class="end-game-container">
            <h1>Time ran out</h1>
            <p>Your final score is {score.current}</p>
            <button onclick="location.reload()">Reload</button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
