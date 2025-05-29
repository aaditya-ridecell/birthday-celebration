import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

const MessageContainer = styled(motion.div)`
  max-width: 600px;
  margin: 0 auto;
  background-color: var(--panda-white);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
  position: relative;
  z-index: 10;
  text-align: center;
`;

const RevealButton = styled(motion.button)`
  margin-top: 2rem;
  font-size: 1.2rem;
  background-color: var(--panda-accent);
  &:hover {
    background-color: var(--panda-shadow);
  }
`;

const MessageContent = styled(motion.div)`
  margin-top: 2rem;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const PandaEmoji = styled(motion.span)`
  display: inline-block;
  font-size: 2rem;
  margin: 0 0.5rem;
`;

interface BirthdayMessageProps {
  name: string;
  message?: string;
}

const BirthdayMessage: React.FC<BirthdayMessageProps> = ({ 
  name, 
  message = "Wishing you a beary special birthday filled with happiness, bamboo, and lots of love! May your day be as sweet and unique as you are. Remember that like Kung Fu Panda says, 'There is no secret ingredient... it's just you!' And you are amazing just the way you are!"
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleReveal = () => {
    setIsRevealed(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 10000);
  };

  return (
    <>
      {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}
      <MessageContainer
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          initial={{ scale: 1 }}
          animate={{ scale: isRevealed ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 0.5 }}
        >
          Special Message for {name}
        </motion.h2>
        
        {!isRevealed ? (
          <RevealButton
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReveal}
          >
            <PandaEmoji
              animate={{ 
                rotate: [0, 10, -10, 10, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5 
              }}
            >
              🐼
            </PandaEmoji>
            Click to Reveal
            <PandaEmoji
              animate={{ 
                rotate: [0, -10, 10, -10, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5 
              }}
            >
              🐼
            </PandaEmoji>
          </RevealButton>
        ) : (
          <MessageContent
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p style={{ whiteSpace: 'pre-line' }}>{message}</p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <PandaEmoji
                animate={{ y: [0, -10, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5 
                }}
              >
                🐼
              </PandaEmoji>
              <PandaEmoji
                animate={{ y: [0, -10, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5,
                  delay: 0.5 
                }}
              >
                🎂
              </PandaEmoji>
              <PandaEmoji
                animate={{ y: [0, -10, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5,
                  delay: 1 
                }}
              >
                🎁
              </PandaEmoji>
            </motion.div>
          </MessageContent>
        )}
      </MessageContainer>
    </>
  );
};

export default BirthdayMessage;