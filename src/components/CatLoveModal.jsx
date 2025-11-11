import './CatLoveModal.css';

/**
 * CatLoveModal component - Modal that appears after clicking the cat 5+ times
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is visible
 * @param {Function} props.onClose - Callback to close the modal
 * @param {Function} props.onYes - Callback when "Yes" is chosen
 * @param {Function} props.onWorship - Callback when "I worship them" is chosen
 */
export function CatLoveModal({ isOpen, onClose, onYes, onWorship }) {
  if (!isOpen) return null;

  const handleYes = () => {
    if (onYes) {
      onYes();
    }
    onClose();
  };

  const handleWorship = () => {
    if (onWorship) {
      onWorship();
    }
    onClose();
  };

  return (
    <div className="cat-love-modal-overlay" onClick={onClose}>
      <div className="cat-love-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cat-love-modal-content">
          <h2 className="cat-love-modal-title">Do you love cats?</h2>
          <div className="cat-love-modal-buttons">
            <button
              className="cat-love-button cat-love-button-yes"
              onClick={handleYes}
            >
              Yes
            </button>
            <button
              className="cat-love-button cat-love-button-worship"
              onClick={handleWorship}
            >
              I worship them
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

