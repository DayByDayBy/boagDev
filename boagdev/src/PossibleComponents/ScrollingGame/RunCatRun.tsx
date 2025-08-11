import React, { useState, useEffect, useRef, useCallback } from 'react';

// Define types for our game objects
type Obstacle = {
  id: number;
  x: number;
  type: 'dog' | 'puddle' | 'chair' | 'pit';
};

// Game constants
const GRAVITY = 0.5;
const JUMP_FORCE = -12;
const GAME_SPEED = 5;
const CAT_WIDTH = 50;
const CAT_HEIGHT = 40;
const GROUND_HEIGHT = 20;

// Game component for a cat-themed scrolling game
const RunCatRun: React.FC = () => {
  // Game state management
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [catPosition, setCatPosition] = useState(0);
  const [catVelocity, setCatVelocity] = useState(0);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [isJumping, setIsJumping] = useState(false);
  const [collision, setCollision] = useState(false);
  
  const gameRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const obstacleIdRef = useRef(0);
  const lastObstacleTimeRef = useRef(0);

  // Handle keyboard controls for jumping and starting the game
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.code === 'Space') {
      if (!isPlaying && !gameOver) {
        startGame();
      }
    }
    
    if (e.code === 'ArrowUp' && isPlaying && !gameOver) {
      jump();
    }
  }, [isPlaying, gameOver]);

  // Initialize game controls
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Start the game when spacebar is pressed
  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setCollision(false);
    setScore(0);
    setCatPosition(0);
    setCatVelocity(0);
    setIsJumping(false);
    setObstacles([]);
    obstacleIdRef.current = 0;
    lastObstacleTimeRef.current = 0;
  };

  // Make the cat jump when up arrow is pressed
  const jump = () => {
    if (catPosition === 0 && !isJumping) { // Only jump when on the ground and not already jumping
      setCatVelocity(JUMP_FORCE);
      setIsJumping(true);
    }
  };

  // Update game physics and positions
  const updateGame = useCallback(() => {
    if (!isPlaying || gameOver) return;

    // Update cat position based on velocity and gravity
    setCatPosition(prev => {
      let newPosition = prev - catVelocity; // Subtract because in our coordinate system, up is negative
      if (newPosition < 0) {
        newPosition = 0;
        setIsJumping(false); // Cat is back on the ground
      }
      return newPosition;
    });

    setCatVelocity(prev => prev + GRAVITY); // Apply gravity

    // Update obstacles
    setObstacles(prev => {
      const updated = prev.map(obstacle => ({
        ...obstacle,
        x: obstacle.x - GAME_SPEED
      })).filter(obstacle => obstacle.x > -100); // Remove off-screen obstacles

      // Check for collisions
      const catRect = {
        x: 50,
        y: 200 - CAT_HEIGHT - catPosition,
        width: CAT_WIDTH,
        height: CAT_HEIGHT
      };

      for (const obstacle of updated) {
        const obstacleRect = {
          x: obstacle.x,
          y: obstacle.type === 'pit' ? 200 : 180,
          width: obstacle.type === 'pit' ? 80 : 30,
          height: obstacle.type === 'pit' ? 20 : 20
        };

        if (
          catRect.x < obstacleRect.x + obstacleRect.width &&
          catRect.x + catRect.width > obstacleRect.x &&
          catRect.y < obstacleRect.y + obstacleRect.height &&
          catRect.y + catRect.height > obstacleRect.y
        ) {
          // Collision detected
          setCollision(true);
          setGameOver(true);
          setIsPlaying(false);
          return updated; // Exit early to prevent further processing
        }
      }

      return updated;
    });

    // Add new obstacles
    const now = Date.now();
    if (now - lastObstacleTimeRef.current > 1500) { // Add obstacle every 1.5 seconds
      const obstacleTypes: Array<'dog' | 'puddle' | 'chair' | 'pit'> = ['dog', 'puddle', 'chair', 'pit'];
      const type = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
      
      setObstacles(prev => [
        ...prev,
        { id: obstacleIdRef.current++, x: 800, type }
      ]);
      
      lastObstacleTimeRef.current = now;
    }

    // Update score
    setScore(prev => prev + 1);

    // Continue game loop
    frameRef.current = requestAnimationFrame(updateGame);
  }, [isPlaying, gameOver, catPosition, catVelocity]);

  // Game loop management
  useEffect(() => {
    if (isPlaying && !gameOver) {
      frameRef.current = requestAnimationFrame(updateGame);
    }
    
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isPlaying, gameOver, updateGame]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <div style={{ 
      width: '800px', 
      height: '300px', 
      border: '2px solid #333', 
      position: 'relative',
      backgroundColor: '#87CEEB',
      overflow: 'hidden',
      fontFamily: 'Arial, sans-serif'
    }} ref={gameRef}>
      {/* Game instructions */}
      {!isPlaying && !gameOver && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: '20px',
          borderRadius: '10px',
          zIndex: 10
        }}>
          <h2>Run Cat Run!</h2>
          <p>Press SPACE to start</p>
          <p>Press UP ARROW to jump over obstacles</p>
        </div>
      )}

      {/* Game over screen */}
      {gameOver && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: '20px',
          borderRadius: '10px',
          zIndex: 10
        }}>
          <h2>{collision ? 'Ouch! Collision!' : 'Game Over!'}</h2>
          <p>Score: {score}</p>
          <button onClick={startGame} style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            Play Again
          </button>
        </div>
      )}

      {/* Score display */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#333',
        zIndex: 5
      }}>
        Score: {score}
      </div>

      {/* Ground */}
      <div style={{
        position: 'absolute',
        bottom: '0',
        width: '100%',
        height: `${GROUND_HEIGHT}px`,
        backgroundColor: '#8B4513'
      }} />

      {/* Cat character */}
      <div style={{
        position: 'absolute',
        left: '50px',
        bottom: `${GROUND_HEIGHT + catPosition}px`,
        width: `${CAT_WIDTH}px`,
        height: `${CAT_HEIGHT}px`,
        backgroundColor: collision ? '#ff6b6b' : '#FFA500',
        borderRadius: '50% 50% 0 0',
        transition: 'bottom 0.1s linear, background-color 0.3s',
        transform: collision ? 'rotate(90deg)' : 'rotate(0deg)',
        transformOrigin: 'center'
      }}>
        {/* Cat ears */}
        <div style={{
          position: 'absolute',
          top: '-10px',
          left: '10px',
          width: '0',
          height: '0',
          borderLeft: '5px solid transparent',
          borderRight: '5px solid transparent',
          borderBottom: '10px solid #FFA500'
        }} />
        <div style={{
          position: 'absolute',
          top: '-10px',
          right: '10px',
          width: '0',
          height: '0',
          borderLeft: '5px solid transparent',
          borderRight: '5px solid transparent',
          borderBottom: '10px solid #FFA500'
        }} />
        {/* Cat eyes */}
        <div style={{
          position: 'absolute',
          top: '15px',
          left: '15px',
          width: '8px',
          height: '8px',
          backgroundColor: '#000',
          borderRadius: '50%'
        }} />
        <div style={{
          position: 'absolute',
          top: '15px',
          right: '15px',
          width: '8px',
          height: '8px',
          backgroundColor: '#000',
          borderRadius: '50%'
        }} />
        {/* Cat tail */}
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '-15px',
          width: '15px',
          height: '5px',
          backgroundColor: '#FFA500',
          borderRadius: '0 5px 5px 0',
          animation: isPlaying && !gameOver ? 'tailWag 0.5s infinite alternate' : 'none'
        }} />
        {/* Animation style for tail wagging */}
        <style>{`
          @keyframes tailWag {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(20deg); }
          }
        `}</style>
      </div>

      {/* Obstacles */}
      {obstacles.map(obstacle => (
        <div 
          key={obstacle.id}
          style={{
            position: 'absolute',
            left: `${obstacle.x}px`,
            bottom: obstacle.type === 'pit' ? '0' : `${GROUND_HEIGHT}px`,
            width: obstacle.type === 'pit' ? '80px' : '30px',
            height: obstacle.type === 'pit' ? '20px' : '20px',
            backgroundColor: obstacle.type === 'dog' ? '#808080' : 
                          obstacle.type === 'puddle' ? '#1E90FF' : 
                          obstacle.type === 'chair' ? '#A52A2A' : 'transparent',
            borderRadius: obstacle.type === 'dog' ? '50%' : 
                         obstacle.type === 'puddle' ? '50%' : 
                         obstacle.type === 'chair' ? '0' : '0',
            border: obstacle.type === 'pit' ? '2px solid #333' : 'none'
          }}
        >
          {/* Obstacle labels */}
          {obstacle.type === 'dog' && (
            <div style={{
              position: 'absolute',
              top: '-20px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '12px',
              color: '#000'
            }}>
              🐶
            </div>
          )}
          {obstacle.type === 'puddle' && (
            <div style={{
              position: 'absolute',
              top: '-20px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '12px',
              color: '#000'
            }}>
              💧
            </div>
          )}
          {obstacle.type === 'chair' && (
            <div style={{
              position: 'absolute',
              top: '-20px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '12px',
              color: '#000'
            }}>
              🪑
            </div>
          )}
          {obstacle.type === 'pit' && (
            <div style={{
              position: 'absolute',
              top: '-20px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '12px',
              color: '#000'
            }}>
              ⚫
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RunCatRun;