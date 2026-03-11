'use client';

import { AnimatePresence, motion } from 'framer-motion';

export default function PageTransition({ children }) {
  return (
    <AnimatePresence mode="wait">
      <motion.main
        key="app-main"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}

