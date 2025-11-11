import { useSpriteAnimation } from '../../hooks/useSpriteAnimation';
import fallbackCat from '../../assets/cats/sprites/cat-idle.png';

// Placeholder: Replace with actual sleepy sprite sheet when available
const SLEEPY_SPRITE_SHEET = fallbackCat;
const FRAME_COUNT = 10; // Using idle sprite sheet (320px wide / 32px per frame = 10 frames)
const GLOW_COLOR = '#B266FF'; // Purple

export function CatSleepyAnimation({ frameCount = FRAME_COUNT, fps = 10 }) {
  const { spriteStyle } = useSpriteAnimation({
    spriteSheet: SLEEPY_SPRITE_SHEET,
    frameCount,
    fps,
  });

  return (
    <div
      className="sprite-container cat-sprite sleepy"
      style={{
        ...spriteStyle,
        filter: `drop-shadow(0 0 10px ${GLOW_COLOR}) drop-shadow(0 0 20px ${GLOW_COLOR}) drop-shadow(0 0 30px ${GLOW_COLOR})`,
        transition: 'filter 0.3s ease-in-out',
      }}
    />
  );
}

