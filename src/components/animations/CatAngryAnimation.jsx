import { useSpriteAnimation } from '../../hooks/useSpriteAnimation';
import catSick from '../../assets/cats/sprites/critical/cat-sick.png';

const GLOW_COLOR = '#FF4D4D'; // Red

// Sprite sheet dimensions (32px per frame):
// cat-sick.png: 128px wide / 32px per frame = 4 frames
const ANGRY_SPRITE_SHEET = catSick;
const FRAME_COUNT = 4; // 128px wide / 32px per frame = 4 frames

export function CatAngryAnimation({ fps = 3 }) {
  const { spriteStyle } = useSpriteAnimation({
    spriteSheet: ANGRY_SPRITE_SHEET,
    frameCount: FRAME_COUNT,
    fps,
  });

  return (
    <div
      className="sprite-container cat-sprite angry"
      style={{
        ...spriteStyle,
        filter: `drop-shadow(0 0 10px ${GLOW_COLOR}) drop-shadow(0 0 20px ${GLOW_COLOR}) drop-shadow(0 0 30px ${GLOW_COLOR})`,
        transition: 'filter 0.3s ease-in-out',
      }}
    />
  );
}

