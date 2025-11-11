import { useState, useEffect, useCallback } from 'react';
import { usePetStats } from './hooks/usePetStats';
import { usePetSounds } from './hooks/usePetSounds';
import { useDevSounds } from './hooks/useDevSounds';
import { PetDisplay } from './components/PetDisplay';
import { StatsDisplay } from './components/StatsDisplay';
import { ActionButtons } from './components/ActionButtons';
import { CatLoveModal } from './components/CatLoveModal';
import { DevTerminalIntro } from './components/DevTerminalIntro';
import { determineMood } from './utils/petLogic';
import './App.css';

const SESSION_STORAGE_KEY = 'meowtron_cat_love_choice';
const SOUND_PREFERENCE_KEY = 'meowtron_sound_enabled';
const DEV_SOUND_PREFERENCE_KEY = 'meowtron_dev_sound_enabled';

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
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [devSoundEnabled, setDevSoundEnabled] = useState(true);

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

    // Load sound preference
    const savedSoundPreference = localStorage.getItem(SOUND_PREFERENCE_KEY);
    if (savedSoundPreference !== null) {
      setSoundEnabled(savedSoundPreference === 'true');
    }

    // Load dev sound preference
    const savedDevSoundPreference = localStorage.getItem(DEV_SOUND_PREFERENCE_KEY);
    if (savedDevSoundPreference !== null) {
      setDevSoundEnabled(savedDevSoundPreference === 'true');
    }
  }, []);

  // Play sounds based on mood
  usePetSounds(currentMood, soundEnabled);

  // Play dev mode sounds
  useDevSounds(showDevContent, devSoundEnabled);

  // Toggle sound
  const toggleSound = () => {
    const newSoundState = !soundEnabled;
    setSoundEnabled(newSoundState);
    localStorage.setItem(SOUND_PREFERENCE_KEY, newSoundState.toString());
  };

  // Toggle dev sound
  const toggleDevSound = () => {
    const newDevSoundState = !devSoundEnabled;
    setDevSoundEnabled(newDevSoundState);
    localStorage.setItem(DEV_SOUND_PREFERENCE_KEY, newDevSoundState.toString());
  };

  // Handle action with temporary animation display
  const handleAction = useCallback((action) => {
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
  }, [performAction]);

  // Keyboard shortcuts: F = Feed, P = Play, S = Sleep
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Don't trigger if user is typing in an input field
      if (
        event.target.tagName === 'INPUT' ||
        event.target.tagName === 'TEXTAREA' ||
        event.target.isContentEditable
      ) {
        return;
      }

      // Check for keyboard shortcuts (case-insensitive)
      const key = event.key.toLowerCase();

      switch (key) {
        case 'f':
          event.preventDefault();
          handleAction('feed');
          break;
        case 'p':
          event.preventDefault();
          handleAction('play');
          break;
        case 's':
          event.preventDefault();
          handleAction('sleep');
          break;
        default:
          break;
      }
    };

    // Add event listener
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleAction]);

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
        <button
          className="sound-toggle-button"
          onClick={toggleSound}
          aria-label={soundEnabled ? 'Mute sound' : 'Unmute sound'}
          title={soundEnabled ? 'Mute sound' : 'Unmute sound'}
        >
          {soundEnabled ? '🔊' : '🔇'}
        </button>
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
              <button
                className="dev-sound-toggle-button"
                onClick={toggleDevSound}
                aria-label={devSoundEnabled ? 'Mute dev sound' : 'Unmute dev sound'}
                title={devSoundEnabled ? 'Mute dev sound' : 'Unmute dev sound'}
              >
                {devSoundEnabled ? '🔊' : '🔇'}
              </button>
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

