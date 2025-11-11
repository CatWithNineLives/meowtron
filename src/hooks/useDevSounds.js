import { useEffect, useRef } from "react";
import catMeow from "../assets/cats/sounds/cat-meow.mp3";

/**
 * Hook to play sounds in dev mode
 * @param {boolean} devModeActive - Whether dev mode is active/visible
 * @param {boolean} soundEnabled - Whether dev sound is enabled
 */
export function useDevSounds(devModeActive, soundEnabled) {
  const audioRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Don't play if dev mode is not active or sound is disabled
    if (!devModeActive || !soundEnabled) {
      // Stop any playing audio and clear interval
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Play sound periodically while dev mode is active
    const playDevSound = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      const audio = new Audio(catMeow);
      audio.volume = 0.3; // Lower volume for background dev sound
      audioRef.current = audio;

      audio.play().catch((error) => {
        // Handle autoplay restrictions
        console.warn("Could not play dev sound:", error);
      });
    };

    // Play immediately when dev mode activates
    playDevSound();

    // Then play every 8-12 seconds randomly
    const scheduleNextPlay = () => {
      const delay = 8000 + Math.random() * 4000; // 8-12 seconds
      intervalRef.current = setTimeout(() => {
        playDevSound();
        scheduleNextPlay();
      }, delay);
    };

    scheduleNextPlay();

    // Cleanup on unmount or when dev mode closes
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [devModeActive, soundEnabled]);
}
