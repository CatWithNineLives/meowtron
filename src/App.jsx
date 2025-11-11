import { useState } from 'react';
import { usePetStats } from './hooks/usePetStats';
import { PetDisplay } from './components/PetDisplay';
import { StatsDisplay } from './components/StatsDisplay';
import { ActionButtons } from './components/ActionButtons';
import { determineMood } from './utils/petLogic';
import './App.css';

export default function App() {
  const { stats, performAction, resetStats } = usePetStats();
  const currentMood = determineMood(stats);
  const [debugMood, setDebugMood] = useState('idle');
  const [currentAction, setCurrentAction] = useState(null);

  // Handle action with temporary animation display
  const handleAction = (action) => {
    performAction(action);
    setCurrentAction(action);

    // Calculate animation duration based on action
    // Increased durations to allow animations to be more visible
    const durations = {
      feed: 2500, // Extended from 1.5s to 2.5s
      play: 1200, // Extended from 0.4s to 1.2s
      sleep: 1200, // Extended from 0.4s to 1.2s
    };

    setTimeout(() => {
      setCurrentAction(null);
    }, durations[action] || 1000);
  };

  const moods = ['idle', 'happy', 'hungry', 'sleepy', 'angry'];

  // Create mock stats for debug display based on selected mood
  const getDebugStats = (mood) => {
    const mockStats = {
      idle: { hunger: 50, happiness: 50, energy: 50 },
      happy: { hunger: 80, happiness: 80, energy: 80 },
      hungry: { hunger: 20, happiness: 50, energy: 50 },
      sleepy: { hunger: 50, happiness: 50, energy: 20 },
      angry: { hunger: 50, happiness: 20, energy: 50 },
    };
    return mockStats[mood] || mockStats.idle;
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Meowtron</h1>
      <div className="game-frame">
        <div className="pet-section">
          <PetDisplay stats={stats} currentAction={currentAction} />
        </div>

        <div className="stats-section">
          <StatsDisplay stats={stats} />
        </div>

        <div className="actions-section">
          <ActionButtons onAction={handleAction} />
        </div>

        <div className="reset-section">
          <button className="reset-button" onClick={resetStats} aria-label="Reset pet">
            🔄 Reset
          </button>
        </div>

        <div className="mood-footnote">
          Mood: <span className="mood-value">{currentMood}</span>
        </div>
      </div>

      <div className="debug-section">
        <div className="debug-header">
          <h3 className="debug-title">Debug Mode</h3>
        </div>

        <div className="debug-controls">
          <label htmlFor="mood-select" className="debug-label">
            Select Mood:
          </label>
          <select
            id="mood-select"
            className="debug-select"
            value={debugMood}
            onChange={(e) => setDebugMood(e.target.value)}
          >
            {moods.map((mood) => (
              <option key={mood} value={mood}>
                {mood.charAt(0).toUpperCase() + mood.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="debug-pet-section">
          <PetDisplay stats={getDebugStats(debugMood)} />
        </div>
      </div>
    </div>
  );
}

