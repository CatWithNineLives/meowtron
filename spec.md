# Meowtron - Tamagotchi Cat App Plan

## Overview

Meowtron is a virtual pet (tamagotchi) web application built with React. Players care for a digital cat by managing its stats through various actions. The cat displays different moods based on its current stat levels.

## Core Features

### Virtual Pet

- **Pet Type**: Cat (Meowtron)
- **Visual Representation**: Cat images for different moods/states
- **Mood System**: Cat's appearance changes based on stat levels

### Stats System

Three core stats, each ranging from 0-100:

1. **Hunger** (0-100)

- Represents the cat's need for food
- Lower values indicate hunger

2. **Happiness** (0-100)

- Represents the cat's emotional well-being
- Lower values indicate unhappiness

3. **Energy** (0-100)

- Represents the cat's vitality and activity level
- Lower values indicate tiredness

### Stat Decay

- Stats automatically decay over time
- Decay interval: Every 30-60 seconds (randomized per decay cycle)
- Decay rate varies based on the last action performed
- Stats cannot go below 0 or above 100

### Actions

Players can perform three actions that affect stats:

1. **Feed** 🍣

- +25 Hunger
- -5 Energy
- Cooldown: Prevents spam clicking

2. **Play** 💿

- +20 Happiness
- -10 Energy
- -5 Hunger
- Cooldown: Prevents spam clicking

3. **Sleep** 🌙

- +30 Energy
- -5 Hunger
- Cooldown: Prevents spam clicking

## Technical Architecture

### Component Structure

```
App
├── PetDisplay (renders appropriate animation component based on mood)
│   ├── CatIdleAnimation (sprite sheet animation, no glow)
│   ├── CatHappyAnimation (sprite sheet animation, cyan glow #00FFF7)
│   ├── CatHungryAnimation (sprite sheet animation, pink glow #FF6EC7)
│   ├── CatSleepyAnimation (sprite sheet animation, purple glow #B266FF)
│   └── CatAngryAnimation (sprite sheet animation, red glow #FF4D4D)
├── StatsDisplay (Hunger, Happiness, Energy bars)
└── ActionButtons (Feed, Play, Sleep)
```

### State Management

- Use React `useState` for pet stats
- Use `useEffect` for stat decay timer
- Store stats in state: `{ hunger, happiness, energy }`
- Track last action timestamp for decay rate calculation
- Persist state to localStorage for continuity between sessions

### Mood Determination

Cat mood/images determined by stat levels:

- **Happy**: All stats > 70
- **Hungry**: Hunger < 30
- **Sleepy**: Energy < 30
- **Angry**: Happiness < 30 or multiple low stats
- **Idle/Content**: Default state when stats are balanced (40-70 range)

### Implementation Details

#### Stat Decay Logic

```javascript
// Pseudo-code
- Set interval: 30-60 seconds (randomized)
- On each decay cycle:
 - Calculate decay rate based on last action
 - Apply decay to each stat
 - Clamp values between 0-100
 - Update UI
```

#### Action Handling

```javascript
// Pseudo-code
- On action click:
 - Check cooldown (if implemented)
 - Update stats according to action rules
 - Clamp values between 0-100
 - Record action timestamp
 - Update decay rate
 - Update cat mood/image
```

#### Animation System

Each cat state has its own animation component that cycles through frames from a sprite sheet:

