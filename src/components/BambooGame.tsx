import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const GameContainer = styled(motion.div)`
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem;
  background-color: var(--panda-white);
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
  text-align: center;
`;

const GameTitle = styled.h2`
  margin-bottom: 1rem;
`;

const GameArea = styled.div`
  position: relative;
  height: 300px;
  background: linear-gradient(to bottom, #dcedc8 0%, #8bc34a 100%);
  border-radius: 10px;
  overflow: visible;
  margin-top: 1rem;
  box-shadow: inset 0 0 10px rgba(0,0,0,0.2);
  
  /* Ensure content is visible */
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const Panda = styled(motion.div)`
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 60px;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
`;

const PandaHead = styled.div`
  width: 40px;
  height: 35px;
  background-color: white;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  position: relative;
`;

const PandaEar = styled.div<{ left?: boolean }>`
  position: absolute;
  top: -8px;
  left: ${props => props.left ? '2px' : 'auto'};
  right: ${props => props.left ? 'auto' : '2px'};
  width: 15px;
  height: 15px;
  background-color: black;
  border-radius: 50%;
`;

const PandaEye = styled.div<{ left?: boolean }>`
  position: absolute;
  top: 10px;
  left: ${props => props.left ? '7px' : 'auto'};
  right: ${props => props.left ? 'auto' : '7px'};
  width: 10px;
  height: 12px;
  background-color: black;
  border-radius: 50%;
`;

const PandaNose = styled.div`
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 10px;
  height: 6px;
  background-color: black;
  border-radius: 50%;
`;

const PandaBody = styled.div`
  width: 45px;
  height: 30px;
  background-color: white;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  position: relative;
  z-index: 1;
`;

const Bamboo = styled(motion.div)`
  position: absolute;
  bottom: 0;
  width: 20px;
  background-color: #4caf50;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
`;

const BambooNode = styled.div`
  width: 20px;
  height: 8px;
  background-color: #2e7d32;
  border-radius: 5px;
  margin-top: 15px;
`;

const ScoreDisplay = styled.div`
  margin-top: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--panda-black);
`;

const GameControls = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
`;

const ControlButton = styled(motion.button)`
  font-size: 1rem;
`;

const GameMessage = styled(motion.div)`
  margin-top: 1rem;
  padding: 1rem;
  background-color: var(--panda-accent);
  color: white;
  border-radius: 10px;
  font-weight: bold;
`;

const CollectionEffect = styled(motion.div)`
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: var(--panda-accent);
  color: white;
  font-weight: bold;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
`;

// We'll use the ref to get actual width

interface BambooGameProps {
  onWin?: () => void;
}

const BambooGame: React.FC<BambooGameProps> = ({ onWin }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [pandaPosition, setPandaPosition] = useState({ x: 30, y: 0 });
  const [bamboos, setBamboos] = useState<{id: number, x: number, height: number, scored: boolean}[]>([]);
  const [showWinMessage, setShowWinMessage] = useState(false);
  const [collectionEffect, setCollectionEffect] = useState<{x: number, y: number, show: boolean}>({ x: 0, y: 0, show: false });
  const gameRef = useRef<HTMLDivElement>(null);
  
  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setPandaPosition({ x: 30, y: 0 });
    setBamboos([]);
    setShowWinMessage(false);
    setCollectionEffect({ x: 0, y: 0, show: false });
  };

  const movePanda = (direction: 'left' | 'right') => {
    if (!isPlaying || !gameRef.current) return;
    
    const gameWidth = gameRef.current.offsetWidth;
    
    setPandaPosition(prev => {
      const newX = direction === 'left' 
        ? Math.max(10, prev.x - 40) 
        : Math.min(gameWidth - 70, prev.x + 40);
      
      return { ...prev, x: newX };
    });
  };

  const collectBamboo = () => {
    if (!isPlaying) return;
    
    setBamboos(prev => {
      return prev.map(bamboo => {
        if (
          !bamboo.scored &&
          Math.abs(bamboo.x - pandaPosition.x) < 60 &&
          bamboo.height > 0
        ) {
          // Show collection effect
          setCollectionEffect({
            x: bamboo.x,
            y: bamboo.height - 30,
            show: true
          });
          
          // Hide effect after animation completes
          setTimeout(() => {
            setCollectionEffect(prev => ({ ...prev, show: false }));
          }, 800);
          
          // Collect this bamboo
          setScore(s => {
            const newScore = s + 1;
            if (newScore >= 5 && onWin) {
              setShowWinMessage(true);
              setTimeout(() => {
                onWin();
                setIsPlaying(false);
              }, 2000);
            }
            return newScore;
          });
          return { ...bamboo, height: bamboo.height - 20, scored: true };
        }
        return bamboo;
      });
    });
  };

  // Generate bamboos
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      if (!gameRef.current) return;
      
      const width = gameRef.current.offsetWidth;
      const randomX = Math.floor(Math.random() * (width - 40));
      const randomHeight = Math.floor(Math.random() * 80) + 100;
      
      setBamboos(prev => [
        ...prev,
        { 
          id: Date.now(), 
          x: randomX, 
          height: randomHeight,
          scored: false
        }
      ]);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Clean up old bamboos
  useEffect(() => {
    if (!isPlaying) return;
    
    const cleanup = setInterval(() => {
      setBamboos(prev => {
        if (prev.length > 10) {
          return prev.slice(-10);
        }
        return prev;
      });
    }, 10000);
    
    return () => clearInterval(cleanup);
  }, [isPlaying]);

  return (
    <GameContainer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GameTitle>Bamboo Birthday Harvest</GameTitle>
      <p>Help the panda collect 5 bamboos to unlock a special birthday surprise!</p>
      
      <GameArea ref={gameRef}>
        {bamboos.map(bamboo => (
          <Bamboo
            key={bamboo.id}
            style={{
              height: `${bamboo.height}px`,
              left: `${bamboo.x}px`,
            }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: bamboo.height }}
            transition={{ duration: 0.5 }}
          >
            <BambooNode />
            <BambooNode style={{ marginTop: 30 }} />
            <BambooNode style={{ marginTop: 30 }} />
          </Bamboo>
        ))}
        
        <Panda
          style={{ x: pandaPosition.x }}
          animate={{ y: pandaPosition.y }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <PandaHead>
            <PandaEar left />
            <PandaEar />
            <PandaEye left />
            <PandaEye />
            <PandaNose />
          </PandaHead>
          <PandaBody />
        </Panda>
        
        {collectionEffect.show && (
          <CollectionEffect
            style={{ 
              left: `${collectionEffect.x}px`,
              bottom: `${collectionEffect.y}px` 
            }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ 
              scale: 1.5, 
              opacity: 1,
              y: -30
            }}
            transition={{ duration: 0.8 }}
          >
            +1
          </CollectionEffect>
        )}
      </GameArea>
      
      <ScoreDisplay>Bamboo Collected: {score} / 5</ScoreDisplay>
      
      {!isPlaying ? (
        <ControlButton
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={startGame}
        >
          Start Game
        </ControlButton>
      ) : (
        <GameControls>
          <ControlButton 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => movePanda('left')}
          >
            ← Move Left
          </ControlButton>
          
          <ControlButton 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={collectBamboo}
          >
            Collect
          </ControlButton>
          
          <ControlButton 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => movePanda('right')}
          >
            Move Right →
          </ControlButton>
        </GameControls>
      )}
      
      {showWinMessage && (
        <GameMessage
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Woo-hoo! You collected enough bamboo! Unlocking surprise...
        </GameMessage>
      )}
    </GameContainer>
  );
};

export default BambooGame;