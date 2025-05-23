import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Card, CardContent, Typography } from "@mui/material";

// The Reel component accepts a ref from parent to trigger spin externally
const Reel = forwardRef((props, ref) => {
  const symbols = ["💀", "🤖", "❤", "✖", "📸", "💉", "⚙", "🏖️", "🔲"];
  const [currentSymbol, setCurrentSymbol] = useState(symbols[0]);

  const spin = () => {
    const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
    setCurrentSymbol(randomSymbol);
    return randomSymbol;
  };

  useImperativeHandle(ref, () => ({
    spin,
    getValue: () => currentSymbol,
  }));

  return (
    <Card
      sx={{
        width: 100,
        height: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CardContent>
        <Typography variant="h3" align="center">
          {currentSymbol}
        </Typography>
      </CardContent>
    </Card>
  );
});

export default Reel;
