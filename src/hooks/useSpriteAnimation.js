import { useState, useEffect, useRef } from "react";

/**
 * Custom hook for sprite sheet animation
 * @param {Object} options - Animation options
 * @param {string} options.spriteSheet - Path to sprite sheet image
 * @param {number} options.frameCount - Number of frames in sprite sheet
 * @param {number} options.fps - Frames per second (default: 10)
 * @param {number} [options.frameWidth] - Optional frame width (auto-calculated if not provided)
 * @returns {Object} Animation state and style
 */
export function useSpriteAnimation({
  spriteSheet,
  frameCount,
  fps = 10,
  frameWidth = null,
}) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [spriteSheetWidth, setSpriteSheetWidth] = useState(0);
  const frameIntervalRef = useRef(null);

  // Load sprite sheet to get dimensions
  useEffect(() => {
    const img = new Image();
    img.src = spriteSheet;
    img.onload = () => {
      setSpriteSheetWidth(img.width);
    };
    img.onerror = () => {
      console.warn("Failed to load sprite sheet:", spriteSheet);
    };
  }, [spriteSheet]);

  // Animation loop
  useEffect(() => {
    if (frameCount <= 0) return;

    const frameDelay = 1000 / fps; // milliseconds per frame

    frameIntervalRef.current = setInterval(() => {
      setCurrentFrame((prevFrame) => (prevFrame + 1) % frameCount);
    }, frameDelay);

    return () => {
      if (frameIntervalRef.current) {
        clearInterval(frameIntervalRef.current);
      }
    };
  }, [frameCount, fps]);

  // Calculate frame width
  const calculatedFrameWidth =
    frameWidth || (spriteSheetWidth > 0 ? spriteSheetWidth / frameCount : 180);

  // Generate sprite style
  const spriteStyle = {
    width: calculatedFrameWidth > 0 ? `${calculatedFrameWidth}px` : "180px",
    height: "auto",
    backgroundImage: `url(${spriteSheet})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition:
      calculatedFrameWidth > 0
        ? `-${currentFrame * calculatedFrameWidth}px 0`
        : "0 0",
    imageRendering: "pixelated",
  };

  return {
    currentFrame,
    spriteStyle,
    frameWidth: calculatedFrameWidth,
  };
}
