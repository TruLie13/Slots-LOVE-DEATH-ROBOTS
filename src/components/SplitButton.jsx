// src/components/SplitButton.jsx
import React from "react";
import { motion as Motion } from "framer-motion";
import { ButtonBase } from "@mui/material";

const SplitButton = ({ disabled, onClick, children }) => {
  const WIDTH = 200;
  const HEIGHT = 40;
  const CIRCLE = 40;
  const HALF = WIDTH / 2;
  const SHIFT = HALF - CIRCLE / 2;

  // common spring transition
  const spring = { type: "spring", stiffness: 400, damping: 30 };

  const buttonColor = disabled ? "#000000" : "#ffffff";

  // base style for each half
  const halfStyle = {
    position: "absolute",
    top: 0,
    width: HALF,
    height: HEIGHT,
    background: "#000000",
    borderRadius: HEIGHT / 2,
  };

  // define left/right halves in a small array
  const halves = [
    { left: 0, offset: -SHIFT },
    { left: HALF, offset: SHIFT },
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
      {/* split halves */}
      {halves.map(({ left, offset }, i) => (
        <Motion.div
          key={i}
          initial={false}
          animate={{ x: disabled ? offset : 0 }}
          transition={spring}
          style={{ ...halfStyle, left }}
        />
      ))}
      {/* whole and center circle */}
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
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
