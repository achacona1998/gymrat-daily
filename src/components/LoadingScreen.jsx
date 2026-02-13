import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";

export const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  const messages = [
    "Calentando músculos...",
    "Preparando mancuernas...",
    "Ajustando pesos...",
    "Estirando...",
    "¡Listo para entrenar!",
  ];

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          if (onComplete) setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2; // Adjust speed here
      });
    }, 40);

    const messageTimer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 800);

    return () => {
      clearInterval(timer);
      clearInterval(messageTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col items-center justify-center text-white">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-12 flex flex-col items-center">
        <Activity size={64} className="text-primary mb-4" />
        <h1 className="text-4xl font-display font-black italic tracking-widest">
          GYMRAT<span className="text-primary">DAILY</span>
        </h1>
      </motion.div>

      <div className="w-64 h-4 bg-gray-800 rounded-full overflow-hidden relative skew-x-12 border border-gray-700">
        <motion.div
          className="h-full bg-linear-to-r from-primary to-secondary"
          style={{ width: `${progress}%` }}
        />
        {/* Striped pattern overlay */}
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxwYXRoIGQ9Ik0wIDBMNCA0Wk00IDBMMCA0WiIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+')]"></div>
      </div>

      <div className="mt-4 h-6 text-center">
        <motion.p
          key={messageIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-sm font-bold uppercase tracking-wider text-gray-400">
          {progress < 100 ? messages[messageIndex] : "¡Vamos!"}
        </motion.p>
      </div>

      <div className="absolute bottom-10 text-xs text-gray-600 font-mono">
        {Math.round(progress)}%
      </div>
    </div>
  );
};
