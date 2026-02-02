import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';

export function CelebrationScreen() {
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    // Generate confetti hearts
    const hearts = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 2,
    }));
    setConfetti(hearts);
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      {/* Confetti hearts */}
      {confetti.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{
            y: window.innerHeight + 20,
            opacity: [1, 1, 0],
            rotate: 360,
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            ease: 'linear',
            repeat: Infinity,
          }}
          style={{
            position: 'absolute',
            left: `${heart.x}%`,
            top: -20,
          }}
          className="pointer-events-none"
        >
          <Heart className="h-6 w-6 fill-red-400 text-red-400 md:h-8 md:w-8" />
        </motion.div>
      ))}

      {/* Celebration content */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 15,
          delay: 0.2,
        }}
        className="relative z-10 text-center"
      >
        {/* Sparkles decoration */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <Heart className="h-24 w-24 fill-red-500 text-red-500 md:h-32 md:w-32" />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -right-4 -top-4"
            >
              <Sparkles className="h-8 w-8 fill-yellow-400 text-yellow-400" />
            </motion.div>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                delay: 0.3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -bottom-4 -left-4"
            >
              <Sparkles className="h-8 w-8 fill-yellow-400 text-yellow-400" />
            </motion.div>
          </div>
        </div>

        {/* Success message */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-6 px-4 font-['Caveat',_cursive] text-6xl text-red-500 md:text-8xl"
          style={{ fontFamily: 'Caveat, cursive' }}
        >
          Yay, You Choose Yes with free will! 🎉
        </motion.h1>

        {/* Celebration GIF */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-6 flex justify-center"
        >
          <img
            src="https://media.giphy.com/media/UO5elnTqo4vSg/giphy.gif"
            alt="Celebration"
            className="max-w-xs md:max-w-sm shadow-lg"
            style={{ borderRadius: '24px' }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mb-4 px-4 font-['Caveat',_cursive] text-3xl text-rose-600 md:text-5xl"
          style={{ fontFamily: 'Caveat, cursive' }}
        >
          You Know Whats coming girl!💖
        </motion.p>

        

        {/* Animated hearts decoration */}
        <div className="mt-12 flex justify-center gap-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Heart className="h-8 w-8 fill-pink-400 text-pink-400 md:h-10 md:w-10" />
            </motion.div>
          ))}
        </div>

      </motion.div>
    </div>
  );
}
