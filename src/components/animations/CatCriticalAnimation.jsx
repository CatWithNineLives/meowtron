import { useMultiSpriteAnimation } from '../../hooks/useMultiSpriteAnimation';
import catCritical from '../../assets/cats/sprites/critical/cat-critical.png';
import catSick from '../../assets/cats/sprites/critical/cat-sick.png';

const GLOW_COLOR = '#FF0000'; // Bright red

// Sprite sheet dimensions (32px per frame):
// cat-critical.png: 160px wide / 32px per frame = 5 frames
// cat-sick.png: 128px wide / 32px per frame = 4 frames
const SPRITE_SHEETS = [catCritical, catSick];
const FRAME_COUNTS = [5, 4];

export function CatCriticalAnimation({ fps = 3 }) {
  const { spriteStyle } = useMultiSpriteAnimation({
    spriteSheets: SPRITE_SHEETS,
    frameCounts: FRAME_COUNTS,
    fps,
    random: true, // Randomly cycle through critical animations
  });

  return (
    <div
      className="sprite-container cat-sprite critical"
      style={{
        ...spriteStyle,
        filter: `drop-shadow(0 0 10px ${GLOW_COLOR}) drop-shadow(0 0 20px ${GLOW_COLOR}) drop-shadow(0 0 30px ${GLOW_COLOR})`,
        transition: 'filter 0.3s ease-in-out',
      }}
    />
  );
}

