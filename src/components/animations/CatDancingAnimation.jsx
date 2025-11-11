import { useSpriteAnimation } from '../../hooks/useSpriteAnimation';
import catDancing from '../../assets/cats/sprites/cat-dancing.png';

// cat-dancing.png: 128px wide / 32px per frame = 4 frames
const FRAME_COUNT = 4;
const GLOW_COLOR = '#00FFF7'; // Cyan

export function CatDancingAnimation({ fps = 3 }) {
  const { spriteStyle } = useSpriteAnimation({
    spriteSheet: catDancing,
    frameCount: FRAME_COUNT,
    fps,
  });

  return (
    <div
      className="sprite-container cat-sprite dancing"
      style={{
        ...spriteStyle,
        filter: `drop-shadow(0 0 10px ${GLOW_COLOR}) drop-shadow(0 0 20px ${GLOW_COLOR}) drop-shadow(0 0 30px ${GLOW_COLOR})`,
        transition: 'filter 0.3s ease-in-out',
      }}
    />
  );
}

