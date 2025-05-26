// Import the raw mp3 files
import disabledSoundFile from "./button_disabled_sound.mp3";
import enabledSoundFile from "./button_enabled_sound.mp3";
import spinSoundFile from "./reel_spin_sound.mp3";

// Create one Audio instance per SFX and set your defaults
export const disabledButtonAudio = new Audio(disabledSoundFile);
disabledButtonAudio.volume = 0.7;
disabledButtonAudio.currentTime = 0.625;

export const enabledButtonAudio = new Audio(enabledSoundFile);
enabledButtonAudio.volume = 0.7;
enabledButtonAudio.currentTime = 0.4;

export const spinAudio = new Audio(spinSoundFile);
spinAudio.volume = 1;
spinAudio.currentTime = 0.5;
