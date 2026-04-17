import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import { ToastContainer, TOAST_TYPES } from "../components/Toast";

// Create context
const ToastContext = createContext(null);

// Toast provider component
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const toastIdRef = useRef(0);

  // Add a new toast
  const addToast = useCallback((message, type = TOAST_TYPES.INFO, duration = 4000) => {
    const id = toastIdRef.current++;
    const newToast = {
      id,
      message,
      type,
      duration,
    };

    setToasts((prev) => [...prev, newToast]);

    return id;
  }, []);

  // Remove a toast by id
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Clear all toasts
  const clearAll = useCallback(() => {
    setToasts([]);
  }, []);

  // Convenience methods for common toast types
  const showSuccess = useCallback(
    (message, duration = 4000) => {
      return addToast(message, TOAST_TYPES.SUCCESS, duration);
    },
    [addToast]
  );

  const showError = useCallback(
    (message, duration = 4000) => {
      return addToast(message, TOAST_TYPES.ERROR, duration);
    },
    [addToast]
  );

  const showWarning = useCallback(
    (message, duration = 4000) => {
      return addToast(message, TOAST_TYPES.WARNING, duration);
    },
    [addToast]
  );

  const showInfo = useCallback(
    (message, duration = 4000) => {
      return addToast(message, TOAST_TYPES.INFO, duration);
    },
    [addToast]
  );

  const value = {
    addToast,
    removeToast,
    clearAll,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    toasts,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </ToastContext.Provider>
  );
};

// Hook to use toast
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    // Return no-op functions if not inside provider
    return {
      addToast: () => {},
      removeToast: () => {},
      clearAll: () => {},
      showSuccess: () => {},
      showError: () => {},
      showWarning: () => {},
      showInfo: () => {},
      toasts: [],
    };
  }
  return context;
};

export default ToastContext;