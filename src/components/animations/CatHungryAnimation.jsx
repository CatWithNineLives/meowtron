import { useMultiSpriteAnimation } from '../../hooks/useMultiSpriteAnimation';
import catCrying from '../../assets/cats/sprites/sad/cat-crying.png';
import catSad from '../../assets/cats/sprites/sad/cat-sad.png';

const GLOW_COLOR = '#FF6EC7'; // Pink

// Sprite sheet dimensions (32px per frame):
// cat-crying.png: 128px wide / 32px per frame = 4 frames
// cat-sad.png: 288px wide / 32px per frame = 9 frames
const SPRITE_SHEETS = [catCrying, catSad];
const FRAME_COUNTS = [4, 9];

export function CatHungryAnimation({ fps = 3 }) {
  const { spriteStyle } = useMultiSpriteAnimation({
    spriteSheets: SPRITE_SHEETS,
    frameCounts: FRAME_COUNTS,
    fps,
    random: true, // Randomly cycle through hungry/sad animations
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

