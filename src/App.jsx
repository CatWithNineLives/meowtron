import { usePetStats } from './hooks/usePetStats';
import { PetDisplay } from './components/PetDisplay';
import { StatsDisplay } from './components/StatsDisplay';
import { ActionButtons } from './components/ActionButtons';
import './App.css';

export default function App() {
  const { stats, performAction, resetStats } = usePetStats();

  return (
    <div className="app-container">
      <div className="meowtron-header">
        <h1 className="app-title">Meowtron</h1>
        <button className="reset-button" onClick={resetStats} aria-label="Reset pet">
          🔄 Reset
        </button>
      </div>

      <div className="pet-section">
        <PetDisplay stats={stats} />
      </div>

      <div className="stats-section">
        <StatsDisplay stats={stats} />
      </div>

      <div className="actions-section">
        <ActionButtons onAction={performAction} />
      </div>
    </div>
  );
}

