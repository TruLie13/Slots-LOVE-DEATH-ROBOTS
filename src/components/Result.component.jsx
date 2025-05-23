// src/components/Result.jsx
import React, { useState, useEffect } from "react";
import { Card, Typography, Fade } from "@mui/material";

const RESULT_DELAY_MS = 1400; // match your reels’ stop time (min half time for fade)
const FADE_DURATION_MS = 500;

const Result = ({ spinCount, isWinner }) => {
  const lossPrompts = [
    "you're so close",
    "oof...",
    "try again hot shot",
    "try again...",
    "keep going",
    "don't give up",
    "something encouraging because you lost and I don't want you to feel bad",
  ];

  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (spinCount > 0) {
      // clear immediately
      setShowMessage(false);
      setMessage("");

      const timer = setTimeout(() => {
        if (isWinner) {
          setMessage("We Have a Winn-na");
        } else {
          setMessage((prev) => {
            const choices = lossPrompts.filter((p) => p !== prev);
            return choices[Math.floor(Math.random() * choices.length)];
          });
        }
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
        backgroundColor: "transparent",
        textAlign: "center",
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