- **Sprite Sheet Format**: Horizontal strip of frames (e.g., 10 frames per sprite sheet)
- **Animation Components**: Each state has a dedicated animation component
- `CatIdleAnimation` - Neutral/idle state with tail wagging
- `CatHappyAnimation` - Happy state animation (cyan glow: #00FFF7)
- `CatHungryAnimation` - Hungry state animation (pink glow: #FF6EC7)
- `CatSleepyAnimation` - Sleepy/tired state animation (purple glow: #B266FF)
- `CatAngryAnimation` - Angry/unhappy state animation (red glow: #FF4D4D)

- **Animation Implementation**:
- Use CSS `background-position` or canvas to cycle through sprite sheet frames
- Frame rate: ~8-12 FPS for smooth but not too fast animation
- Loop continuously while in that state
- Smooth transitions when switching between states

- **Visual Effects (Glow/Filters)**:
- Each mood has a unique glow color applied via CSS `filter` or `box-shadow`
- Glow effect enhances mood expression and provides visual feedback
- Mood-to-glow mapping:
  - **Happy**: `#00FFF7` (cyan glow)
  - **Hungry**: `#FF6EC7` (pink glow)
  - **Sleepy**: `#B266FF` (purple glow)
  - **Angry**: `#FF4D4D` (red glow)
  - **Idle**: No glow or subtle neutral glow

#### Image Assets

- Store sprite sheets in `src/assets/cats/sprites/` directory
- Naming convention: `{state}.png` (e.g., `happy.png`, `hungry.png`, `sleepy.png`, `angry.png`)
- Each sprite sheet contains multiple frames horizontally
- Frame dimensions: Extract frame width from sprite sheet (divide total width by frame count)
- Fallback to idle animation if state sprite sheet not found

#### Visual Effects System

Each mood applies a colored glow effect to the cat sprite:

- **CSS Filter Approach** (Recommended):

```css
/* Example: Happy mood glow */
.cat-sprite.happy {
  filter: drop-shadow(0 0 10px #00fff7) drop-shadow(0 0 20px #00fff7)
    drop-shadow(0 0 30px #00fff7);
}
```

- **Box Shadow Approach** (Alternative):

```css
.cat-sprite.happy {
  box-shadow: 0 0 20px #00fff7, 0 0 40px #00fff7, 0 0 60px #00fff7;
}
```

- **Glow Intensity**: Varies based on mood intensity (stronger glow for more extreme moods)
- **Transition**: Smooth CSS transitions when mood changes (0.3s ease-in-out)

## UI/UX Considerations

### Visual Design

- Retro/tamagotchi aesthetic (terminal-style or pixel art)
- Clear stat bars with visual indicators
- Prominent action buttons
- Cat sprite prominently displayed with mood-based glow effects
- Glow colors provide immediate visual feedback about cat's emotional state
- Smooth transitions between moods and glow effects
- Responsive design for mobile and desktop

### User Feedback

- Visual feedback on action clicks
- Stat changes animated/visible
- Cat mood clearly reflected in image
- Warning indicators when stats are low

### Persistence

- Save state to localStorage on every stat change
- Load state on app initialization
- Allow reset/restart functionality

## Implementation Steps

1. **Setup State Management**

- Create state for stats (hunger, happiness, energy)
- Initialize with default values (e.g., 50 each)
- Add localStorage persistence

2. **Build Stat Display Component**

- Create progress bars for each stat
- Display current values (0-100)
- Visual indicators (colors based on level)

3. **Implement Stat Decay System**

- Set up interval timer (30-60s randomized)
- Implement decay logic
- Handle edge cases (min/max values)

4. **Create Action Buttons**

- Feed, Play, Sleep buttons
- Action handlers with stat modifications
- Cooldown/feedback mechanisms

5. **Build Animation System**

- Create base `SpriteAnimation` component for sprite sheet cycling
- Extract frames from sprite sheets (calculate frame width)
- Implement each state animation component:
  - `CatIdleAnimation` (using idle sprite sheet with tail wagging frames)
  - `CatHappyAnimation` (happy.png with cyan glow #00FFF7)
  - `CatHungryAnimation` (hungry.png with pink glow #FF6EC7)
  - `CatSleepyAnimation` (sleepy.png with purple glow #B266FF)
  - `CatAngryAnimation` (angry.png with red glow #FF4D4D)
- Set up animation loop with `requestAnimationFrame` or CSS animation
- Handle frame timing (8-12 FPS)
- Apply mood-specific glow effects using CSS filters/drop-shadows

6. **Build Pet Display Component**

- Mood determination logic
- Render appropriate animation component based on current mood
- Smooth transitions between animations

7. **Add Persistence**

- Save to localStorage
- Load on mount
- Reset functionality

8. **Polish & Testing**

- Test stat boundaries
- Test decay timing
- Test action effects
- Test persistence
- Mobile responsiveness

## File Structure

```
src/
├── App.jsx (main app component)
├── App.css
├── components/
│   ├── PetDisplay.jsx (renders animation based on mood)
│   ├── StatsDisplay.jsx (stat bars component)
│   ├── ActionButtons.jsx (action buttons component)
│   └── animations/
│       ├── SpriteAnimation.jsx (base sprite animation component)
│       ├── CatIdleAnimation.jsx
│       ├── CatHappyAnimation.jsx (with cyan glow #00FFF7)
│       ├── CatHungryAnimation.jsx (with pink glow #FF6EC7)
│       ├── CatSleepyAnimation.jsx (with purple glow #B266FF)
│       └── CatAngryAnimation.jsx (with red glow #FF4D4D)
├── hooks/
│   ├── usePetStats.js (stat management hook)
│   └── useSpriteAnimation.js (sprite animation logic hook)
├── utils/
│   ├── petLogic.js (mood calculation, decay logic)
│   └── spriteUtils.js (sprite sheet frame calculation utilities)
└── assets/
   └── cats/
       └── sprites/
           ├── idle.png (10 frames: tail wagging + expressions)
           ├── happy.png (happy state sprite sheet)
           ├── hungry.png (hungry state sprite sheet)
           ├── sleepy.png (sleepy state sprite sheet)
           └── angry.png (angry state sprite sheet)
```

## Sprite Sheet Animation Implementation

### SpriteAnimation Component Pattern

Each animation component follows this pattern:

```javascript
// Example: CatHappyAnimation.jsx
import { useSpriteAnimation } from "../../hooks/useSpriteAnimation";
import happySpritesheet from "../../assets/cats/sprites/happy.png";

export function CatHappyAnimation({ frameCount = 10, fps = 10 }) {
  const { currentFrame, spriteStyle } = useSpriteAnimation({
    spriteSheet: happySpritesheet,
    frameCount,
    fps,
    frameWidth: null, // Auto-calculate from image width / frameCount
  });

  return (
    <div
      className="sprite-container cat-sprite happy"
      style={{
        ...spriteStyle,
        filter:
          "drop-shadow(0 0 10px #00FFF7) drop-shadow(0 0 20px #00FFF7) drop-shadow(0 0 30px #00FFF7)",
        transition: "filter 0.3s ease-in-out",
      }}
    />
  );
}
```

### Sprite Sheet Frame Extraction

- **Frame Width Calculation**: `frameWidth = spriteSheetWidth / frameCount`
- **Background Position**: `backgroundPosition: -${currentFrame * frameWidth}px 0`
- **Animation Loop**: Use `requestAnimationFrame` or `setInterval` to cycle frames
- **Frame Timing**: `frameDelay = 1000 / fps` (e.g., 100ms for 10 FPS)

### Animation States Mapping

- **Idle**: Default state when stats are balanced (40-70 range) - No glow
- **Happy**: All stats > 70 - Cyan glow (#00FFF7)
- **Hungry**: Hunger < 30 - Pink glow (#FF6EC7)
- **Sleepy**: Energy < 30 - Purple glow (#B266FF)
- **Angry**: Happiness < 30 or multiple low stats - Red glow (#FF4D4D)

### Mood Priority (when multiple conditions apply)

1. **Angry** (highest priority - if Happiness < 30)
2. **Hungry** (if Hunger < 30)
3. **Sleepy** (if Energy < 30)
4. **Happy** (if all stats > 70)
5. **Idle** (default)

## Sprite Sheet Preparation

### Extracting Frames from Sprite Sheets

For the idle animation sprite sheet (10 frames):

1. Each frame is identical width: `totalWidth / 10`
2. Frames 1-4: Neutral expression with varying tail positions (idle loop)
3. Frames 5-10: Slight frown with varying tail positions (subtle mood variation)

### Creating Other State Sprite Sheets

Each state should have its own sprite sheet with:

- **Happy** (`happy.png`): 8-10 frames of happy expressions, tail up, perky ears - Cyan glow (#00FFF7)
- **Hungry** (`hungry.png`): 8-10 frames showing hunger (looking for food, meowing) - Pink glow (#FF6EC7)
- **Sleepy** (`sleepy.png`): 8-10 frames of sleepy/yawning animations - Purple glow (#B266FF)
- **Angry** (`angry.png`): 8-10 frames of angry/distressed expressions - Red glow (#FF4D4D)
- **Idle** (`idle.png`): 10 frames with neutral expressions and tail wagging - No glow

## Future Enhancements (Optional)

- Multiple cat breeds/characters
- Achievements/badges
- Sound effects (meows, purrs)
- Action-specific animations (eating, playing, sleeping)
- Particle effects (hearts for happy, zzz for tired)
- Mini-games
- Evolution system
- Social features (share cat status)
