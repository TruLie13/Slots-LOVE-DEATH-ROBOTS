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
  const buttonColor = "#ffffff"; // unchanged

  // static anaglyph shadow when enabled
  const anaglyphShadow = disabled
    ? "none"
    : "2.5px 0 8.5px #FF0000, -2px 0 8.5px #00FFFF";

  // drop-shadow filters for halves when disabled
  const leftFilter = disabled
    ? "drop-shadow(-3px 0 3px rgba(0,255,255,0.6))"
    : "none";
  const rightFilter = disabled
    ? "drop-shadow(3px 0 3px rgba(255,0,0,0.6))"
    : "none";

  // “breathing” keyframes matching your last tweak
  const shadowFrames = [
    anaglyphShadow,
    "4px 0 10px #FF0000, -4px 0 10px #00FFFF",
    anaglyphShadow,
  ];

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
      disableRipple
      disableTouchRipple
      disableFocusRipple
      sx={{
        position: "relative",
        width: WIDTH,
        height: HEIGHT,
        p: 0,
        outline: "none",
        "&:focus": { outline: "none" },
        "&:focus-visible": { outline: "none" },
        WebkitwTapHighlightColor: "transparent",
      }}
    >
      {/* left & right halves (unchanged) */}
      {halves.map(({ left, offset, filter }, i) => (
        <Motion.div
          key={i}
          initial={false}
          animate={{ x: disabled ? offset : 0 }}
          transition={spring}
          style={{
            ...halfStyle,
            left,
            filter,
          }}
        />
      ))}

      {/* center/full button with animated anaglyph */}
      <Motion.div
        initial={true}
        animate={{
          width: disabled ? CIRCLE : WIDTH,
          height: disabled ? CIRCLE : HEIGHT,
          borderRadius: disabled ? CIRCLE / 2 : HEIGHT / 2,
          x: "-50%",
          y: "-50%",
          boxShadow: disabled ? "none" : shadowFrames,
        }}
        transition={{
          ...spring,
          boxShadow: disabled
            ? {}
            : {
                duration: 3,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
              },
        }}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          background: buttonColor,
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
