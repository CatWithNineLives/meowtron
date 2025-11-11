import { useMultiSpriteAnimation } from '../../hooks/useMultiSpriteAnimation';
import catTired from '../../assets/cats/sprites/sleepy/cat-tired.png';
import catSleepy from '../../assets/cats/sprites/sleepy/cat-sleepy.png';

const GLOW_COLOR = '#B266FF'; // Purple

// Sprite sheet dimensions:
// cat-sleepy.png: 256px wide / 32px per frame = 8 frames
// cat-tired.png: 384px wide / 32px per frame = 12 frames
// Order: Start with sleepy, then tired, then back to sleepy
const SPRITE_SHEETS = [catSleepy, catTired];
const FRAME_COUNTS = [8, 12];

export function CatSleepyAnimation({ fps = 3 }) {
  const { spriteStyle } = useMultiSpriteAnimation({
    spriteSheets: SPRITE_SHEETS,
    frameCounts: FRAME_COUNTS,
    fps,
    random: false, // Cycle sequentially between sleepy and tired
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

