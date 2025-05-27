import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeaderContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  color: var(--panda-black);
  text-shadow: 3px 3px 0px var(--panda-accent);
  margin-bottom: 1rem;
`;

const PandaEars = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: -20px;
`;

const Ear = styled.div<{ left?: boolean }>`
  width: 60px;
  height: 60px;
  background-color: var(--panda-black);
  border-radius: 50%;
  margin: 0 40px;
  box-shadow: inset 0 0 0 15px var(--panda-white);
`;

const PandaFace = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: var(--panda-white);
  border-radius: 50%;
  position: relative;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  margin-bottom: 20px;
`;

const Eye = styled.div<{ left?: boolean }>`
  position: absolute;
  width: 50px;
  height: 60px;
  background-color: var(--panda-black);
  border-radius: 50%;
  top: 50px;
  left: ${props => props.left ? '30px' : 'auto'};
  right: ${props => props.left ? 'auto' : '30px'};
  transform: rotate(${props => props.left ? '-20deg' : '20deg'});
`;

const InnerEye = styled.div`
  position: absolute;
  width: 15px;
  height: 15px;
  background-color: var(--panda-white);
  border-radius: 50%;
  top: 15px;
  left: 10px;
`;

const Nose = styled.div`
  position: absolute;
  width: 30px;
  height: 20px;
  background-color: var(--panda-black);
  border-radius: 50%;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
`;

interface PandaHeaderProps {
  name: string;
}

const PandaHeader: React.FC<PandaHeaderProps> = ({ name }) => {
  return (
    <HeaderContainer
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <PandaEars>
        <Ear left />
        <Ear />
      </PandaEars>
      <PandaFace
        animate={{ 
          rotate: [0, 5, -5, 5, 0],
        }}
        transition={{ 
          repeat: Infinity, 
          repeatType: "reverse", 
          duration: 5 
        }}
      >
        <Eye left>
          <InnerEye />
        </Eye>
        <Eye>
          <InnerEye />
        </Eye>
        <Nose />
      </PandaFace>
      <Title
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
      >
        Happy Birthday {name}!
      </Title>
    </HeaderContainer>
  );
};

export default PandaHeader;