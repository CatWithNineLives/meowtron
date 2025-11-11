import { useSpriteAnimation } from '../../hooks/useSpriteAnimation';
import fallbackCat from '../../assets/meowtron-coming-soon.png';

// Placeholder: Replace with actual idle sprite sheet when available
const IDLE_SPRITE_SHEET = fallbackCat;
const FRAME_COUNT = 1; // Will be updated when sprite sheet is available

export function CatIdleAnimation({ frameCount = FRAME_COUNT, fps = 10 }) {
  const { spriteStyle } = useSpriteAnimation({
    spriteSheet: IDLE_SPRITE_SHEET,
    frameCount,
    fps,
  });

  return (
    <div
      className="sprite-container cat-sprite idle"
      style={{
        ...spriteStyle,
        filter: 'none', // No glow for idle
        transition: 'filter 0.3s ease-in-out',
      }}
    />
  );
}

