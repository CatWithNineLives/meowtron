import { useState, useEffect, useRef } from 'react';
import catToy from '../../assets/cats/action/cat-toy.png';

// cat-toy.png: 192px wide / 32px per frame = 6 frames
const TOY_SPRITE_SHEET = catToy;
const FRAME_COUNT = 6;

export function CatToyAnimation({ fps = 3 }) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [spriteSheetWidth, setSpriteSheetWidth] = useState(0);
  const [spriteSheetHeight, setSpriteSheetHeight] = useState(0);
  const frameIntervalRef = useRef(null);

  // Load sprite sheet to get dimensions
  useEffect(() => {
    const img = new Image();
    img.src = TOY_SPRITE_SHEET;
    img.onload = () => {
      setSpriteSheetWidth(img.width);
      setSpriteSheetHeight(img.height);
    };
    img.onerror = () => {
      console.warn('Failed to load sprite sheet:', TOY_SPRITE_SHEET);
    };
  }, []);

  // Animation loop
  useEffect(() => {
    if (FRAME_COUNT <= 0) return;

    const frameDelay = 1000 / fps; // milliseconds per frame

    frameIntervalRef.current = setInterval(() => {
      setCurrentFrame((prevFrame) => (prevFrame + 1) % FRAME_COUNT);
    }, frameDelay);

    return () => {
      if (frameIntervalRef.current) {
        clearInterval(frameIntervalRef.current);
      }
    };
  }, [fps]);

  // Calculate frame width (32px per frame)
  const frameWidth = spriteSheetWidth > 0 ? spriteSheetWidth / FRAME_COUNT : 32;

  // Style for 32px display (no scaling)
  const spriteStyle = {
    width: '32px',
    height: '32px',
    backgroundImage: `url(${TOY_SPRITE_SHEET})`,
    backgroundSize: spriteSheetWidth > 0 ? `${spriteSheetWidth}px ${spriteSheetHeight}px` : 'auto',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: frameWidth > 0 ? `-${currentFrame * frameWidth}px 0` : '0 0',
    imageRendering: 'pixelated',
    display: 'inline-block',
  };

  return <div className="action-icon-toy" style={spriteStyle} />;
}

