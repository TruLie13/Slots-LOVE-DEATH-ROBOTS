import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Card, Typography } from "@mui/material";
import { motion as Motion } from "framer-motion";

const Reel = forwardRef(({ delay = 0 }, ref) => {
  const symbols = ["💀", "🤖", "❤", "✖", "📸", "💉", "⚙", "🏖️", "🔲"];
  const [current, setCurrent] = useState(symbols[0]);
  const [rollSymbols, setRollSymbols] = useState([symbols[0]]);
  const [spinning, setSpinning] = useState(false);

  const spin = () => {
    if (spinning) return current;
    const finalSym = symbols[Math.floor(Math.random() * symbols.length)];
    // if it's the same as current, do nothing
    if (finalSym === current) return current;

    // pick 3 uniques not equal to current or final
    const pool = symbols.filter((s) => s !== current && s !== finalSym);
    const mids = [];
    while (mids.length < 3) {
      const pick = pool.splice(Math.floor(Math.random() * pool.length), 1)[0];
      mids.push(pick);
    }

    // stack: [final, mid3, mid2, mid1, previous=current]
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
      }}
    >
      {spinning ? (
        <Motion.div
          key={rollSymbols.join("-")}
          initial={{ y: -100 * (rollSymbols.length - 1) }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: "easeIn", delay: delay }}
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
              <Typography variant="h3">{sym}</Typography>
            </div>
          ))}
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
