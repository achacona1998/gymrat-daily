import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw } from "lucide-react";

export const ErrorState = ({ title = "Algo salió mal", message, onRetry }) => {
  const motivationalQuotes = [
    "El dolor es temporal, la gloria es eterna. ¡Inténtalo de nuevo!",
    "No te rindas, cada fallo es un paso hacia el éxito.",
    "Hasta los mejores atletas tienen días malos. ¡Levántate!",
    "La persistencia es la clave del progreso.",
    "Respira hondo, concéntrate y vuelve a intentarlo.",
  ];

  const randomQuote =
    motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center h-64">
      <motion.div
        initial={{ rotate: -10, scale: 0.8 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="bg-red-50 p-6 rounded-full mb-4 text-red-500 dark:bg-red-900/20 dark:text-red-400">
        <AlertTriangle size={48} />
      </motion.div>

      <h3 className="text-xl font-display font-bold text-gray-800 uppercase italic mb-2 dark:text-gray-200">
        {title}
      </h3>

      <p className="text-gray-500 mb-6 max-w-xs mx-auto dark:text-gray-400">
        {message || randomQuote}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-6 py-2 bg-gray-900 text-white rounded-lg font-bold uppercase tracking-wider hover:bg-primary transition-colors dark:bg-gray-700 dark:hover:bg-primary">
          <RefreshCw size={18} /> Reintentar
        </button>
      )}
    </div>
  );
};
