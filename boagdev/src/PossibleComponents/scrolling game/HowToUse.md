# How to Use the RunCatRun Component

This document explains how to deploy the RunCatRun cat-themed scrolling game component on any website.

## Prerequisites

- A React-based website or application
- Node.js and npm installed (for dependency management)
- Basic knowledge of React components

## Installation Steps

### 1. Copy the Component File

First, copy the `RunCatRun.tsx` file to your project's components directory:
```
src/components/RunCatRun.tsx
```

### 2. Install Required Dependencies

Make sure you have React installed in your project:
```bash
npm install react react-dom
```

### 3. Import and Use the Component

In any React component where you want to include the game, import and use it:

```jsx
import RunCatRun from './components/RunCatRun';

function App() {
  return (
    <div className="app">
      <h1>My Website</h1>
      <RunCatRun />
    </div>
  );
}

export default App;
```

### 4. Add CSS (Optional)

The component includes all necessary styling inline, but if you want to customize the appearance, you can override styles by wrapping the component in a container with custom CSS:

```jsx
<div className="game-container" style={{ margin: '20px auto', width: 'fit-content' }}>
  <RunCatRun />
</div>
```

## Specific Example: Adding to This Project

To add the RunCatRun game to this specific project:

1. Ensure the component file is located at:
   ```
   PossibleComponents/scrolling game/RunCatRun.tsx
   ```

2. Import the component in your App.tsx or any other component:
   ```jsx
   import RunCatRun from '../PossibleComponents/scrolling game/RunCatRun';
   ```

3. Use the component in your JSX:
   ```jsx
   function App() {
     return (
       <div className="app">
         <h1>Welcome to My App</h1>
         <RunCatRun />
       </div>
     );
   }
   ```

4. Make sure your project supports TypeScript (.tsx) files. If not, you can rename the file to `RunCatRun.js` and remove TypeScript-specific syntax.

## Game Controls

- **Space Bar**: Start the game
- **Up Arrow**: Make the cat jump over obstacles

## Customization

You can customize the game by modifying the constants at the top of the RunCatRun.tsx file:

- `GRAVITY`: Adjusts how quickly the cat falls
- `JUMP_FORCE`: Controls how high the cat jumps
- `GAME_SPEED`: Changes the speed of obstacles
- `CAT_WIDTH` and `CAT_HEIGHT`: Adjusts the cat's size
- `GROUND_HEIGHT`: Changes the ground height

## Troubleshooting

### Module Not Found Errors

If you see errors about missing modules, make sure React is properly installed:
```bash
npm install react react-dom
```

### Styling Issues

If the game doesn't appear correctly, ensure your CSS isn't overriding the component's styles. The game container has a fixed width of 800px and height of 300px.

### Game Not Responding to Keys

If the game doesn't respond to keyboard input:
1. Make sure the game has focus (click on the game area)
2. Check browser console for JavaScript errors
3. Ensure no other components are capturing key events

## Browser Support

The game works in all modern browsers that support:
- React
- CSS3
- requestAnimationFrame API

For older browsers, you may need to add polyfills for:
- requestAnimationFrame
- CSS transitions