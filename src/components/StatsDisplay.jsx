/**
 * StatsDisplay component - Displays pet stats as progress bars
 * @param {Object} props
 * @param {Object} props.stats - Pet stats object
 */
export function StatsDisplay({ stats }) {
  const getStatColor = (value) => {
    if (value >= 70) return '#00FF7F'; // Green
    if (value >= 40) return '#FFD700'; // Yellow
    return '#FF6B6B'; // Red
  };

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

  return (
    <div className="stats-display">
      {Object.entries(stats).map(([statName, value]) => (
        <div key={statName} className="stat-bar-container">
          <div className="stat-label">
            <span className="stat-emoji">{getStatEmoji(statName)}</span>
            <span className="stat-name">{getStatLabel(statName)}</span>
            <span className="stat-value">{Math.round(value)}</span>
          </div>
          <div className="stat-bar-wrapper">
            <div
              className="stat-bar"
              style={{
                width: `${value}%`,
                backgroundColor: getStatColor(value),
                transition: 'width 0.3s ease, background-color 0.3s ease',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

