# 🐱 Meowtron

A virtual pet (tamagotchi) web application built with React. Care for your digital cat by managing its hunger, happiness, and energy stats!
Available on https://meowtron.catwithninelives.dev/

## Features

- **Virtual Pet**: Interactive cat that responds to your care
- **Stat Management**: Three core stats (Hunger, Happiness, Energy) that decay over time
- **Mood System**: Cat's appearance and glow effects change based on stat levels
- **Actions**: Feed, Play, and Sleep to maintain your pet's well-being
- **Persistence**: Stats are saved to localStorage between sessions
- **Responsive Design**: Works on both desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
# or
yarn install
```

### Development

```bash
# Start development server
npm run dev
# or
yarn dev
```

### Build

```bash
# Build for production
npm run build
# or
yarn build

# Preview production build
npm run preview
# or
yarn preview
```

### Linting

```bash
# Run ESLint
npm run lint
# or
yarn lint
```

## Project Structure

```
src/
├── App.jsx                 # Main app component
├── components/
│   ├── PetDisplay.jsx      # Renders cat animation based on mood
│   ├── StatsDisplay.jsx    # Displays stat bars
│   ├── ActionButtons.jsx   # Feed, Play, Sleep buttons
│   └── animations/         # Animation components for each mood
├── hooks/
│   ├── usePetStats.js      # Pet stat management hook
│   └── useSpriteAnimation.js # Sprite animation hook
├── utils/
│   ├── petLogic.js         # Mood calculation and stat logic
│   └── spriteUtils.js      # Sprite sheet utilities
└── assets/
    └── cats/
        └── sprites/        # Sprite sheet images (to be added)
```

## Adding Sprite Sheets

To add sprite sheet animations, place sprite sheets in `src/assets/cats/sprites/`:

- `idle.png` - Idle state (10 frames recommended)
- `happy.png` - Happy state (8-10 frames)
- `hungry.png` - Hungry state (8-10 frames)
- `sleepy.png` - Sleepy state (8-10 frames)
- `angry.png` - Angry state (8-10 frames)

Each sprite sheet should be a horizontal strip of frames. Update the `FRAME_COUNT` constant in each animation component to match your sprite sheet.

## Game Mechanics

### Stats

- **Hunger** (0-100): Decreases over time. Feed your cat to increase it.
- **Happiness** (0-100): Decreases over time. Play with your cat to increase it.
- **Energy** (0-100): Decreases over time. Let your cat sleep to restore it.

### Actions

- **Feed** 🍣: +25 Hunger, -5 Energy
- **Play** 💿: +20 Happiness, -10 Energy, -5 Hunger
- **Sleep** 🌙: +30 Energy, -5 Hunger

### Moods

The cat's mood is determined by stat levels:

- **Happy**: All stats > 70 (Cyan glow)
- **Hungry**: Hunger < 30 (Pink glow)
- **Sleepy**: Energy < 30 (Purple glow)
- **Angry**: Happiness < 30 (Red glow)
- **Idle**: Default balanced state (No glow)

## Technology Stack

- React 19+
- Vite
- ESLint
- Modern JavaScript (ES modules)

## License

MIT
