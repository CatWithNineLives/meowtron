import { useState, useEffect, useCallback, useRef } from "react";
import { clamp, calculateDecay, applyAction } from "../utils/petLogic";

const STORAGE_KEY = "meowtron-pet-stats";
const DEFAULT_STATS = { hunger: 50, happiness: 50, energy: 50 };

/**
 * Custom hook for managing pet stats with persistence and decay
 * @returns {Object} Pet stats and control functions
 */
export function usePetStats() {
  const [stats, setStats] = useState(() => {
    // Load from localStorage or use defaults
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          hunger: clamp(parsed.hunger || DEFAULT_STATS.hunger),
          happiness: clamp(parsed.happiness || DEFAULT_STATS.happiness),
          energy: clamp(parsed.energy || DEFAULT_STATS.energy),
        };
      }
    } catch (error) {
      console.warn("Failed to load pet stats from localStorage:", error);
    }
    return DEFAULT_STATS;
  });

  const lastActionRef = useRef(null);
  const lastDecayTimeRef = useRef(Date.now());
  const decayIntervalRef = useRef(null);

  // Save to localStorage whenever stats change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    } catch (error) {
      console.warn("Failed to save pet stats to localStorage:", error);
    }
  }, [stats]);

  // Stat decay system
  useEffect(() => {
    const scheduleNextDecay = () => {
      // Randomize decay interval between 30-60 seconds
      const delay = 30000 + Math.random() * 30000; // 30-60 seconds in milliseconds

      decayIntervalRef.current = setTimeout(() => {
        const now = Date.now();
        const timeElapsed = (now - lastDecayTimeRef.current) / 1000; // Convert to seconds

        setStats((currentStats) => {
          const newStats = calculateDecay(
            currentStats,
            timeElapsed,
            lastActionRef.current
          );
          lastDecayTimeRef.current = now;
          return newStats;
        });

        // Schedule next decay
        scheduleNextDecay();
      }, delay);
    };

    // Initialize decay timer
    lastDecayTimeRef.current = Date.now();
    scheduleNextDecay();

    return () => {
      if (decayIntervalRef.current) {
        clearTimeout(decayIntervalRef.current);
      }
    };
  }, []);

  /**
   * Performs an action on the pet
   * @param {string} action - Action name: 'feed' | 'play' | 'sleep'
   */
  const performAction = useCallback((action) => {
    setStats((currentStats) => {
      const newStats = applyAction(currentStats, action);
      lastActionRef.current = action;
      lastDecayTimeRef.current = Date.now();
      return newStats;
    });
  }, []);

  /**
   * Resets pet stats to default values
   */
  const resetStats = useCallback(() => {
    setStats(DEFAULT_STATS);
    lastActionRef.current = null;
    lastDecayTimeRef.current = Date.now();
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.warn("Failed to clear localStorage:", error);
    }
  }, []);

  return {
    stats,
    performAction,
    resetStats,
  };
}
