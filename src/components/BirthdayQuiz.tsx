import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

const QuizContainer = styled(motion.div)`
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem;
  background-color: var(--panda-white);
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
  text-align: center;
`;

const QuizTitle = styled.h2`
  margin-bottom: 1rem;
`;

const QuizDescription = styled.p`
  margin-bottom: 1.5rem;
  color: var(--panda-black);
`;

const QuestionContainer = styled(motion.div)`
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: rgba(139, 195, 74, 0.1);
  border-radius: 10px;
  border: 2px dashed var(--panda-accent);
`;

const QuestionText = styled.h3`
  margin-bottom: 1rem;
  color: var(--panda-black);
`;

const AnswerOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const AnswerOption = styled(motion.div)<{ isSelected?: boolean; isCorrect?: boolean; isWrong?: boolean }>`
  padding: 0.8rem;
  border-radius: 8px;
  background-color: ${props => 
    props.isCorrect ? '#a5d6a7' : 
    props.isWrong ? '#ffcdd2' : 
    props.isSelected ? 'rgba(139, 195, 74, 0.3)' : 
    'white'};
  border: 2px solid ${props => 
    props.isCorrect ? '#4caf50' : 
    props.isWrong ? '#e57373' : 
    props.isSelected ? 'var(--panda-accent)' : 
    '#e0e0e0'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: ${props => props.isSelected ? 'scale(1)' : 'scale(1.02)'};
    background-color: ${props => 
      props.isCorrect ? '#a5d6a7' : 
      props.isWrong ? '#ffcdd2' : 
      'rgba(139, 195, 74, 0.15)'};
  }
`;

const TextInputAnswer = styled.input`
  width: 100%;
  padding: 0.8rem;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
  font-family: var(--font-primary);
  font-size: 1rem;
  margin-bottom: 0.5rem;
  
  &:focus {
    outline: none;
    border-color: var(--panda-accent);
  }
`;

const SubmitButton = styled(motion.button)`
  margin-top: 1rem;
  font-size: 1.1rem;
  width: 100%;
`;

const NextButton = styled(motion.button)`
  margin-top: 1rem;
  font-size: 1.1rem;
`;

const ResultsContainer = styled(motion.div)`
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: rgba(139, 195, 74, 0.1);
  border-radius: 10px;
  border: 2px solid var(--panda-accent);
`;

const ScoreDisplay = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: var(--panda-accent);
`;

const ResultMessage = styled(motion.div)`
  margin-top: 1rem;
  font-size: 1.2rem;
`;

const BalloonEmoji = styled(motion.span)`
  display: inline-block;
  font-size: 2rem;
  margin: 0 0.5rem;
`;

const CakeEmoji = styled(motion.span)`
  display: inline-block;
  font-size: 2rem;
  margin: 0 0.5rem;
