import { useState, useEffect } from 'react';
import { determineMood } from '../utils/petLogic';
import { CatIdleAnimation } from './animations/CatIdleAnimation';
import { CatHappyAnimation } from './animations/CatHappyAnimation';
import { CatHungryAnimation } from './animations/CatHungryAnimation';
import { CatSleepyAnimation } from './animations/CatSleepyAnimation';
import { CatAngryAnimation } from './animations/CatAngryAnimation';
import { CatCriticalAnimation } from './animations/CatCriticalAnimation';
import { CatDeadAnimation } from './animations/CatDeadAnimation';
import { CatEatingAnimation } from './animations/CatEatingAnimation';
import { CatDancingAnimation } from './animations/CatDancingAnimation';
import { CatSleepingAnimation } from './animations/CatSleepingAnimation';

/**
 * PetDisplay component - Renders the appropriate cat animation based on mood
 * Shows action animations temporarily when an action is performed
 * @param {Object} props
 * @param {Object} props.stats - Pet stats object
 * @param {string} [props.currentAction] - Current action being performed (feed, play, sleep)
 * @param {Function} [props.onCatClick] - Callback when cat sprite is clicked
 */
export function PetDisplay({ stats, currentAction = null, onCatClick }) {
  const mood = determineMood(stats);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayAction, setDisplayAction] = useState(currentAction);

  // Handle smooth transition when action changes
  useEffect(() => {
    if (currentAction) {
      // New action started - show it immediately
      setIsTransitioning(false);
      setDisplayAction(currentAction);
    } else if (displayAction && !currentAction) {
      // Action ended - start fade-out transition
      setIsTransitioning(true);
      // After fade-out, switch to mood animation
      const transitionTimer = setTimeout(() => {
        setDisplayAction(null);
        setIsTransitioning(false);
      }, 300); // Fade-out duration
      return () => clearTimeout(transitionTimer);
    } else if (!displayAction && !currentAction) {
      // No action, ensure mood is visible
      setIsTransitioning(false);
    }
  }, [currentAction, displayAction]);

  // Render action animation
  const renderActionAnimation = () => {
    if (!displayAction) return null;

    switch (displayAction) {
      case 'feed':
        return <CatEatingAnimation />;
      case 'play':
        return <CatDancingAnimation />;
      case 'sleep':
        return <CatSleepingAnimation />;
      default:
        return null;
    }
  };

  // Render mood animation
  const renderMoodAnimation = () => {
    switch (mood) {
      case 'dead':
        return <CatDeadAnimation />;
      case 'critical':
        return <CatCriticalAnimation />;
      case 'happy':
        return <CatHappyAnimation />;
      case 'hungry':
        return <CatHungryAnimation />;
      case 'sleepy':
        return <CatSleepyAnimation />;
      case 'angry':
        return <CatAngryAnimation />;
      case 'idle':
      default:
        return <CatIdleAnimation />;
    }
  };

  const actionAnim = renderActionAnimation();
  const moodAnim = renderMoodAnimation();

  const handleCatClick = () => {
    if (onCatClick) {
      onCatClick();
    }
  };

  return (
    <div className="pet-display-wrapper" onClick={handleCatClick} style={{ cursor: 'pointer' }}>
      {actionAnim && (
        <div
          className={`action-animation-container ${isTransitioning ? 'fade-out' : 'fade-in'}`}
        >
          {actionAnim}
        </div>
      )}
      <div
        className={`mood-animation-container ${displayAction && !isTransitioning ? '' : 'fade-in'}`}
      >
        {moodAnim}
      </div>
    </div>
  );
}

