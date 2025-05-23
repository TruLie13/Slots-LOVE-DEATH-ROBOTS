// src/components/Result.jsx
import React, { useState, useEffect, useRef } from "react";
import { Card, Typography, Fade } from "@mui/material";

const RESULT_DELAY_MS = 2100; // match your reels’ stop time
const FADE_DURATION_MS = 500;

const Result = ({ spinCount, isWinner }) => {
  const lossPrompts = [
    "you're so close",
    "oof...",
    "try again...",
    "keep going",
    "don't give up",
    "something encouraging because you lost and I don't want you to feel bad",
  ];

  const lastPromptRef = useRef("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (spinCount > 0) {
      // clear immediately
      setShowMessage(false);
      setMessage("");

      const timer = setTimeout(() => {
        let nextMsg;
        if (isWinner) {
          nextMsg = "We Have a Winn-na";
        } else {
          // filter out the last prompt so it can't repeat
          const choices = lossPrompts.filter(
            (p) => p !== lastPromptRef.current
          );
          nextMsg = choices[Math.floor(Math.random() * choices.length)];
          lastPromptRef.current = nextMsg;
        }
        setMessage(nextMsg);
        setShowMessage(true);
      }, RESULT_DELAY_MS);

      return () => clearTimeout(timer);
    }
  }, [spinCount, isWinner]);

  return (
    <Card
      sx={{
        minHeight: "8.5rem",
        minWidth: "90%",
        margin: "1rem",
        textAlign: "center",
        boxShadow: "none",
        border: "none",
        backgroundColor: "transparent",
      }}
    >
      {spinCount > 0 && (
        <Fade
          in={showMessage}
          timeout={FADE_DURATION_MS}
          mountOnEnter
          unmountOnExit
        >
          <Typography sx={{ color: "grey", fontSize: "1.5rem" }}>
            {message}
          </Typography>
        </Fade>
      )}
    </Card>
  );
};

export default Result;
