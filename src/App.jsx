import { useState, useEffect } from 'react';
import { usePetStats } from './hooks/usePetStats';
import { PetDisplay } from './components/PetDisplay';
import { StatsDisplay } from './components/StatsDisplay';
import { ActionButtons } from './components/ActionButtons';
import { CatLoveModal } from './components/CatLoveModal';
import { DevTerminalIntro } from './components/DevTerminalIntro';
import { determineMood } from './utils/petLogic';
import './App.css';

const SESSION_STORAGE_KEY = 'meowtron_cat_love_choice';

export default function App() {
  const { stats, performAction, resetStats } = usePetStats();
  const currentMood = determineMood(stats);
  const [debugMood, setDebugMood] = useState('idle');
  const [currentAction, setCurrentAction] = useState(null);
  const [catClickCount, setCatClickCount] = useState(0);
  const [showCatLoveModal, setShowCatLoveModal] = useState(false);
  const [showDevSection, setShowDevSection] = useState(false);
  const [showTerminalIntro, setShowTerminalIntro] = useState(false);
  const [showDevContent, setShowDevContent] = useState(false);

  // Check sessionStorage on mount
  useEffect(() => {
    const savedChoice = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (savedChoice === 'worship') {
      setShowDevSection(true);
      // If already shown before, skip intro
      const introShown = sessionStorage.getItem('meowtron_intro_shown');
      if (introShown === 'true') {
        setShowDevContent(true);
      } else {
        setShowTerminalIntro(true);
      }
    }
  }, []);

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

  // Handle cat sprite clicks
  const handleCatClick = () => {
    const newCount = catClickCount + 1;
    setCatClickCount(newCount);

    // Show modal after more than 5 clicks (6 or more) (only if user hasn't made a choice yet)
    const savedChoice = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (newCount > 5 && !savedChoice) {
      setShowCatLoveModal(true);
      setCatClickCount(0); // Reset count after showing modal
    }
  };

  // Handle "Yes" choice - hide dev section permanently for this session
  const handleYesChoice = () => {
    sessionStorage.setItem(SESSION_STORAGE_KEY, 'yes');
    setShowDevSection(false);
  };

  // Handle "I worship them" choice - show dev section and scroll to it
  const handleWorshipChoice = () => {
    sessionStorage.setItem(SESSION_STORAGE_KEY, 'worship');
    setShowDevSection(true);
    setShowTerminalIntro(true);

    // Scroll to dev section after a brief delay to ensure it's rendered
    setTimeout(() => {
      const devSection = document.getElementById('dev-meowtron-section');
      if (devSection) {
        devSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Handle terminal intro completion
  const handleTerminalIntroComplete = () => {
    setShowTerminalIntro(false);
    setShowDevContent(true);
    sessionStorage.setItem('meowtron_intro_shown', 'true');
  };

  const moods = ['idle', 'happy', 'hungry', 'sleepy', 'angry', 'critical', 'dead'];

  // Create mock stats for debug display based on selected mood
  const getDebugStats = (mood) => {
    const mockStats = {
      idle: { hunger: 50, happiness: 50, energy: 50 },
      happy: { hunger: 80, happiness: 80, energy: 80 },
      hungry: { hunger: 20, happiness: 50, energy: 50 },
      sleepy: { hunger: 50, happiness: 50, energy: 20 },
      angry: { hunger: 50, happiness: 20, energy: 50 },
      critical: { hunger: 15, happiness: 15, energy: 15 },
      dead: { hunger: 0, happiness: 0, energy: 0 },
    };
    return mockStats[mood] || mockStats.idle;
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Meowtron</h1>
      <div className="game-frame">
        <div className="pet-section">
          <PetDisplay stats={stats} currentAction={currentAction} onCatClick={handleCatClick} />
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

        {showDevSection && (
          <div className="mood-footnote">
            Mood: <span className="mood-value">{currentMood}</span>
          </div>
        )}
      </div>

      {showDevSection && (
        <div id="dev-meowtron-section" className="debug-section">
          {showTerminalIntro && (
            <DevTerminalIntro onComplete={handleTerminalIntroComplete} />
          )}

          {showDevContent && (
            <div className="dev-content">
              <div className="debug-header">
                <h3 className="debug-title">/dev/meowtron</h3>
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
          )}
        </div>
      )}

      <CatLoveModal
        isOpen={showCatLoveModal}
        onClose={() => setShowCatLoveModal(false)}
        onYes={handleYesChoice}
        onWorship={handleWorshipChoice}
      />
    </div>
  );
}

