import catDead from '../../assets/cats/sprites/critical/cat-dead.png';

const GLOW_COLOR = '#660000'; // Dark red

// cat-dead.png: 32x32 = 1 frame (static image, no animation)
export function CatDeadAnimation() {
  return (
    <div
      className="sprite-container cat-sprite dead"
      style={{
        width: '128px', // 32px * 4 scale
        height: '128px',
        backgroundImage: `url(${catDead})`,
        backgroundSize: '128px 128px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '0 0',
        imageRendering: 'pixelated',
        display: 'inline-block',
        filter: `drop-shadow(0 0 10px ${GLOW_COLOR}) drop-shadow(0 0 20px ${GLOW_COLOR})`,
        transition: 'filter 0.3s ease-in-out',
      }}
    />
  );
}

