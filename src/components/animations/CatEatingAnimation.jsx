import { useSpriteAnimation } from '../../hooks/useSpriteAnimation';
import catEating from '../../assets/cats/sprites/cat-eating.png';

// cat-eating.png: 480px wide / 32px per frame = 15 frames
const FRAME_COUNT = 15;
const GLOW_COLOR = '#FF6EC7'; // Pink

export function CatEatingAnimation({ fps = 10 }) {
  const { spriteStyle } = useSpriteAnimation({
    spriteSheet: catEating,
    frameCount: FRAME_COUNT,
    fps,
  });

  return (
    <div
      className="sprite-container cat-sprite eating"
      style={{
        ...spriteStyle,
        filter: `drop-shadow(0 0 10px ${GLOW_COLOR}) drop-shadow(0 0 20px ${GLOW_COLOR}) drop-shadow(0 0 30px ${GLOW_COLOR})`,
        transition: 'filter 0.3s ease-in-out',
      }}
    />
  );
}

