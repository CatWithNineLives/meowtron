import { useState } from 'react';
import catFood from '../assets/cats/action/cat-food.png';
import catSleep from '../assets/cats/action/cat-sleep.png';
import { CatToyAnimation } from './animations/CatToyAnimation';

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
    { id: 'feed', label: 'Feed', image: catFood },
    { id: 'play', label: 'Play', animated: true },
    { id: 'sleep', label: 'Sleep', image: catSleep },
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
          <span className="action-icon">
            {action.animated ? (
              <CatToyAnimation />
            ) : (
              <img
                src={action.image}
                alt={action.label}
                className="action-icon-image"
              />
            )}
          </span>
          <span className="action-label">{action.label}</span>
        </button>
      ))}
    </div>
  );
}

