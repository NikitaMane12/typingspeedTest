import React, { useState, useRef } from "react";

const TypingSpeedTest = () => {
  const ref = useRef(null);
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [typingTimer, setTypingTimer] = useState(null);
  const focusInput = () => {
    ref.current = focus();
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setInput(value);

    if (!startTime) {
      setStartTime(new Date());
    }

    if (typingTimer) {
      clearTimeout(typingTimer);
    }
    setTypingTimer(setTimeout(() => calculateWPM(value), 2000));
  };

  const calculateWPM = (typedText) => {
    const timeTaken = (new Date() - startTime) / 1000 / 60;
    const totalWords = typedText.trim().split(" ").length;
    const calculatedWpm = Math.round(totalWords / timeTaken);
    setWpm(calculatedWpm);
  };

  const resetTest = () => {
    setInput("");
    setStartTime(null);
    setWpm(0);
    if (typingTimer) {
      clearTimeout(typingTimer);
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Typing Speed Test</h1>
      <hr />

      <div
        style={{
          textAlign: "center",
          maxWidth: "80%",
          margin: "0 auto",
          background: "grey",
        }}
      >
        <textarea
          value={input}
          onChange={handleChange}
          ref={focusInput}
          placeholder=" User Start typing here..."
          rows={5}
          style={{
            width: "80%",
            margin: "10px 0",
            border: "2px solid",
            fontSize: "30px",
          }}
        />
        {wpm > 0 && <h2>Your typing speed: {wpm} WPM</h2>}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={resetTest}
            style={{
              marginTop: "10px",
              padding: "20px",
              fontSize: "20px",
              background: "red",
              color: "black",
            }}
          >
            Restart Test
          </button>
        </div>
      </div>
    </>
  );
};

export default TypingSpeedTest;
