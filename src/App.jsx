import { Button, Card, Stack, Box } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import Reel from "./components/Reel.component.jsx";
import Result from "./components/Result.component.jsx";

function App() {
  const [isWinner, setIsWinner] = useState(false);
  const [spinCount, setSpinCount] = useState(0);
  const [isSpinDisabled, setIsSpinDisabled] = useState(false);
  const [stoppedCount, setStoppedCount] = useState(0);

  const reel1Ref = useRef();
  const reel2Ref = useRef();
  const reel3Ref = useRef();

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
              delay={0.3}
              starterIndex={1}
              onStop={() => setStoppedCount((c) => c + 1)}
            />
            <Reel
              key={2}
              ref={reel3Ref}
              delay={0.6}
              starterIndex={2}
              onStop={() => setStoppedCount((c) => c + 1)}
            />
          </Stack>
          <Result
            spinCount={spinCount}
            stoppedCount={stoppedCount}
            isWinner={isWinner}
          />
          <Button
            variant="contained"
            onClick={handleSpin}
            disabled={isSpinDisabled}
          >
            Spin
          </Button>
        </Stack>
      </Card>
    </Box>
  );
}

export default App;
