import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

export function FloatingHearts() {
  const hearts = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 4,
    size: 16 + Math.random() * 16,
    opacity: 0.1 + Math.random() * 0.2,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: '100vh', opacity: 0, rotate: 0 }}
          animate={{
            y: '-20vh',
            opacity: [0, heart.opacity, heart.opacity, 0],
            rotate: [0, 180, 360],
            x: [0, Math.sin(heart.id) * 50, 0],
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
          }}
        >
          <Heart
            className="fill-pink-300 text-pink-300"
            style={{ width: heart.size, height: heart.size }}
          />
        </motion.div>
      ))}
    </div>
  );
}
