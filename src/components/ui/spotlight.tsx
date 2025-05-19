import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface SpotlightProps {
  children: React.ReactNode;
  className?: string;
}

export const Spotlight: React.FC<SpotlightProps> = ({ children, className = '' }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = React.useState(0);

  const handleMouseMove = (e: MouseEvent) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  useEffect(() => {
    const div = divRef.current;
    if (!div) return;

    div.addEventListener('mousemove', handleMouseMove);
    div.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      div.removeEventListener('mousemove', handleMouseMove);
      div.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      ref={divRef}
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(99,102,241,0.15), transparent 40%)`,
          opacity,
        }}
      />
      {children}
    </motion.div>
  );
};