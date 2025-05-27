import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import GlobalStyles from './styles/GlobalStyles';
import PandaHeader from './components/PandaHeader';
import CountdownTimer from './components/CountdownTimer';
import BirthdayMessage from './components/BirthdayMessage';
import BambooGame from './components/BambooGame';

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Section = styled(motion.section)`
  margin: 2rem 0;
`;

const SettingsContainer = styled(motion.div)`
  margin: 1rem 0;
  padding: 1rem;
  background-color: var(--panda-white);
  border-radius: 10px;
`;

const InputGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid var(--panda-accent);
  border-radius: 5px;
  font-family: var(--font-primary);
  font-size: 1rem;
`;

const DatePicker = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid var(--panda-accent);
  border-radius: 5px;
  font-family: var(--font-primary);
  font-size: 1rem;
`;

const SubmitButton = styled(motion.button)`
  margin-top: 1rem;
  width: 100%;
  font-size: 1.2rem;
`;

const Footer = styled.footer`
  margin-top: 4rem;
  padding-top: 1rem;
  border-top: 1px solid var(--panda-accent);
  text-align: center;
  font-size: 0.9rem;
  color: var(--panda-black);
`;

function App() {

  const envName = process.env.REACT_APP_BIRTHDAY_NAME || '';
  const envMessage = process.env.REACT_APP_BIRTHDAY_MESSAGE || "Wishing you the happiest birthday ever! You're amazing and I love you!";
  const envDate = process.env.REACT_APP_BIRTHDAY_DATE || '';


  const [name, setName] = useState(envName);
  const [message, setMessage] = useState(envMessage);
  const [date, setDate] = useState(envDate);
  const [isConfigured, setIsConfigured] = useState(true); // Set to true to skip the configuration screen
  const [showSurprise, setShowSurprise] = useState(false);
  const [birthdayDate, setBirthdayDate] = useState<Date | null>(new Date(envDate)); // Same date as above
  
  // Check if we have stored settings
  useEffect(() => {
    const savedName = localStorage.getItem('birthday-name');
    const savedMessage = localStorage.getItem('birthday-message');
    const savedDate = localStorage.getItem('birthday-date');
    
    if (savedName && savedDate) {
      setName(savedName);
      setMessage(savedMessage || '');
      setDate(savedDate);
      setBirthdayDate(new Date(savedDate));
      setIsConfigured(true);
    }
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to local storage
    localStorage.setItem('birthday-name', name);
    localStorage.setItem('birthday-message', message);
    localStorage.setItem('birthday-date', date);
    
    setBirthdayDate(new Date(date));
    setIsConfigured(true);
  };
  
  const handleGameWin = () => {
    setShowSurprise(true);
  };

  return (
    <AppContainer>
      <GlobalStyles />
      
      {isConfigured ? (
        <>
          <PandaHeader name={name} />
          
          <Section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {birthdayDate && <CountdownTimer targetDate={birthdayDate} />}
          </Section>
          
          {!showSurprise ? (
            <Section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <BambooGame onWin={handleGameWin} />
            </Section>
          ) : (
            <Section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <BirthdayMessage name={name} message={message || undefined} />
            </Section>
          )}
          
          <Footer>
            <motion.p
              whileHover={{ scale: 1.05 }}
            >
              Made with ❤️ for {name}
            </motion.p>
          </Footer>
        </>
      ) : (
        <SettingsContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Setup Birthday Celebration</h2>
          <form onSubmit={handleSubmit}>
            <InputGroup>
              <Label htmlFor="name">Your Girlfriend's Name</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                placeholder="Enter name"
              />
            </InputGroup>
            
            <InputGroup>
              <Label htmlFor="date">Birthday Date</Label>
              <DatePicker 
                id="date" 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)} 
                required
              />
            </InputGroup>
            
            <InputGroup>
              <Label htmlFor="message">Special Message (Optional)</Label>
              <Input 
                id="message" 
                as="textarea" 
                rows={4}
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                placeholder="Enter a special birthday message"
                style={{ resize: 'vertical' }}
              />
            </InputGroup>
            
            <SubmitButton 
              type="submit" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Save & Continue
            </SubmitButton>
          </form>
        </SettingsContainer>
      )}
    </AppContainer>
  );
}

export default App;