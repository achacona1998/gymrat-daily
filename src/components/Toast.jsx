import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Toast types
export const TOAST_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
};

// Toast colors mapping
const TOAST_COLORS = {
  [TOAST_TYPES.SUCCESS]: "#22c55e",
  [TOAST_TYPES.ERROR]: "#ef4444",
  [TOAST_TYPES.WARNING]: "#f59e0b",
  [TOAST_TYPES.INFO]: "#00d4ff",
};

// Icon mapping for toast types
const TOAST_ICONS = {
  [TOAST_TYPES.SUCCESS]: "✓",
  [TOAST_TYPES.ERROR]: "✕",
  [TOAST_TYPES.WARNING]: "!",
  [TOAST_TYPES.INFO]: "i",
};

// Single Toast component
export const Toast = ({ message, type = TOAST_TYPES.INFO, duration = 4000, onDismiss, id }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration]);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onDismiss) onDismiss(id);
    }, 200);
  };

  const accentColor = TOAST_COLORS[type] || TOAST_COLORS[TOAST_TYPES.INFO];
  const icon = TOAST_ICONS[type] || "i";

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={handleDismiss}
          className="cursor-pointer"
        >
          <div className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border-l-4 border-gray-200 hover:shadow-xl transition-shadow">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: accentColor }}
            >
              {icon}
            </div>
            <p className="flex-1 text-gray-800 dark:text-gray-100 font-medium text-sm">
              {message}
            </p>
            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1">
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Toast container for multiple toasts
export const ToastContainer = ({ toasts = [], onDismiss }) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4 flex flex-col gap-3">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onDismiss={onDismiss}
        />
      ))}
    </div>
  );
};

export default Toast;