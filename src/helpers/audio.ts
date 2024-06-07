"use client";
export const pluckAudio = new Audio("/audio/pluck.mp3");

export const splashAudio = new Audio("/audio/splash.mp3");
splashAudio.onloadeddata = () => {
  splashAudio.currentTime = 1;
  splashAudio.volume = 0.6;
};

export const selectAudio = new Audio("/audio/select.mp3");
selectAudio.onloadeddata = () => (selectAudio.volume = 0.6);

export const disabledAudio = new Audio("/audio/disabled.mp3");
disabledAudio.onloadeddata = () => (disabledAudio.volume = 0.6);

export const levelAudio = new Audio("/audio/level.mp3");
levelAudio.onloadeddata = () => (levelAudio.volume = 0.5);
