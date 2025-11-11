import { useState, useEffect, useRef } from "react";

/**
 * Custom hook for cycling through multiple sprite sheets
 * @param {Object} options - Animation options
 * @param {Array<string>} options.spriteSheets - Array of sprite sheet paths
 * @param {Array<number>} options.frameCounts - Array of frame counts for each sprite sheet
 * @param {number} options.fps - Frames per second (default: 10)
 * @param {boolean} options.random - If true, randomly switch between sheets instead of cycling (default: false)
 * @returns {Object} Animation state and style
 */
export function useMultiSpriteAnimation({
  spriteSheets,
  frameCounts,
  fps = 10,
  random = false,
}) {
  const [currentSheetIndex, setCurrentSheetIndex] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [spriteSheetWidth, setSpriteSheetWidth] = useState(0);
  const [spriteSheetHeight, setSpriteSheetHeight] = useState(0);
  const frameIntervalRef = useRef(null);
  const currentSpriteSheet = spriteSheets[currentSheetIndex];
  const currentFrameCount = frameCounts[currentSheetIndex];

  // Load current sprite sheet to get dimensions
  useEffect(() => {
    const img = new Image();
    img.src = currentSpriteSheet;
    img.onload = () => {
      setSpriteSheetWidth(img.width);
      setSpriteSheetHeight(img.height);
    };
    img.onerror = () => {
      console.warn("Failed to load sprite sheet:", currentSpriteSheet);
    };
  }, [currentSpriteSheet]);

  // Animation loop
  useEffect(() => {
    if (currentFrameCount <= 0) return;

    // Reset frame when sheet changes
    setCurrentFrame(0);

    const frameDelay = 1000 / fps; // milliseconds per frame

    frameIntervalRef.current = setInterval(() => {
      setCurrentFrame((prevFrame) => {
        const nextFrame = prevFrame + 1;
        const frameCount = frameCounts[currentSheetIndex];

        // If we've completed all frames in current sheet, switch to next sheet
        if (nextFrame >= frameCount) {
          setCurrentSheetIndex((prevIndex) => {
            if (random) {
              // Randomly select a different sheet
              let newIndex;
              do {
                newIndex = Math.floor(Math.random() * spriteSheets.length);
              } while (newIndex === prevIndex && spriteSheets.length > 1);
              return newIndex;
            } else {
              // Cycle through sheets sequentially
              return (prevIndex + 1) % spriteSheets.length;
            }
          });
          return 0; // Start from first frame of next sheet
        }

        return nextFrame;
      });
    }, frameDelay);

    return () => {
      if (frameIntervalRef.current) {
        clearInterval(frameIntervalRef.current);
      }
    };
  }, [currentSheetIndex, fps, spriteSheets.length, frameCounts, random]);

  // Calculate frame width
  const calculatedFrameWidth =
    spriteSheetWidth > 0 ? spriteSheetWidth / currentFrameCount : 32;

  // Scale factor for better visibility (4x for 32px sprites)
  const scale = 4;
  const scaledFrameWidth = calculatedFrameWidth * scale;
  const scaledSpriteSheetWidth = spriteSheetWidth * scale;
  const scaledSpriteSheetHeight = spriteSheetHeight * scale;

  // Generate sprite style
  const spriteStyle = {
    width: scaledFrameWidth > 0 ? `${scaledFrameWidth}px` : "128px",
    height:
      scaledSpriteSheetHeight > 0 ? `${scaledSpriteSheetHeight}px` : "128px",
    backgroundImage: `url(${currentSpriteSheet})`,
    backgroundSize:
      scaledSpriteSheetWidth > 0
        ? `${scaledSpriteSheetWidth}px ${scaledSpriteSheetHeight}px`
        : "auto",
    backgroundRepeat: "no-repeat",
    backgroundPosition:
      calculatedFrameWidth > 0
        ? `-${currentFrame * scaledFrameWidth}px 0`
        : "0 0",
    imageRendering: "pixelated",
    display: "inline-block",
  };

  return {
    currentFrame,
    spriteStyle,
    frameWidth: calculatedFrameWidth,
  };
}
