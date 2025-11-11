import { useSpriteAnimation } from '../../hooks/useSpriteAnimation';
import catIdle from '../../assets/cats/sprites/cat-idle.png';

const IDLE_SPRITE_SHEET = catIdle;
const FRAME_COUNT = 10; // 320px wide / 32px per frame = 10 frames

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

