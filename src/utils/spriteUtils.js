/**
 * Sprite sheet utility functions for frame calculation
 */

/**
 * Calculates frame width from sprite sheet dimensions
 * @param {number} spriteSheetWidth - Total width of sprite sheet
 * @param {number} frameCount - Number of frames in sprite sheet
 * @returns {number} Width of a single frame
 */
export function calculateFrameWidth(spriteSheetWidth, frameCount) {
  return spriteSheetWidth / frameCount;
}

/**
 * Calculates background position for a specific frame
 * @param {number} frameIndex - Current frame index (0-based)
 * @param {number} frameWidth - Width of a single frame
 * @returns {string} CSS background-position value
 */
export function getBackgroundPosition(frameIndex, frameWidth) {
  return `-${frameIndex * frameWidth}px 0`;
}

/**
 * Gets glow filter CSS for a mood
 * @param {string} mood - Mood name
 * @returns {string} CSS filter value for glow effect
 */
export function getMoodGlow(mood) {
  const glowColors = {
    happy: "#00FFF7", // Cyan
    hungry: "#FF6EC7", // Pink
    sleepy: "#B266FF", // Purple
    angry: "#FF4D4D", // Red
    idle: null, // No glow
  };

  const color = glowColors[mood];
  if (!color) {
    return "none";
  }

  return `drop-shadow(0 0 10px ${color}) drop-shadow(0 0 20px ${color}) drop-shadow(0 0 30px ${color})`;
}
