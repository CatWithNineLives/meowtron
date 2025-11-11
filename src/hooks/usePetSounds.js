import { useEffect, useRef } from "react";
import catAngry from "../assets/cats/sounds/cat-angry.mp3";
import catHappy from "../assets/cats/sounds/cat-happy.mp3";
import catHungry from "../assets/cats/sounds/cat-hungry.mp3";
import catMeow from "../assets/cats/sounds/cat-meow.mp3";
import catPurring from "../assets/cats/sounds/cat-purring.mp3";
import catChittery from "../assets/cats/sounds/cat-chittery.mp3";

// Map moods to sound files
const MOOD_SOUNDS = {
  idle: catPurring,
  happy: catHappy,
  hungry: catHungry,
  sleepy: catPurring,
  angry: catAngry,
  critical: catChittery,
  dead: null, // No sound for dead state
};

/**
 * Hook to play sounds based on pet mood
 * @param {string} mood - Current mood
 * @param {boolean} soundEnabled - Whether sound is enabled
 */
export function usePetSounds(mood, soundEnabled) {
  const audioRef = useRef(null);
  const previousMoodRef = useRef(null);

  useEffect(() => {
    // Don't play sound if disabled or mood hasn't changed
    if (!soundEnabled || mood === previousMoodRef.current) {
      previousMoodRef.current = mood;
      return;
    }

    // Get sound file for current mood
    const soundFile = MOOD_SOUNDS[mood];

    // Don't play if no sound file or dead state
    if (!soundFile || mood === "dead") {
      previousMoodRef.current = mood;
      return;
    }

    // Stop previous audio if playing
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Create and play new audio
    const audio = new Audio(soundFile);
    audio.volume = 0.5; // Set volume to 50%
    audioRef.current = audio;

    audio.play().catch((error) => {
      // Handle autoplay restrictions
      console.warn("Could not play sound:", error);
    });

    // Update previous mood
    previousMoodRef.current = mood;

    // Cleanup on unmount or mood change
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [mood, soundEnabled]);
}
