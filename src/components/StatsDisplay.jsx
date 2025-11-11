/**
 * StatsDisplay component - Displays pet stats as segmented retro progress bars
 * @param {Object} props
 * @param {Object} props.stats - Pet stats object
 */
export function StatsDisplay({ stats }) {
  const SEGMENT_COUNT = 10; // Number of segments in the bar
  const FILL_COLOR = '#FF6EC7'; // Pink color for filled segments

  const getStatLabel = (statName) => {
    const labels = {
      hunger: 'Hunger',
      happiness: 'Happiness',
      energy: 'Energy',
    };
    return labels[statName] || statName;
  };

  const getStatEmoji = (statName) => {
    const emojis = {
      hunger: '🍣',
      happiness: '💝',
      energy: '⚡',
    };
    return emojis[statName] || '📊';
  };

  const getFilledSegments = (value) => {
    // Calculate how many segments should be filled (0-10)
    return Math.round((value / 100) * SEGMENT_COUNT);
  };

  return (
    <div className="stats-display">
      {Object.entries(stats).map(([statName, value]) => {
        const filledSegments = getFilledSegments(value);

        return (
          <div key={statName} className="stat-bar-container">
            <div className="stat-label">
              <span className="stat-emoji">{getStatEmoji(statName)}</span>
              <span className="stat-name">{getStatLabel(statName)}</span>
              <span className="stat-value">{Math.round(value)}</span>
            </div>
            <div className="stat-bar-wrapper">
              <div className="stat-segments">
                {Array.from({ length: SEGMENT_COUNT }, (_, index) => (
                  <div
                    key={index}
                    className={`stat-segment ${index < filledSegments ? 'filled' : 'empty'}`}
                    style={{
                      backgroundColor: index < filledSegments ? FILL_COLOR : 'transparent',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

