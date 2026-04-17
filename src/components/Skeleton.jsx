import React from "react";

export const Skeleton = ({ width = "100%", height = "20px", rounded = "md", className = "" }) => {
  const roundedClasses = {
    sm: "rounded",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  };

  return (
    <div
      className={`bg-gray-200 dark:bg-gray-700 animate-shimmer ${roundedClasses[rounded]} ${className}`}
      style={{ width, height }}
    />
  );
};

// Skeleton for list items
export const SkeletonList = ({ items = 5, className = "" }) => {
  return (
    <div className={`space-y-3 ${className}`} role="status" aria-label="Cargando contenido">
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="flex items-center gap-3">
          <Skeleton width="48px" height="48px" rounded="lg" />
          <div className="flex-1 space-y-2">
            <Skeleton width="60%" height="16px" />
            <Skeleton width="40%" height="12px" />
          </div>
        </div>
      ))}
    </div>
  );
};

// Skeleton for card
export const SkeletonCard = ({ className = "" }) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md ${className}`}
      role="status"
      aria-label="Cargando tarjeta"
    >
      <div className="flex items-center gap-3 mb-3">
        <Skeleton width="40px" height="40px" rounded="full" />
        <div className="flex-1 space-y-2">
          <Skeleton width="70%" height="16px" />
          <Skeleton width="50%" height="12px" />
        </div>
      </div>
      <Skeleton width="100%" height="60px" rounded="md" />
    </div>
  );
};

export default Skeleton;