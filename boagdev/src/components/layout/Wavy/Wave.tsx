import React, { useEffect, useRef, useCallback, useState } from 'react';
import { FREQUENCY, AMPLITUDE, PHASE } from './constants';

interface WaveProps {
  modOneActive: boolean;
  modTwoActive: boolean;
  modThreeActive: boolean;
  modMainActive: boolean;
}

interface MousePos {
  x: number;
  y: number;
}

const Wave: React.FC<WaveProps> = ({ 
  modOneActive = false, 
  modTwoActive = false, 
  modThreeActive = false, 
  modMainActive = false 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  
  const [phase, setPhase] = useState<number>(PHASE.INITIAL);
  const [amplitude, setAmplitude] = useState<number>(AMPLITUDE.INITIAL);
  const [frequency, setFrequency] = useState<number>(FREQUENCY.INITIAL);
  
  const ampMaxReached = useRef<boolean>(false);
  const ampMinReached = useRef<boolean>(false);
  const freqMaxReached = useRef<boolean>(false);
  const freqMinReached = useRef<boolean>(false);

  // Simplified mouse position (could be removed entirely)
  const [mousePos] = useState<MousePos>({ x: 100, y: 100 });

  const drawWave = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set up drawing
    ctx.beginPath();
    ctx.moveTo(-4, canvas.height / 2);
    
    const numPoints = 5000;
    const stepSize = canvas.width / numPoints;
    
    for (let x = 0; x < canvas.width; x += stepSize) {
      // Amplitude modulations (using static mouse pos for now)
      const ampModOne = modOneActive ? Math.sin(mousePos.x % (x - canvas.width)) : 0;
      const ampModTwo = modTwoActive ? Math.sin(mousePos.y % (x - canvas.width)) : 0;
      const ampModThree = modThreeActive ? (mousePos.y * mousePos.x) % (x - canvas.width) - phase : 0;
      const ampModMain = modMainActive ? 
        10 * (Math.sin(ampModOne) + Math.sin(ampModTwo) + Math.random() * Math.sin(ampModThree)) : 0;

      // Calculate wave position
      const y = canvas.height / 2 + ampModMain + amplitude * Math.sin((x + phase) * (frequency / 10));

      ctx.lineTo(x, y);
    }
    
    // Style the wave
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'var(--wave-color)';
    ctx.stroke();
  }, [modOneActive, modTwoActive, modThreeActive, modMainActive, phase, amplitude, frequency, mousePos]);

  const updateWave = useCallback(() => {
    // Update amplitude
    if (!ampMaxReached.current) {
      if (amplitude >= AMP_MAX) {
        ampMaxReached.current = true;
        ampMinReached.current = false;
      } else {
        setAmplitude(prev => prev + (AMPLITUDE.CHANGE * Math.random()));
      }
    } else if (!ampMinReached.current) {
      if (amplitude <= AMP_MIN) {
        ampMinReached.current = true;
        ampMaxReached.current = false;
      } else {
        setAmplitude(prev => prev - AMPLITUDE.CHANGE);
      }
    }

    // Update frequency
    if (!freqMaxReached.current) {
      if (frequency >= FREQ_MAX) {
        freqMaxReached.current = true;
        freqMinReached.current = false;
      } else {
        setFrequency(prev => prev + (FREQUENCY.CHANGE * Math.random()));
      }
    } else if (!freqMinReached.current) {
      if (frequency <= FREQUENCY.MIN) {
        freqMinReached.current = true;
        freqMaxReached.current = false;
      } else {
        setFrequency(prev => prev - FREQUENCY.CHANGE);
      }
    }

    // Update phase
    setPhase(prev => 
      Math.random() < PHASE_DECREMENT_THRESHOLD ? 
        prev - PHASE_DECREMENT : 
        prev + PHASE_INCREMENT
    );
  }, [amplitude, frequency]);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      updateWave();
      drawWave();
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [updateWave, drawWave]);

  // Handle canvas resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight / 2;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="wave-canvas"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100vw',
        height: '50vh',
        zIndex: 1,
        pointerEvents: 'none'
      }}
    />
  );
};

export default Wave;