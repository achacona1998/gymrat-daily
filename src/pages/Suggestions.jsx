import React, { useState } from "react";
import { SUGGESTIONS } from "../utils/suggestionsData";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  ArrowLeft,
  Check,
  Target,
  Zap,
  Trophy,
  Dumbbell,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Suggestions = () => {
  const [level, setLevel] = useState("beginner");
  const { addRoutine } = useApp();
  const navigate = useNavigate();

  const handleAdd = (template) => {
    const newRoutine = {
      id: uuidv4(),
      name: template.name,
      day: 1, // Default to Monday
      exercises: template.exercises.map((ex) => ({ ...ex, id: uuidv4() })),
    };
    addRoutine(newRoutine);
    navigate("/routines");
  };

  const levels = [
    {
      id: "beginner",
      label: "Principiante",
      icon: Target,
      color: "text-green-500",
      desc: "Fundamentos",
    },
    {
      id: "intermediate",
      label: "Intermedio",
      icon: Zap,
      color: "text-yellow-500",
      desc: "Progresión",
    },
    {
      id: "advanced",
      label: "Avanzado",
      icon: Trophy,
      color: "text-red-500",
      desc: "Alto Rendimiento",
    },
  ];

  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 active:scale-95 transition dark:bg-gray-800 dark:text-gray-200">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-display font-black italic uppercase text-gray-900 leading-none dark:text-white">
              Sugerencias
            </h2>
            <p className="text-xs font-bold text-primary uppercase tracking-widest">
              Encuentra tu rutina
            </p>
          </div>
        </div>
      </div>

      {/* Level Selector */}
      <div className="grid grid-cols-3 gap-2 bg-white p-2 rounded-2xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
        {levels.map((lvl) => (
          <button
            key={lvl.id}
            onClick={() => setLevel(lvl.id)}
            className={`relative flex flex-col items-center justify-center py-3 px-1 rounded-xl transition-all duration-300 ${
              level === lvl.id
                ? "text-gray-900 dark:text-white"
                : "text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
            }`}>
            {level === lvl.id && (
              <motion.div
                layoutId="activeLevel"
                className="absolute inset-0 bg-gray-100 rounded-xl dark:bg-gray-700"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10 mb-1">
              <lvl.icon
                size={20}
                className={level === lvl.id ? lvl.color : "currentColor"}
              />
            </span>
            <span
              className={`relative z-10 text-[10px] font-bold uppercase tracking-wider ${level === lvl.id ? "opacity-100" : "opacity-70"}`}>
              {lvl.label}
            </span>
          </button>
        ))}
      </div>

      {/* Description of current level */}
      <motion.div
        key={level}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900 text-white p-4 rounded-xl shadow-lg relative overflow-hidden dark:bg-gray-800 dark:border dark:border-gray-700">
        <div className="absolute right-0 top-0 opacity-10 p-2 transform translate-x-1/4 -translate-y-1/4">
          {level === "beginner" && <Target size={120} />}
          {level === "intermediate" && <Zap size={120} />}
          {level === "advanced" && <Trophy size={120} />}
        </div>
        <h3 className="text-lg font-display italic uppercase text-secondary mb-1">
          Nivel {levels.find((l) => l.id === level).label}
        </h3>
        <p className="text-sm text-gray-300 relative z-10">
          {level === "beginner" &&
            "Rutinas diseñadas para construir una base sólida y aprender la técnica correcta."}
          {level === "intermediate" &&
            "Aumenta la intensidad y volumen para estimular el crecimiento muscular."}
          {level === "advanced" &&
            "Entrenamientos de alta exigencia para romper estancamientos y maximizar resultados."}
        </p>
      </motion.div>

      {/* Suggestions List */}
      <div className="space-y-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={level}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-4">
            {SUGGESTIONS[level].map((template, idx) => (
              <motion.div
                key={template.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="card-sport group">
                <div className="p-5 border-l-4 border-l-secondary">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-display font-bold text-lg text-gray-800 uppercase italic dark:text-white">
                      {template.name}
                    </h3>
                    <div className="bg-gray-100 p-2 rounded-full text-gray-400 group-hover:bg-primary group-hover:text-white transition-colors duration-300 shrink-0 ml-2 dark:bg-gray-700 dark:text-gray-400">
                      <Dumbbell size={18} />
                    </div>
                  </div>

                  {template.description && (
                    <p className="text-xs text-gray-500 mb-3 leading-snug dark:text-gray-400">
                      {template.description}
                    </p>
                  )}

                  <div className="bg-gray-50 rounded-lg p-3 mb-4 border border-gray-100 dark:bg-gray-700/30 dark:border-gray-700">
                    <ul className="text-sm space-y-2">
                      {template.exercises.slice(0, 3).map((ex, i) => (
                        <li
                          key={i}
                          className="flex items-center text-gray-600 dark:text-gray-300">
                          <span className="w-1.5 h-1.5 bg-secondary rounded-full mr-2"></span>
                          <span className="font-medium text-gray-800 mr-1 dark:text-gray-200">
                            {ex.name}
                          </span>
                          <span className="text-xs text-gray-400 dark:text-gray-500">
                            ({ex.sets}x{ex.reps})
                          </span>
                        </li>
                      ))}
                      {template.exercises.length > 3 && (
                        <li className="text-xs text-center text-gray-400 font-medium italic pt-1 dark:text-gray-500">
                          + {template.exercises.length - 3} ejercicios más
                        </li>
                      )}
                    </ul>
                  </div>

                  <button
                    onClick={() => handleAdd(template)}
                    className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-bold uppercase tracking-wider text-sm hover:bg-primary transition-colors duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg dark:bg-gray-700 dark:hover:bg-primary">
                    <span>Usar esta rutina</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
