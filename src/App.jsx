import { Button, Card, Stack, Box } from "@mui/material";
import { useRef, useState } from "react";
import Reel from "./components/Reel.component.jsx";
import Result from "./components/Result.component.jsx";

function App() {
  const [isWinner, setIsWinner] = useState(false);
  const [isSpinDisabled, setIsSpinDisabled] = useState(false);
  const [spinCount, setSpinCount] = useState(0);

  const reel1Ref = useRef();
  const reel2Ref = useRef();
  const reel3Ref = useRef();

  const handleSpin = () => {
    setSpinCount((prev) => prev + 1);
    setIsSpinDisabled(true);

    const result1 = reel1Ref.current.spin();
    const result2 = reel2Ref.current.spin();
    const result3 = reel3Ref.current.spin();

    console.log(result1, result2, result3);

    const winner = result1 === result2 && result2 === result3;

    setTimeout(() => setIsSpinDisabled(false), 2175); //upate later to enabl eafter result3 = true

    if (winner) {
      setIsWinner(true);
    } else {
      setIsWinner(false);
    }

    console.log("Spin result:", [result1, result2, result3]);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center", // horizontal
        alignItems: "center", // vertical
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
            <Reel key={0} ref={reel1Ref} delay={0} starterIndex={0} />
            <Reel key={1} ref={reel2Ref} delay={0.2} starterIndex={1} />
            <Reel key={2} ref={reel3Ref} delay={0.4} starterIndex={2} />
          </Stack>
          <Result spinCount={spinCount} isWinner={isWinner} />
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
