import React from "react";
import { LoadingSpinner } from "./LoadingSpinner";

export const LoadingOverlay = ({ isLoading, message = "Cargando...", children }) => {
  if (!isLoading) return children;

  return (
    <div className="relative">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-40 flex flex-col items-center justify-center rounded-xl"
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <LoadingSpinner size="lg" />
        {message && (
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 font-medium">
            {message}
          </p>
        )}
      </div>
      
      {/* Content behind overlay (slightly faded) */}
      <div className="opacity-30 pointer-events-none">
        {children}
      </div>
    </div>
  );
};

export default LoadingOverlay;