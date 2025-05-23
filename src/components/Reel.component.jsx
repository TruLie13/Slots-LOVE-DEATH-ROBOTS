import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Card, Typography } from "@mui/material";
import { motion as Motion } from "framer-motion";

const Reel = forwardRef((props, ref) => {
  const symbols = ["💀", "🤖", "❤", "✖", "📸", "💉", "⚙", "🏖️", "🔲"];
  const [current, setCurrent] = useState(symbols[0]);
  const [previous, setPrevious] = useState(symbols[0]);
  const [next, setNext] = useState(symbols[0]);
  const [spinning, setSpinning] = useState(false);

  const spin = () => {
    if (spinning) return current;
    const rnd = symbols[Math.floor(Math.random() * symbols.length)];
    setPrevious(current);
    setNext(rnd);
    setSpinning(true);
    return rnd;
  };

  useImperativeHandle(ref, () => ({
    spin,
    getValue: () => current,
  }));

  const onComplete = () => {
    setCurrent(next);
    setSpinning(false);
  };

  const cellStyle = {
    width: "100%",
    height: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <Card
      sx={{
        width: 100,
        height: 100,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {spinning ? (
        <Motion.div
          key={`${previous}-${next}`}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onAnimationComplete={onComplete}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
          }}
        >
          {/* new symbol comes down into center */}
          <div style={cellStyle}>
            <Typography variant="h3">{next}</Typography>
          </div>
          {/* old symbol scrolls down out of view */}
          <div style={cellStyle}>
            <Typography variant="h3">{previous}</Typography>
          </div>
        </Motion.div>
      ) : (
        <div style={cellStyle}>
          <Typography variant="h3">{current}</Typography>
        </div>
      )}
    </Card>
  );
});

export default Reel;
