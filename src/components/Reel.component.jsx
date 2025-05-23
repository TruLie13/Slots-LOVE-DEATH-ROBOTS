import { Box, Card } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";

const Reel = forwardRef((props, ref) => {
  const symbols = ["💀", "🤖", "❤", "✖", "📸", "💉", "⚙", "🏖️", "🔲"];
  const [reelSymbols, setReelSymbols] = useState([symbols[0]]);
  const [translateY, setTranslateY] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const symbolHeight = 100; // px — matches Card height
  const visibleIndex = 2; // final symbol lands here (centered in 5)

  const spin = () => {
    return new Promise((resolve) => {
      const finalSymbol = symbols[Math.floor(Math.random() * symbols.length)];
      const sequence = [];

      // Build 4 random + 1 final = 5 symbols
      for (let i = 0; i < 4; i++) {
        sequence.push(symbols[Math.floor(Math.random() * symbols.length)]);
      }
      sequence.push(finalSymbol);

      setReelSymbols(sequence);
      setTranslateY(0); // reset
      setIsSpinning(true);

      // Animate scroll top-down to center the final symbol
      setTimeout(() => {
        const offset = symbolHeight * visibleIndex;
        setTranslateY(offset);
      }, 50);

      // End spin
      setTimeout(() => {
        setIsSpinning(false);
        setReelSymbols([finalSymbol]); // show only final symbol
        setTranslateY(0);
        resolve(finalSymbol);
      }, 700); // match this to transition
    });
  };

  useImperativeHandle(ref, () => ({
    spin,
    getValue: () => reelSymbols[reelSymbols.length - 1],
  }));

  return (
    <Card
      sx={{
        width: 100,
        height: symbolHeight,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "transparent",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          transform: `translateY(${translateY}px)`,
          transition: isSpinning ? "transform 1.2s ease-out" : "none",
        }}
      >
        {reelSymbols.map((symbol, i) => (
          <Box
            key={i}
            sx={{
              height: symbolHeight,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "2.5rem",
            }}
          >
            {symbol}
          </Box>
        ))}
      </Box>
    </Card>
  );
});

export default Reel;
