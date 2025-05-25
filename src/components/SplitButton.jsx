// src/components/SplitButton.jsx
import React from "react";
import { motion as Motion } from "framer-motion";
import { ButtonBase } from "@mui/material";

const SplitButton = ({ disabled, onClick, children }) => {
  const WIDTH = 175;
  const HEIGHT = 40;
  const CIRCLE = 40;
  const HALF = WIDTH / 2;
  const SHIFT = HALF - CIRCLE / 2;

  // spring for the shape morph only
  const spring = { type: "spring", stiffness: 400, damping: 30 };
  const buttonColor = disabled ? "#ffffff" : "#ffffff";

  // enabled: subtle combined anaglyph on the center piece
  const anaglyphShadow = !disabled
    ? "2px 0 8px #FF0000, -2px 0 8px #00FFFF"
    : "none";

  // disabled: use drop-shadow filter for a more natural shadow look
  const leftFilter = disabled
    ? "drop-shadow(-3px 0 3px rgba(0,255,255,0.6))"
    : "none";
  const rightFilter = disabled
    ? "drop-shadow(3px 0 3px rgba(255,0,0,0.6))"
    : "none";

  // shared style for each half
  const halfStyle = {
    position: "absolute",
    top: 0,
    width: HALF,
    height: HEIGHT,
    background: buttonColor,
    borderRadius: HEIGHT / 2,
  };

  const halves = [
    { left: 0, offset: -SHIFT, filter: leftFilter },
    { left: HALF, offset: SHIFT, filter: rightFilter },
  ];

  return (
    <ButtonBase
      disabled={disabled}
      onClick={onClick}
      sx={{
        position: "relative",
        width: WIDTH,
        height: HEIGHT,
        p: 0,
      }}
    >
      {/* left & right halves with drop-shadow when disabled */}
      {halves.map(({ left, offset, filter }, i) => (
        <Motion.div
          key={i}
          initial={false}
          animate={{ x: disabled ? offset : 0 }}
          transition={spring}
          style={{
            ...halfStyle,
            left,
            filter, // use filter instead of boxShadow
          }}
        />
      ))}

      {/* center/full button retains enabled anaglyph effect */}
      <Motion.div
        initial={false}
        animate={{
          width: disabled ? CIRCLE : WIDTH,
          height: disabled ? CIRCLE : HEIGHT,
          borderRadius: disabled ? CIRCLE / 2 : HEIGHT / 2,
          x: "-50%",
          y: "-50%",
        }}
        transition={spring}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          background: buttonColor,
          boxShadow: anaglyphShadow,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {children}
      </Motion.div>
    </ButtonBase>
  );
};

export default SplitButton;
