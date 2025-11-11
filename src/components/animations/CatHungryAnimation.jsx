import { useSpriteAnimation } from '../../hooks/useSpriteAnimation';
import fallbackCat from '../../assets/cats/sprites/cat-idle.png';

// Placeholder: Replace with actual hungry sprite sheet when available
const HUNGRY_SPRITE_SHEET = fallbackCat;
const FRAME_COUNT = 10; // Using idle sprite sheet (320px wide / 32px per frame = 10 frames)
const GLOW_COLOR = '#FF6EC7'; // Pink

export function CatHungryAnimation({ frameCount = FRAME_COUNT, fps = 10 }) {
  const { spriteStyle } = useSpriteAnimation({
    spriteSheet: HUNGRY_SPRITE_SHEET,
    frameCount,
    fps,
  });

  return (
    <div
      className="sprite-container cat-sprite hungry"
      style={{
        ...spriteStyle,
        filter: `drop-shadow(0 0 10px ${GLOW_COLOR}) drop-shadow(0 0 20px ${GLOW_COLOR}) drop-shadow(0 0 30px ${GLOW_COLOR})`,
        transition: 'filter 0.3s ease-in-out',
      }}
    />
  );
}

