import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

interface QuestionScreenProps {
  onYes: () => void;
}

export function QuestionScreen({ onYes }: QuestionScreenProps) {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [hasMovedNo, setHasMovedNo] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const moveNoButton = () => {
    const container = document.querySelector('.question-container');
    if (!container || !noButtonRef.current) return;

    const containerRect = container.getBoundingClientRect();
    const buttonRect = noButtonRef.current.getBoundingClientRect();

    // Calculate random position within container bounds
    const maxX = containerRect.width - buttonRect.width - 40;
    const maxY = containerRect.height - buttonRect.height - 40;

    const randomX = Math.random() * maxX - maxX / 2;
    const randomY = Math.random() * maxY - maxY / 2;

    setNoButtonPosition({ x: randomX, y: randomY });
    setHasMovedNo(true);
  };

  return (
    <div className="question-container relative flex min-h-screen items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center"
      >
        {/* Decorative hearts */}
        <motion.div
          animate={{ 
            rotate: [0, 10, 0],
            y: [0, -10, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="mb-8 flex justify-center"
        >
          <Heart className="h-16 w-16 fill-red-400 text-red-400 md:h-20 md:w-20" />
        </motion.div>

        {/* Question text */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-12 px-4 font-['Caveat',_cursive] text-5xl text-rose-600 md:text-7xl"
          style={{ fontFamily: 'Caveat, cursive' }}
        >
          Hi Ms. Olesia,
          <br />
          <span className="text-red-500">will you be my Valentine?</span>
        </motion.h1>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center"
        >
          {/* YES Button */}
          <motion.button
            onClick={onYes}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                '0 0 20px rgba(239, 68, 68, 0.4)',
                '0 0 30px rgba(239, 68, 68, 0.6)',
                '0 0 20px rgba(239, 68, 68, 0.4)',
              ],
            }}
            transition={{
              boxShadow: {
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
            className="rounded-full bg-gradient-to-r from-red-400 to-pink-500 px-16 py-6 text-2xl font-bold text-white shadow-lg transition-all hover:from-red-500 hover:to-pink-600 md:px-20 md:py-8 md:text-3xl"
          >
            YES! 💕
          </motion.button>

          {/* NO Button - moves away on hover */}
          <motion.button
            ref={noButtonRef}
            onMouseEnter={moveNoButton}
            onTouchStart={moveNoButton}
            animate={{
              x: noButtonPosition.x,
              y: noButtonPosition.y,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
            }}
            className="rounded-full border-2 border-gray-300 bg-white px-8 py-3 text-sm font-medium text-gray-500 shadow-sm hover:border-gray-400 md:px-10 md:py-4 md:text-base"
          >
            {hasMovedNo ? '👀' : 'No'}
          </motion.button>
        </motion.div>

        {/* Playful hint if NO button has moved */}
        {hasMovedNo && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 font-['Caveat',_cursive] text-xl text-rose-400 md:text-2xl"
            style={{ fontFamily: 'Caveat, cursive' }}
          >
            Oops! That button is shy... 😊
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
