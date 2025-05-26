import { Button, Card, Stack, Box, Typography } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import Reel from "./components/Reel.component.jsx";
import Result from "./components/Result.component.jsx";
import SplitButton from "./components/SplitButton.jsx";
import spinSoundFile from "./assets/sounds/reel_spin_sound.mp3";
import buttonSoundFile from "./assets/sounds/button_sound.mp3";
import buttonEnabledSoundFile from "./assets/sounds/button_enabled_sound.mp3";

function App() {
  const [isWinner, setIsWinner] = useState(false);
  const [spinCount, setSpinCount] = useState(0);
  const [isSpinDisabled, setIsSpinDisabled] = useState(false);
  const [stoppedCount, setStoppedCount] = useState(0);

  const reel1Ref = useRef();
  const reel2Ref = useRef();
  const reel3Ref = useRef();

  // useEffect(() => {
  //   const timer = setTimeout(() => setIsSpinDisabled(false), 750);
  //   return () => clearTimeout(timer);
  // }, []);

  const disabledButtonAudio = useRef(new Audio(buttonSoundFile));
  const enabledButtonAudio = useRef(new Audio(buttonEnabledSoundFile));
  const spinAudio = useRef(new Audio(spinSoundFile));

  const handleSpin = () => {
    disabledButtonAudio.current.volume = 0.7;
    disabledButtonAudio.current.currentTime = 0.4;
    disabledButtonAudio.current
      .play()
      .catch((err) => console.warn("Disabled Button Audio play failed:", err));

    setIsSpinDisabled(true);
    setSpinCount((prev) => prev + 1);
    setStoppedCount(0);

    setTimeout(() => {
      spinAudio.current.volume = 1;
      spinAudio.current.currentTime = 0.4;
      spinAudio.current
        .play()
        .catch((err) => console.warn("Spin Audio play failed:", err));
    }, 1000);

    const result1 = reel1Ref.current.spin();
    const result2 = reel2Ref.current.spin();
    const result3 = reel3Ref.current.spin();

    setIsWinner(result1 === result2 && result2 === result3);
  };

  useEffect(() => {
    if (stoppedCount === 3) {
      enabledButtonAudio.current.volume = 0.7;
      enabledButtonAudio.current.currentTime = 0.4;
      enabledButtonAudio.current
        .play()
        .catch((err) => console.warn("Enabled Button Audio play failed:", err));
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
