import { useState, useEffect } from 'react';
import './DevTerminalIntro.css';

/**
 * DevTerminalIntro component - Terminal-style intro sequence for /dev/meowtron
 * @param {Object} props
 * @param {Function} props.onComplete - Callback when intro sequence completes
 */
const TERMINAL_LINES = [
  '> Accessing /dev/meowtron...',
  '> Authentication: meow_pass_accepted',
  'Welcome, Human. Developer Access Granted.',
];

export function DevTerminalIntro({ onComplete }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (currentLine >= TERMINAL_LINES.length) {
      // All lines displayed, wait a bit then call onComplete
      const timer = setTimeout(() => {
        if (onComplete) {
          onComplete();
        }
      }, 800);
      return () => clearTimeout(timer);
    }

    const currentLineText = TERMINAL_LINES[currentLine];
    let charIndex = 0;

    // Type out current line character by character
    const typingInterval = setInterval(() => {
      if (charIndex <= currentLineText.length) {
        setDisplayedText(currentLineText.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        // Move to next line after a short delay
        setTimeout(() => {
          setCurrentLine((prev) => prev + 1);
          setDisplayedText('');
        }, 500);
      }
    }, 50); // Typing speed: 50ms per character

    return () => clearInterval(typingInterval);
  }, [currentLine, onComplete]);

  return (
    <div className="dev-terminal-intro">
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="terminal-buttons">
            <span className="terminal-button terminal-button-close"></span>
            <span className="terminal-button terminal-button-minimize"></span>
            <span className="terminal-button terminal-button-maximize"></span>
          </div>
          <div className="terminal-title">/dev/meowtron</div>
        </div>
        <div className="terminal-body">
          {TERMINAL_LINES.slice(0, currentLine).map((line, index) => (
            <div key={index} className="terminal-line">
              {line}
            </div>
          ))}
          {currentLine < TERMINAL_LINES.length && (
            <div className="terminal-line">
              {displayedText}
              <span className="terminal-cursor">▊</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

