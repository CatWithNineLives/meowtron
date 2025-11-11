/**
 * Pet logic utilities for mood calculation and stat management
 */

/**
 * Clamps a value between min and max
 * @param {number} value - The value to clamp
 * @param {number} min - Minimum value (default: 0)
 * @param {number} max - Maximum value (default: 100)
 * @returns {number} Clamped value
 */
export function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

/**
 * Determines the cat's mood based on stat levels
 * Priority: Angry > Hungry > Sleepy > Happy > Idle
 * @param {Object} stats - Pet stats object
 * @param {number} stats.hunger - Hunger stat (0-100)
 * @param {number} stats.happiness - Happiness stat (0-100)
 * @param {number} stats.energy - Energy stat (0-100)
 * @returns {string} Mood name: 'angry' | 'hungry' | 'sleepy' | 'happy' | 'idle'
 */
export function determineMood({ hunger, happiness, energy }) {
  // Priority 1: Angry (highest priority - if Happiness < 30)
  if (happiness < 30) {
    return "angry";
  }

  // Priority 2: Hungry (if Hunger < 30)
  if (hunger < 30) {
    return "hungry";
  }

  // Priority 3: Sleepy (if Energy < 30)
  if (energy < 30) {
    return "sleepy";
  }

  // Priority 4: Happy (if all stats > 70)
  if (hunger > 70 && happiness > 70 && energy > 70) {
    return "happy";
  }

  // Priority 5: Idle (default - balanced stats in 40-70 range)
  return "idle";
}

/**
 * Calculates stat decay based on time elapsed and last action
 * @param {Object} stats - Current stats
 * @param {number} timeElapsed - Time elapsed in seconds
 * @param {string} lastAction - Last action performed (affects decay rate)
 * @returns {Object} New stats after decay
 */
export function calculateDecay(stats, timeElapsed, lastAction = null) {
  // Base decay rate per second
  const baseDecayRate = 0.5; // 0.5 points per second

  // Decay rate multipliers based on last action
  const decayMultipliers = {
    feed: { hunger: 0.3, happiness: 1.0, energy: 1.2 }, // Feeding reduces hunger decay
    play: { hunger: 1.2, happiness: 0.3, energy: 1.5 }, // Playing reduces happiness decay but increases others
    sleep: { hunger: 1.2, happiness: 1.0, energy: 0.2 }, // Sleeping reduces energy decay
    default: { hunger: 1.0, happiness: 1.0, energy: 1.0 },
  };

  const multipliers = decayMultipliers[lastAction] || decayMultipliers.default;

  return {
    hunger: clamp(
      stats.hunger - baseDecayRate * multipliers.hunger * timeElapsed
    ),
    happiness: clamp(
      stats.happiness - baseDecayRate * multipliers.happiness * timeElapsed
    ),
    energy: clamp(
      stats.energy - baseDecayRate * multipliers.energy * timeElapsed
    ),
  };
}

/**
 * Applies an action to pet stats
 * @param {Object} stats - Current stats
 * @param {string} action - Action name: 'feed' | 'play' | 'sleep'
 * @returns {Object} New stats after action
 */
export function applyAction(stats, action) {
  const actionEffects = {
    feed: { hunger: +25, happiness: 0, energy: -5 },
    play: { hunger: -5, happiness: +20, energy: -10 },
    sleep: { hunger: -5, happiness: 0, energy: +30 },
  };

  const effects = actionEffects[action] || {
    hunger: 0,
    happiness: 0,
    energy: 0,
  };

  return {
    hunger: clamp(stats.hunger + effects.hunger),
    happiness: clamp(stats.happiness + effects.happiness),
    energy: clamp(stats.energy + effects.energy),
  };
}
