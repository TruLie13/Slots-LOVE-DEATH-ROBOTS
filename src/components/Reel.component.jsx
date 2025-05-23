// src/components/Reel.jsx
import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Card } from "@mui/material";
import { motion as Motion } from "framer-motion";
import { symbols } from "../assets/symbols";

const Reel = forwardRef(({ delay = 0 }, ref) => {
  const [current, setCurrent] = useState(symbols[0]);
  const [rollSymbols, setRollSymbols] = useState([symbols[0]]);
  const [spinning, setSpinning] = useState(false);

  const spin = () => {
    if (spinning) return current;
    const finalSym = symbols[Math.floor(Math.random() * symbols.length)];
    if (finalSym === current) return current;

    const pool = symbols.filter((s) => s !== current && s !== finalSym);
    const mids = [];
    while (mids.length < 3) {
      mids.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
    }

    setRollSymbols([finalSym, mids[2], mids[1], mids[0], current]);
    setSpinning(true);
    return finalSym;
  };

  useImperativeHandle(ref, () => ({
    spin,
    getValue: () => current,
  }));

  const onComplete = () => {
    setCurrent(rollSymbols[0]);
    setSpinning(false);
    setRollSymbols([rollSymbols[0]]);
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
        backgroundColor: "transparent",
      }}
    >
      {spinning ? (
        <Motion.div
          key={rollSymbols.join("-")}
          initial={{ y: -100 * (rollSymbols.length - 1) }}
          animate={{ y: 0 }}
          transition={{ delay, duration: 0.8, ease: "easeOut" }}
          onAnimationComplete={onComplete}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
          }}
        >
          {rollSymbols.map((sym, i) => (
            <div key={i} style={cellStyle}>
              <img
                src={sym}
                width={95}
                height={95}
                alt=""
                style={{
                  filter: "brightness(0) saturate(100%) invert(1)",
                }}
              />
            </div>
          ))}
        </Motion.div>
      ) : (
        <div style={cellStyle}>
          <img
            src={current}
            style={{
              filter: "brightness(0) saturate(100%) invert(1)",
            }}
            width={95}
            height={95}
            alt=""
          />
        </div>
      )}
    </Card>
  );
});

export default Reel;
