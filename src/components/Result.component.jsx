// src/components/Result.jsx
import React, { useState, useEffect, useRef } from "react";
import { Card, Typography } from "@mui/material";

const lossPrompts = [
  "you're so close",
  "oof...",
  "try again...",
  "keep going",
  "don't give up",
  "something encouraging because you lost and I don't want you to feel bad",
];

export default function Result({ stoppedCount, isWinner }) {
  const lastPromptRef = useRef("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (stoppedCount !== 3) {
      setShowMessage(false);
      setMessage("");
    } else if (stoppedCount === 3) {
      // all reels stopped: pick and show
      let nextMsg;
      if (isWinner) {
        nextMsg = "We Have a Winn-na";
      } else {
        const choices = lossPrompts.filter((p) => p !== lastPromptRef.current);
        nextMsg = choices[Math.floor(Math.random() * choices.length)];
        lastPromptRef.current = nextMsg;
      }
      setMessage(nextMsg);
      setShowMessage(true);
    }
  }, [stoppedCount, isWinner]);

  return (
    <Card
      elevation={0}
      sx={{
        minHeight: "8.5rem",
        minWidth: "90%",
        m: 2,
        textAlign: "center",
        boxShadow: "none",
        border: "none",
        backgroundColor: "transparent",
      }}
    >
      {showMessage && (
        <Typography sx={{ color: "grey", fontSize: "1.5rem" }}>
          {message}
        </Typography>
      )}
    </Card>
  );
}
