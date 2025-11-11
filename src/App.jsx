import { usePetStats } from './hooks/usePetStats';
import { PetDisplay } from './components/PetDisplay';
import { StatsDisplay } from './components/StatsDisplay';
import { ActionButtons } from './components/ActionButtons';
import { determineMood } from './utils/petLogic';
import './App.css';

export default function App() {
  const { stats, performAction, resetStats } = usePetStats();
  const currentMood = determineMood(stats);

  return (
    <div className="app-container">
      <h1 className="app-title">Meowtron</h1>
      <div className="game-frame">
        <div className="pet-section">
          <PetDisplay stats={stats} />
        </div>

        <div className="stats-section">
          <StatsDisplay stats={stats} />
        </div>

        <div className="actions-section">
          <ActionButtons onAction={performAction} />
        </div>

        <div className="reset-section">
          <button className="reset-button" onClick={resetStats} aria-label="Reset pet">
            🔄 Reset
          </button>
          <div className="debug-mood" style={{ marginTop: '10px', fontSize: '0.8em', color: '#FF6EC7', textAlign: 'center' }}>
            Mood: {currentMood}
          </div>
        </div>
      </div>
    </div>
  );
}

