import { useEffect, useRef, useState } from "react";
import { useStopwatch, useTimer } from "react-timer-hook";
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

  const isTypingStarted = useRef(false);
  const score = useRef(0);
  const [gameOver, setGameOver] = useState(false);
  const stopwatchOffset = new Date();
  stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + 10);
  const { seconds, minutes, hours, days, isRunning, start, pause, reset } =
    useTimer({
      autoStart: false,
      expiryTimestamp: stopwatchOffset,
      onExpire: () => {
        setGameOver(true);
      },
    });

  useEffect(() => {
    const text = document.getElementById("text");
    text.focus();
    addWordToDOM();
    return () => {};
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

  function addWordToDOM() {
    setCurrentWord(getRandomWord());
  }
  const handleTextInput = (e) => {
    let difficulty =
      localStorage.getItem("difficulty") !== null
        ? localStorage.getItem("difficulty")
        : "medium";

    if (!isTypingStarted.current) {
      start();
      isTypingStarted.current = true;
    }
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
              Time left: <span id="time">{seconds}s</span>
            </p>
            <p class="score-container">
              Score: <span id="score">{score.current}</span>
            </p>
          </>
        ) : (
          <div id="end-game-container" class="end-game-container">
            <h1>Time ran out</h1>
            <p>Your final score is {score.current}</p>
            <button
              onClick={() => {
                window.location.reload();
              }}
            >
              Reload
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
