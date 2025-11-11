import { useSpriteAnimation } from '../../hooks/useSpriteAnimation';
import catSleeping from '../../assets/cats/sprites/cat-sleeping.png';

// cat-sleeping.png: 128px wide / 32px per frame = 4 frames
const FRAME_COUNT = 4;
const GLOW_COLOR = '#B266FF'; // Purple

export function CatSleepingAnimation({ fps = 10 }) {
  const { spriteStyle } = useSpriteAnimation({
    spriteSheet: catSleeping,
    frameCount: FRAME_COUNT,
    fps,
  });

  return (
    <div
      className="sprite-container cat-sprite sleeping"
      style={{
        ...spriteStyle,
        filter: `drop-shadow(0 0 10px ${GLOW_COLOR}) drop-shadow(0 0 20px ${GLOW_COLOR}) drop-shadow(0 0 30px ${GLOW_COLOR})`,
        transition: 'filter 0.3s ease-in-out',
      }}
    />
  );
}

