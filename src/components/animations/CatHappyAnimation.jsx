import { useMultiSpriteAnimation } from '../../hooks/useMultiSpriteAnimation';
import catExcited from '../../assets/cats/sprites/happy/cat-excited.png';
import catPlaying from '../../assets/cats/sprites/happy/cat-playing.png';
import catSurprised from '../../assets/cats/sprites/happy/cat-surprised.png';

const GLOW_COLOR = '#00FFF7'; // Cyan

// Sprite sheet dimensions (384px = 12 frames, 128px = 4 frames, 32px per frame):
// cat-excited.png: 384px wide / 32px per frame = 12 frames
// cat-playing.png: 128px wide / 32px per frame = 4 frames
// cat-surprised.png: 384px wide / 32px per frame = 12 frames
const SPRITE_SHEETS = [catExcited, catPlaying, catSurprised];
const FRAME_COUNTS = [12, 4, 12];

export function CatHappyAnimation({ fps = 10 }) {
  const { spriteStyle } = useMultiSpriteAnimation({
    spriteSheets: SPRITE_SHEETS,
    frameCounts: FRAME_COUNTS,
    fps,
    random: true, // Randomly cycle through happy animations
  });

  return (
    <div
      className="sprite-container cat-sprite happy"
      style={{
        ...spriteStyle,
        filter: `drop-shadow(0 0 10px ${GLOW_COLOR}) drop-shadow(0 0 20px ${GLOW_COLOR}) drop-shadow(0 0 30px ${GLOW_COLOR})`,
        transition: 'filter 0.3s ease-in-out',
      }}
    />
  );
}

