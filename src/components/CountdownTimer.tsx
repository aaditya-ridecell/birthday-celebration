import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CountdownContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;
`;

const TimeDisplay = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const TimeUnit = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--panda-black);
  color: var(--panda-white);
  padding: 1rem;
  border-radius: 10px;
  width: 80px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
`;

const TimeValue = styled.span`
  font-size: 2rem;
  font-weight: bold;
`;

const TimeLabel = styled.span`
  font-size: 0.8rem;
  text-transform: uppercase;
`;

const Message = styled(motion.h2)`
  margin-top: 2rem;
  color: var(--panda-accent);
  text-align: center;
`;

interface CountdownTimerProps {
  targetDate: Date;
  onComplete?: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
        
        if (!isComplete) {
          setIsComplete(true);
          if (onComplete) onComplete();
        }
      }
    };

    calculateTimeLeft();
    const timerId = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timerId);
  }, [targetDate, onComplete, isComplete]);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <CountdownContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {!isComplete ? (
        <>
          <motion.h2
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ 
              repeat: Infinity, 
              repeatType: "reverse", 
              duration: 2 
            }}
          >
            Countdown to the Big Day!
          </motion.h2>
          <TimeDisplay>
            {timeUnits.map((unit, index) => (
              <TimeUnit 
                key={unit.label}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 + 0.3 }}
              >
                <TimeValue>{unit.value}</TimeValue>
                <TimeLabel>{unit.label}</TimeLabel>
              </TimeUnit>
            ))}
          </TimeDisplay>
        </>
      ) : (
        <Message
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          It's Birthday Time! 🎉
        </Message>
      )}
    </CountdownContainer>
  );
};

export default CountdownTimer;