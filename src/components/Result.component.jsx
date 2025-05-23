import { Card, Typography } from "@mui/material";
import { useMemo } from "react";

const Result = ({ spinCount, isWinner }) => {
  const lossPrompts = [
    "you're so close",
    "oof...",
    "try again hot shot",
    "try again...",
    "keep going",
    "don't give up",
    "something encouraging becuase you lost and I don't want you to feel bad",
  ];

  const lossMessage = useMemo(() => {
    return lossPrompts[Math.floor(Math.random() * lossPrompts.length)];
  }, [spinCount]);

  return (
    <Card
      sx={{
        minHeight: "2rem",
        backgroundColor: "transparent",
        alignContent: "center",
        textAlign: "center",
      }}
    >
      {spinCount > 0 && (
        <Typography sx={{ color: "grey" }}>
          {isWinner ? "We Have a Winn-na" : lossMessage}
        </Typography>
      )}
    </Card>
  );
};

export default Result;
