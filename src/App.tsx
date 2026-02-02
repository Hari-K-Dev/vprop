import { useState, useEffect } from 'react';
import { QuestionScreen } from './components/QuestionScreen';
import { CelebrationScreen } from './components/CelebrationScreen';
import { FloatingHearts } from './components/FloatingHearts';

export default function App() {
  const [answered, setAnswered] = useState(false);

  const handleYes = () => {
    setAnswered(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-100 via-rose-50 to-red-100">
      <FloatingHearts />
      
      {!answered ? (
        <QuestionScreen onYes={handleYes} />
      ) : (
        <CelebrationScreen />
      )}
    </div>
  );
}
