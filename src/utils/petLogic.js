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
 * Priority: Dead > Critical > Angry > Hungry > Sleepy > Happy > Idle
 * @param {Object} stats - Pet stats object
 * @param {number} stats.hunger - Hunger stat (0-100)
 * @param {number} stats.happiness - Happiness stat (0-100)
 * @param {number} stats.energy - Energy stat (0-100)
 * @returns {string} Mood name: 'dead' | 'critical' | 'angry' | 'hungry' | 'sleepy' | 'happy' | 'idle'
 */
export function determineMood({ hunger, happiness, energy }) {
  // Priority 1: Dead (if all stats are 0)
  if (hunger === 0 && happiness === 0 && energy === 0) {
    return "dead";
  }

  // Priority 2: Critical (if all stats are very low < 20)
  if (hunger < 20 && happiness < 20 && energy < 20) {
    return "critical";
  }

  // Priority 3: Angry (if Happiness < 30)
  if (happiness < 30) {
    return "angry";
  }

  // Priority 4: Hungry (if Hunger < 30)
  if (hunger < 30) {
    return "hungry";
  }

  // Priority 5: Sleepy (if Energy < 30)
  if (energy < 30) {
    return "sleepy";
  }

  // Priority 6: Happy (if all stats > 70)
  if (hunger > 70 && happiness > 70 && energy > 70) {
    return "happy";
  }

  // Priority 7: Idle (default - balanced stats in 40-70 range)
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

  // Count how many stats are at zero
  const zeroStatsCount =
    (stats.hunger === 0 ? 1 : 0) +
    (stats.happiness === 0 ? 1 : 0) +
    (stats.energy === 0 ? 1 : 0);

  // If any two stats are at zero, the remaining stat decays 5x faster
  const rapidDecayMultiplier = zeroStatsCount >= 2 ? 5.0 : 1.0;

  // Apply rapid decay to the stat(s) that are NOT at zero
  const hungerMultiplier =
    stats.hunger === 0
      ? multipliers.hunger
      : multipliers.hunger * rapidDecayMultiplier;

  const happinessMultiplier =
    stats.happiness === 0
      ? multipliers.happiness
      : multipliers.happiness * rapidDecayMultiplier;

  const energyMultiplier =
    stats.energy === 0
      ? multipliers.energy
      : multipliers.energy * rapidDecayMultiplier;

  return {
    hunger: clamp(
      stats.hunger - baseDecayRate * hungerMultiplier * timeElapsed
    ),
    happiness: clamp(
      stats.happiness - baseDecayRate * happinessMultiplier * timeElapsed
    ),
    energy: clamp(
      stats.energy - baseDecayRate * energyMultiplier * timeElapsed
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