`;

interface BirthdayQuizProps {
  onComplete?: () => void;
}

const BirthdayQuiz: React.FC<BirthdayQuizProps> = ({ onComplete }) => {
  const questions = [
    {
      id: 1,
      text: "What was our first inside joke?",
      type: "text",
      correctAnswer: "",  // Free text - will check later
      userAnswer: "",
      answered: false,
      feedback: "Aww, that's definitely worth remembering! 💕"
    },
    {
      id: 2,
      text: "Who is more likely to start a random dance party in the kitchen?",
      type: "multiple",
      options: ["Me", "Trish", "Both of us", "The cat"],
      correctAnswer: "Trish",
      userAnswer: "",
      answered: false
    },
    {
      id: 3,
      text: "What's her Hogwarts house?",
      type: "multiple",
      options: ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"],
      correctAnswer: "Gryffindor",
      userAnswer: "",
      answered: false
    },
    {
      id: 4,
      text: "What's the one song that always gets her dancing?",
      type: "multiple",
      options: ["Dancing Queen", "Ek number ek number", "Shake It Off", "Despacito"],
      correctAnswer: "Ek number ek number",
      userAnswer: "",
      answered: false
    }
  ];

  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState(questions);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleOptionSelect = (option: string) => {
    const updatedQuestions = [...quizQuestions];
    updatedQuestions[currentQuestion].userAnswer = option;
    setQuizQuestions(updatedQuestions);
  };
  
  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedQuestions = [...quizQuestions];
    updatedQuestions[currentQuestion].userAnswer = e.target.value;
    setQuizQuestions(updatedQuestions);
  };

  const handleSubmitAnswer = () => {
    const updatedQuestions = [...quizQuestions];
    const question = updatedQuestions[currentQuestion];
    
    // For question 1 (free text), any answer is valid
    if (question.id === 1 && question.userAnswer.trim() !== "") {
      question.answered = true;
    } else if (question.id !== 1 && question.userAnswer === question.correctAnswer) {
      question.answered = true;
      setScore(prevScore => prevScore + 1);
    } else if (question.id !== 1) {
      question.answered = true;
    }
    
    setQuizQuestions(updatedQuestions);
  };
  
  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz completed
      setShowResults(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 7000);
      
      if (onComplete) {
        // Allow some time for the user to see their results
        setTimeout(onComplete, 8000);
      }
    }
  };
  
  const currentQ = quizQuestions[currentQuestion];
  const isAnswered = currentQ.answered;
  const isLastQuestion = currentQuestion === quizQuestions.length - 1;
  
  const resultMessage = 
    score === quizQuestions.length - 1 ? "Amazing job! 💖" : 
    score >= quizQuestions.length - 2 ? "Amazing job! 💖" : 
    score >= quizQuestions.length / 2 ? "Amazing job! 💖" : 
    "Amazing job! 💖";

  return (
    <>
      {showConfetti && <Confetti recycle={false} numberOfPieces={300} />}
      <QuizContainer
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {!quizStarted ? (
          <>
            <QuizTitle>Birthday Knowledge Quiz</QuizTitle>
            <QuizDescription>
              Let's Quiz the birthday star! 🎉 Answer these questions to reveal a special message.
            </QuizDescription>
            <SubmitButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartQuiz}
            >
              <BalloonEmoji
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                🎈
              </BalloonEmoji>
              Start Quiz
              <BalloonEmoji
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
              >
                🎈
              </BalloonEmoji>
            </SubmitButton>
          </>
        ) : showResults ? (
          <ResultsContainer
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <QuizTitle>Quiz Complete!</QuizTitle>
            <ScoreDisplay>
              <CakeEmoji
                animate={{ rotate: [0, 10, -10, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                🎂
              </CakeEmoji>
              Score: {score} / {quizQuestions.length - 1}
              <CakeEmoji
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
              >
                🎂
              </CakeEmoji>
            </ScoreDisplay>
            <ResultMessage
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {resultMessage}
            </ResultMessage>
            <ResultMessage
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Your memory of your inside joke: "{quizQuestions[0].userAnswer}" is adorable!
            </ResultMessage>
            <ResultMessage
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              Happy Birthday! 🎉
            </ResultMessage>
          </ResultsContainer>
        ) : (
          <>
            <QuizTitle>Question {currentQuestion + 1} of {quizQuestions.length}</QuizTitle>
            <QuestionContainer
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <QuestionText>{currentQ.text}</QuestionText>
              
              {currentQ.type === "text" ? (
                <TextInputAnswer
                  placeholder="Type your answer here..."
                  value={currentQ.userAnswer}
                  onChange={handleTextInput}
                  disabled={isAnswered}
                />
              ) : (
                <AnswerOptions>
                  {currentQ.options?.map((option, index) => (
                    <AnswerOption
                      key={index}
                      isSelected={currentQ.userAnswer === option}
                      isCorrect={isAnswered && option === currentQ.correctAnswer}
                      isWrong={isAnswered && currentQ.userAnswer === option && option !== currentQ.correctAnswer}
                      onClick={() => !isAnswered && handleOptionSelect(option)}
                      whileHover={!isAnswered ? { scale: 1.02 } : {}}
                      whileTap={!isAnswered ? { scale: 0.98 } : {}}
                    >
                      {option}
                    </AnswerOption>
                  ))}
                </AnswerOptions>
              )}
            </QuestionContainer>
            
            {!isAnswered ? (
              <SubmitButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmitAnswer}
                disabled={currentQ.userAnswer === ""}
              >
                Submit Answer
              </SubmitButton>
            ) : (
              <NextButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextQuestion}
              >
                {isLastQuestion ? "See Results" : "Next Question"}
              </NextButton>
            )}
            
            {isAnswered && currentQ.id === 1 && (
              <ResultMessage
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {currentQ.feedback}
              </ResultMessage>
            )}
            
            {isAnswered && currentQ.id !== 1 && (
              <ResultMessage
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {currentQ.userAnswer === currentQ.correctAnswer ? 
                  "Correct! 🎉" : 
                  `Oops! The correct answer is: ${currentQ.correctAnswer}`}
              </ResultMessage>
            )}
          </>
        )}
      </QuizContainer>
    </>
  );
};

export default BirthdayQuiz;