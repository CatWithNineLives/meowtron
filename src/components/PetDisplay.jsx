import { determineMood } from '../utils/petLogic';
import { CatIdleAnimation } from './animations/CatIdleAnimation';
import { CatHappyAnimation } from './animations/CatHappyAnimation';
import { CatHungryAnimation } from './animations/CatHungryAnimation';
import { CatSleepyAnimation } from './animations/CatSleepyAnimation';
import { CatAngryAnimation } from './animations/CatAngryAnimation';

/**
 * PetDisplay component - Renders the appropriate cat animation based on mood
 * @param {Object} props
 * @param {Object} props.stats - Pet stats object
 */
export function PetDisplay({ stats }) {
  const mood = determineMood(stats);

  // Render appropriate animation component based on mood
  switch (mood) {
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
}

