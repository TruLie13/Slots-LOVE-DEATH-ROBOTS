import { Button, Card, Stack, Box, Typography } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import Reel from "./components/Reel.component.jsx";
import Result from "./components/Result.component.jsx";
import SplitButton from "./components/SplitButton.jsx";

function App() {
  const [isWinner, setIsWinner] = useState(false);
  const [spinCount, setSpinCount] = useState(0);
  const [isSpinDisabled, setIsSpinDisabled] = useState(true);
  const [stoppedCount, setStoppedCount] = useState(0);

  const reel1Ref = useRef();
  const reel2Ref = useRef();
  const reel3Ref = useRef();

  useEffect(() => {
    const timer = setTimeout(() => setIsSpinDisabled(false), 450);
    return () => clearTimeout(timer);
  }, []);

  const handleSpin = () => {
    setSpinCount((prev) => prev + 1);
    setIsSpinDisabled(true);
    setStoppedCount(0);

    const result1 = reel1Ref.current.spin();
    const result2 = reel2Ref.current.spin();
    const result3 = reel3Ref.current.spin();

    setIsWinner(result1 === result2 && result2 === result3);
  };

  useEffect(() => {
    if (stoppedCount === 3) {
      setIsSpinDisabled(false);
    }
  }, [stoppedCount]);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#121111",
      }}
    >
      <Card
        sx={{
          backgroundColor: "transparent",
          minHeight: "5rem",
          padding: "1rem",
          boxShadow: "none",
          border: "none",
        }}
      >
        <Stack spacing={2} alignItems="center" mt={5}>
          <Stack direction="row" spacing={2}>
            <Reel
              key={0}
              ref={reel1Ref}
              delay={0}
              starterIndex={0}
              onStop={() => setStoppedCount((c) => c + 1)}
            />
            <Reel
              key={1}
              ref={reel2Ref}
              delay={0.2}
              starterIndex={1}
              onStop={() => setStoppedCount((c) => c + 1)}
            />
            <Reel
              key={2}
              ref={reel3Ref}
              delay={0.4}
              starterIndex={2}
              onStop={() => setStoppedCount((c) => c + 1)}
            />
          </Stack>
          <Result
            spinCount={spinCount}
            stoppedCount={stoppedCount}
            isWinner={isWinner}
          />
          <SplitButton onClick={handleSpin} disabled={isSpinDisabled}>
            <Typography
              sx={{ color: "black", fontSize: "1rem", fontWeight: "bold" }}
            >
              {isSpinDisabled ? "" : "SPIN"}
            </Typography>
          </SplitButton>
        </Stack>
      </Card>
    </Box>
  );
}

export default App;
