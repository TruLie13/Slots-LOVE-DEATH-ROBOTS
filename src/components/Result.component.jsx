// src/components/Result.jsx
import React, { useState, useEffect, useRef } from "react";
import { Card, Typography } from "@mui/material";
import { motion as Motion } from "framer-motion";
// import promptSound from "../assets/sounds/prompt_drop_sound.mp3";

const lossPrompts = [
  "you're so close",
  "oof",
  "try again",
  "keep going",
  "don't give up",
];

export default function Result({ stoppedCount, isWinner }) {
  const lastPromptRef = useRef("");
  const [message, setMessage] = useState("SO CLOSE");
  const [showMessage, setShowMessage] = useState(false);

  // const promptAudio = useRef(new Audio(promptSound));

  useEffect(() => {
    if (stoppedCount !== 3) {
      setShowMessage(false);
      setMessage("");
    } else if (stoppedCount === 3) {
      // all reels stopped: pick and show
      let nextMsg;
      if (isWinner) {
        nextMsg = "Winn-na!";
      } else {
        const choices = lossPrompts.filter((p) => p !== lastPromptRef.current);
        nextMsg = choices[Math.floor(Math.random() * choices.length)];
        lastPromptRef.current = nextMsg;
      }
      setMessage(nextMsg);
      setShowMessage(true);

      // play the prompt drop sound
      // promptAudio.current.currentTime = 0;
      // promptAudio.current
      //   .play()
      //   .catch((err) => console.warn("Prompt audio play failed:", err));
    }
  }, [stoppedCount, isWinner]);

  return (
    <Card
      elevation={0}
      sx={{
        minHeight: "8.5rem",
        maxWidth: "90%",
        m: 2,
        textAlign: "center",
        boxShadow: "none",
        border: "none",
        backgroundColor: "transparent",
      }}
    >
      {showMessage && (
        <Motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              color: "lightgrey",
              fontWeight: 700,
              fontSize: { xs: "2.5rem", md: "4rem" },
              textTransform: "uppercase",
              textShadow: `
                2px 0 4px rgba(255,0,0,0.8),
               -2px 0 4px rgba(0,255,255,0.8)
              `,
            }}
          >
            {message}
          </Typography>
        </Motion.div>
      )}
    </Card>
  );
}
