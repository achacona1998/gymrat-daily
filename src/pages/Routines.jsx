import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import {
  Plus,
  Trash2,
  Edit,
  Calendar,
  Play,
  Sparkles,
  Download,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { ErrorState } from "../components/ErrorState";

const SUGGESTED_ROUTINES = [
  {
    id: "sug-1",
    name: "Full Body Principiante",
    day: 1,
    exercises: [
      { name: "Sentadillas Copa", sets: 3, reps: 12 },
      { name: "Flexiones", sets: 3, reps: 10 },
      { name: "Remo con Mancuerna", sets: 3, reps: 12 },
      { name: "Plancha Abdominal", sets: 3, reps: "30s" },
    ],
    description: "Ideal para empezar a acondicionar todo el cuerpo.",
  },
  {
    id: "sug-2",
    name: "Torso Fuerza",
    day: 2,
    exercises: [
      { name: "Press Banca", sets: 4, reps: 8 },
      { name: "Dominadas", sets: 4, reps: 8 },
      { name: "Press Militar", sets: 3, reps: 10 },
      { name: "Curl de Bíceps", sets: 3, reps: 12 },
    ],
    description: "Enfocado en desarrollar fuerza en la parte superior.",
  },
  {
    id: "sug-3",
    name: "Pierna Hipertrofia",
    day: 4,
    exercises: [
      { name: "Sentadilla Libre", sets: 4, reps: 10 },
      { name: "Peso Muerto Rumano", sets: 3, reps: 12 },
      { name: "Zancadas", sets: 3, reps: 12 },
      { name: "Elevación de Gemelos", sets: 4, reps: 15 },
    ],
    description: "Volumen e intensidad para tren inferior.",
  },
];

export const Routines = () => {
  const { routines, deleteRoutine, addRoutine, userProfile } = useApp();
  const [selectedDay, setSelectedDay] = useState("all");
  const [showSuggested, setShowSuggested] = useState(false);
  const navigate = useNavigate();

  const allDaysDefinition = [
    { id: 1, label: "Lun", name: "Lunes" },
    { id: 2, label: "Mar", name: "Martes" },
    { id: 3, label: "Mié", name: "Miércoles" },
    { id: 4, label: "Jue", name: "Jueves" },
    { id: 5, label: "Vie", name: "Viernes" },
    { id: 6, label: "Sáb", name: "Sábado" },
    { id: 0, label: "Dom", name: "Domingo" },
  ];

  // Filter days based on user profile if available
  const userTrainingDays = userProfile?.trainingDays || [];

  const visibleDays =
    userTrainingDays.length > 0
      ? allDaysDefinition.filter((d) => userTrainingDays.includes(d.name))
      : allDaysDefinition;

  const days = visibleDays; // Only specific days, "All" is separate now

  const getDayName = (dayIndex) => {
    const names = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];
    return names[dayIndex];
  };

  const filteredRoutines = showSuggested
    ? SUGGESTED_ROUTINES
    : selectedDay === "all"
      ? routines.filter(
          (r) =>
            userTrainingDays.length === 0 ||
            userTrainingDays.includes(getDayName(r.day)),
        )
      : routines.filter((r) => r.day === selectedDay);

  // Sort by day if showing all and not suggested
  const sortedRoutines = showSuggested
    ? filteredRoutines
    : [...filteredRoutines].sort((a, b) => {
        if (a.day === 0) return 1;
        if (b.day === 0) return -1;
        return a.day - b.day;
      });

  const handleImportRoutine = (routine) => {
    try {
      // Create a unique ID safely (fallback for environments without crypto.randomUUID)
      const uniqueId =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : Date.now().toString(36) + Math.random().toString(36).substring(2);

      // Clone routine with new ID
      const newRoutine = {
        ...routine,
        id: uniqueId,
        name: routine.name,
      };

      addRoutine(newRoutine);
      alert("Rutina importada a tus rutinas!");
      setShowSuggested(false);
      setSelectedDay("all");
    } catch (error) {
      console.error("Error importing routine:", error);
      alert("Hubo un error al importar la rutina. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="pb-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold italic tracking-wide text-gray-800 border-l-4 border-primary pl-3 dark:text-white">
          {showSuggested ? "SUGERENCIAS" : "MIS RUTINAS"}
        </h2>
      </div>

      {/* Level 1: Main Filters */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={() => {
            setSelectedDay("all");
            setShowSuggested(false);
          }}
          className={clsx(
            "flex-1 py-3 rounded-xl font-black uppercase tracking-wider text-sm shadow-sm border-2 transition-all flex items-center justify-center gap-2",
            !showSuggested && selectedDay === "all"
              ? "bg-gray-800 text-white border-gray-800 dark:bg-gray-700 dark:border-gray-700"
              : "bg-white text-gray-500 border-gray-200 hover:border-gray-400 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 dark:hover:border-gray-500",
          )}>
          <Calendar size={18} /> Ver Todo
        </button>

        <button
          onClick={() => setShowSuggested(true)}
          className={clsx(
            "flex-1 py-3 rounded-xl font-black uppercase tracking-wider text-sm shadow-sm border-2 transition-all flex items-center justify-center gap-2",
            showSuggested
              ? "bg-primary text-white border-primary"
              : "bg-white text-primary border-primary/30 hover:bg-primary/5 dark:bg-gray-800 dark:hover:bg-gray-700",
          )}>
          <Sparkles size={18} /> Sugeridas
        </button>
      </div>

      {/* Level 2: Day Selectors (Only shown if not in Suggested mode) */}
      {!showSuggested && (
        <div className="flex overflow-x-auto gap-2 pb-4 mb-4 scrollbar-hide">
          {days.map((day) => (
            <button
              key={day.id}
              onClick={() => setSelectedDay(day.id)}
              className={clsx(
                "px-5 py-2 rounded-lg font-bold text-sm whitespace-nowrap transition-all transform hover:scale-105 uppercase tracking-wider min-w-16",
                selectedDay === day.id
                  ? "bg-primary text-white shadow-lg -skew-x-6"
                  : "bg-white text-gray-500 border border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700",
              )}>
              <span
                className={clsx(
                  selectedDay === day.id && "skew-x-6 inline-block",
                )}>
                {day.label}
              </span>
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-4">
        <AnimatePresence mode="popLayout">
          {sortedRoutines.map((routine) => (
            <motion.div
              key={routine.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={clsx(
                "card-sport p-5 group relative overflow-hidden",
                showSuggested && "border-2 border-primary/20",
              )}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-xs font-black text-primary uppercase tracking-widest mb-1 block">
                    {showSuggested ? "Sugerida" : getDayName(routine.day)}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 leading-none dark:text-white">
                    {routine.name}
                  </h3>
                  {routine.description && (
                    <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">
                      {routine.description}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  {showSuggested ? (
                    <button
                      onClick={() => handleImportRoutine(routine)}
                      className="p-2 bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-white transition shadow-sm dark:bg-primary/20"
                      title="Importar Rutina">
                      <Download size={20} />
                    </button>
                  ) : (
                    <>
                      <Link
                        to={`/routines/edit/${routine.id}`}
                        className="p-2 bg-gray-100 text-blue-600 rounded-full hover:bg-blue-50 transition shadow-sm dark:bg-gray-700 dark:text-blue-400 dark:hover:bg-gray-600">
                        <Edit size={16} />
                      </Link>
                      <button
                        onClick={() => {
                          if (window.confirm("¿Eliminar rutina?"))
                            deleteRoutine(routine.id);
                        }}
                        className="p-2 bg-gray-100 text-red-600 rounded-full hover:bg-red-50 transition shadow-sm dark:bg-gray-700 dark:text-red-400 dark:hover:bg-gray-600">
                        <Trash2 size={16} />
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-2 mb-4 bg-gray-50 p-3 rounded-lg border border-gray-100 dark:bg-gray-700/50 dark:border-gray-600">
                {routine.exercises.slice(0, 3).map((ex, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between text-sm text-gray-600 border-b border-dashed border-gray-200 pb-1 last:border-0 dark:text-gray-300 dark:border-gray-600">
                    <span className="font-medium">{ex.name}</span>
                    <span className="font-bold text-gray-400 dark:text-gray-500">
                      {ex.sets}x{ex.reps}
                    </span>
                  </div>
                ))}
                {routine.exercises.length > 3 && (
                  <p className="text-xs text-center text-gray-400 font-medium italic dark:text-gray-500">
                    + {routine.exercises.length - 3} ejercicios más
                  </p>
                )}
              </div>

              {!showSuggested && (
                <button
                  onClick={() => navigate(`/workout/${routine.id}`)}
                  className="w-full bg-gray-900 text-white py-3 rounded-lg font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-primary transition-colors shadow-lg dark:bg-primary dark:hover:bg-red-600">
                  <Play size={18} fill="currentColor" /> Iniciar Entreno
                </button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {sortedRoutines.length === 0 && (
          <ErrorState
            title={showSuggested ? "Sin Sugerencias" : "Sin Rutinas"}
            message={
              showSuggested
                ? "No hay rutinas sugeridas disponibles por el momento."
                : "No hay entrenamientos para este día. ¡Crea uno nuevo o importa una rutina sugerida!"
            }
          />
        )}
      </div>

      {!showSuggested && (
        <Link
          to={`/routines/new${selectedDay !== "all" ? `?day=${selectedDay}` : ""}`}
          className="fixed bottom-24 right-6 w-16 h-16 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-transform z-30 border-4 border-white/20">
          <Plus size={32} strokeWidth={3} />
        </Link>
      )}
    </div>
  );
};
