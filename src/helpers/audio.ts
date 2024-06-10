"use client";
declare global {
  interface HTMLAudioElement {
    playFrom(time?: number): Promise<void>;
  }
}

const isClient = typeof window !== "undefined";

if (isClient) HTMLAudioElement.prototype.playFrom = playFrom;
async function playFrom(this: HTMLAudioElement, time = 0) {
  this.currentTime = time;
  this.play();
}

export const pluckAudio = isClient ? new Audio("/audio/pluck.mp3") : undefined;

export const splashAudio = isClient
  ? new Audio("/audio/splash.mp3")
  : undefined;
if (splashAudio) splashAudio.onloadeddata = () => (splashAudio.volume = 0.3);

export const selectAudio = isClient
  ? new Audio("/audio/select.mp3")
  : undefined;
if (selectAudio) selectAudio.onloadeddata = () => (selectAudio.volume = 0.2);

export const disabledAudio = isClient
  ? new Audio("/audio/disabled.mp3")
  : undefined;
if (disabledAudio)
  disabledAudio.onloadeddata = () => (disabledAudio.volume = 0.3);

export const levelAudio = isClient ? new Audio("/audio/level.mp3") : undefined;
if (levelAudio) levelAudio.onloadeddata = () => (levelAudio.volume = 0.3);
