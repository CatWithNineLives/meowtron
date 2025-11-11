import { useState } from 'react';

/**
 * ActionButtons component - Provides Feed, Play, and Sleep actions
 * @param {Object} props
 * @param {Function} props.onAction - Callback when action is performed
 */
export function ActionButtons({ onAction }) {
  const [cooldowns, setCooldowns] = useState({
    feed: false,
    play: false,
    sleep: false,
  });

  const handleAction = (action) => {
    if (cooldowns[action]) return; // Prevent spam clicking

    // Set cooldown
    setCooldowns((prev) => ({ ...prev, [action]: true }));

    // Perform action
    onAction(action);

    // Clear cooldown after 500ms
    setTimeout(() => {
      setCooldowns((prev) => ({ ...prev, [action]: false }));
    }, 500);
  };

  const actions = [
    { id: 'feed', label: 'Feed', emoji: '🍣' },
    { id: 'play', label: 'Play', emoji: '💿' },
    { id: 'sleep', label: 'Sleep', emoji: '🌙' },
  ];

  return (
    <div className="action-buttons">
      {actions.map((action) => (
        <button
          key={action.id}
          className={`action-button ${action.id} ${cooldowns[action.id] ? 'cooldown' : ''}`}
          onClick={() => handleAction(action.id)}
          disabled={cooldowns[action.id]}
          aria-label={action.label}
        >
          <span className="action-emoji">{action.emoji}</span>
          <span className="action-label">{action.label}</span>
        </button>
      ))}
    </div>
  );
}

