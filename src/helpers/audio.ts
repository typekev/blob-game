"use client";
declare global {
  interface HTMLAudioElement {
    playFrom(time?: number): Promise<void>;
  }
}

HTMLAudioElement.prototype.playFrom = playFrom;
async function playFrom(this: HTMLAudioElement, time = 0) {
  this.currentTime = time;
  this.play();
}

export const pluckAudio = Audio ? new Audio("/audio/pluck.mp3") : undefined;

export const splashAudio = Audio ? new Audio("/audio/splash.mp3") : undefined;
if (splashAudio) splashAudio.onloadeddata = () => (splashAudio.volume = 0.3);

export const selectAudio = Audio ? new Audio("/audio/select.mp3") : undefined;
if (selectAudio) selectAudio.onloadeddata = () => (selectAudio.volume = 0.2);

export const disabledAudio = Audio
  ? new Audio("/audio/disabled.mp3")
  : undefined;
if (disabledAudio)
  disabledAudio.onloadeddata = () => (disabledAudio.volume = 0.3);

export const levelAudio = Audio ? new Audio("/audio/level.mp3") : undefined;
if (levelAudio) levelAudio.onloadeddata = () => (levelAudio.volume = 0.3);
