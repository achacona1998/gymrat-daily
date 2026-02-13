import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { useTimer } from "../hooks/useTimer";
import { convertWeightToDisplay, getWeightUnitLabel } from "../utils/units";
import {
  ArrowLeft,
  Check,
  Timer,
  Play,
  Pause,
  SkipForward,
  Clock,
  Dumbbell,
  X,
  Zap,
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

export const Workout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { routines, history, addHistory, settings } = useApp();
  const routine = routines.find((r) => r.id === id);

  // Coach Tip Logic
  const [coachTip, setCoachTip] = useState(null);

  useEffect(() => {
    if (routine) {
      // Find last workout for this routine
      const lastWorkout = [...history]
        .reverse()
        .find((h) => h.routineId === routine.id);

      if (lastWorkout && lastWorkout.exercises) {
        // Compare first exercise
        const firstEx = routine.exercises[0];
        const lastEx = lastWorkout.exercises.find(
          (e) => e.name === firstEx.name,
        );

        if (lastEx) {
          if (lastEx.weight < firstEx.weight) {
            setCoachTip(
              `¡Has subido de peso! La última vez usaste ${lastEx.weight}kg en ${firstEx.name}. ¡Dale duro!`,
            );
          } else if (lastEx.weight === firstEx.weight) {
            setCoachTip(
              `La última vez levantaste ${lastEx.weight}kg en ${firstEx.name}. Si te sientes fuerte, intenta subir a ${parseFloat(firstEx.weight) + 2.5}kg en la última serie.`,
            );
          } else {
            setCoachTip(
              `Hoy es día de recuperación o técnica. Mantén el control.`,
            );
          }
        }
      } else if (!lastWorkout) {
        setCoachTip(
          "¡Primer entrenamiento de esta rutina! Concéntrate en la técnica y no te preocupes por el peso.",
        );
      }
    }
  }, [routine, history]);

  // Audio context ref to prevent recreation
  const audioCtxRef = useRef(null);

  const sessionTimer = useTimer(0, false);
  const restTimer = useTimer(0, true);

  const [completedSets, setCompletedSets] = useState({}); // { "exId-setIdx": true }
  const [showRestModal, setShowRestModal] = useState(false);

  useEffect(() => {
    sessionTimer.start();
    return () => sessionTimer.pause();
  }, []);

  useEffect(() => {
    if (restTimer.isFinished && showRestModal) {
      playAlarm();
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("¡TIEMPO!", {
          body: "A darle duro a la siguiente serie.",
        });
      }
      if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 500]);
    }
  }, [restTimer.isFinished]);

  const playAlarm = () => {
    if (settings && !settings.soundEnabled) return;

    if (!audioCtxRef.current) {
      audioCtxRef.current = new (
        window.AudioContext || window.webkitAudioContext
      )();
    }
    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.5, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  };

  const toggleSet = (exId, setIdx, restTime) => {
    const key = `${exId}-${setIdx}`;
    const isCompleted = !!completedSets[key];

    if (!isCompleted) {
      setCompletedSets((prev) => ({ ...prev, [key]: true }));
      // Start rest timer
      restTimer.reset(restTime);
      restTimer.start();
      setShowRestModal(true);
    } else {
      setCompletedSets((prev) => {
        const newState = { ...prev };
        delete newState[key];
        return newState;
      });
    }
  };

  const finishWorkout = () => {
    if (!window.confirm("¿Terminar entrenamiento?")) return;

    const historyEntry = {
      id: uuidv4(),
      date: new Date().toISOString(),
      routineId: routine.id,
      routineName: routine.name,
      duration: sessionTimer.time,
      completedSets: Object.keys(completedSets).length,
      exercises: routine.exercises, // Save snapshot
    };
    addHistory(historyEntry);
    navigate("/history");
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!routine)
    return (
      <div className="p-8 text-center font-bold text-xl">
        Rutina no encontrada
      </div>
    );

  return (
    <div className="pb-32 bg-gray-100 min-h-screen relative overflow-hidden dark:bg-gray-900">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-64 bg-gray-900 clip-sport-card z-0 dark:bg-gray-800"></div>

      {/* Header */}
      <header className="relative z-10 p-6 text-white flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition backdrop-blur-sm">
          <ArrowLeft />
        </button>
        <div className="flex flex-col items-end">
          <h2 className="text-sm font-bold opacity-70 tracking-widest">
            TIEMPO TOTAL
          </h2>
          <p className="text-3xl font-mono font-bold text-primary text-shadow">
            {formatTime(sessionTimer.time)}
          </p>
        </div>
      </header>

      <div className="px-6 relative z-10 -mt-4">
        <h1 className="text-3xl font-black italic text-white mb-8 text-shadow-lg uppercase tracking-wide">
          {routine.name}
        </h1>

        {coachTip && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-linear-to-r from-yellow-400 to-orange-500 p-4 rounded-xl text-white mb-6 shadow-lg flex items-start gap-3">
            <div className="bg-white/20 p-2 rounded-full">
              <Zap size={20} className="text-white" fill="currentColor" />
            </div>
            <div>
              <p className="font-bold text-xs uppercase tracking-wider opacity-80 mb-1">
                Entrenador Virtual
              </p>
              <p className="font-bold text-sm leading-tight">{coachTip}</p>
            </div>
          </motion.div>
        )}

        <div className="space-y-6">
          {routine.exercises.map((ex, idx) => (
            <motion.div
              key={ex.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="card-sport p-0 overflow-visible">
              <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-white rounded-t-xl dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 text-primary rounded-lg dark:bg-orange-900/30">
                    <Dumbbell size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 leading-tight dark:text-white">
                      {ex.name}
                    </h3>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1 dark:text-gray-400">
                      {ex.sets} Series • {ex.reps} Reps •{" "}
                      {convertWeightToDisplay(ex.weight, settings?.units)}
                      {getWeightUnitLabel(settings?.units)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-2 bg-gray-50 rounded-b-xl space-y-2 dark:bg-gray-700/30">
                {Array.from({ length: ex.sets }).map((_, i) => {
                  const isDone = completedSets[`${ex.id}-${i}`];
                  return (
                    <motion.button
                      key={i}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleSet(ex.id, i, ex.rest)}
                      className={clsx(
                        "w-full flex justify-between items-center p-3 rounded-lg border-2 transition-all font-bold",
                        isDone
                          ? "bg-green-500 border-green-600 text-white shadow-md transform translate-x-1"
                          : "bg-white border-gray-200 text-gray-600 hover:border-primary/50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:border-primary/50",
                      )}>
                      <span className="flex items-center gap-2">
                        <span
                          className={clsx(
                            "text-xs px-2 py-0.5 rounded",
                            isDone
                              ? "bg-white/20"
                              : "bg-gray-200 dark:bg-gray-700",
                          )}>
                          SET {i + 1}
                        </span>
                      </span>
                      <span className="flex items-center gap-2">
                        <span>{ex.reps} reps</span>
                        {isDone ? (
                          <Check size={20} strokeWidth={3} />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-500" />
                        )}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-linear-to-t from-white to-transparent z-20 pointer-events-none flex justify-center pb-8 dark:from-gray-900">
        <button
          onClick={finishWorkout}
          className="pointer-events-auto bg-gray-900 text-white font-black text-lg py-4 px-12 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-transform flex items-center gap-3 border-4 border-white dark:border-gray-700 dark:bg-primary">
          <Check size={24} className="text-primary dark:text-white" />
          TERMINAR ENTRENO
        </button>
      </div>

      {/* Rest Modal */}
      <AnimatePresence>
        {showRestModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900/95 backdrop-blur-sm text-white p-6">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="w-full max-w-sm flex flex-col items-center">
              <h3 className="text-3xl font-black italic tracking-widest mb-8 text-center uppercase">
                Descanso
              </h3>

              <div className="relative w-64 h-64 flex items-center justify-center mb-12">
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle
                    cx="128"
                    cy="128"
                    r="120"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-gray-800"
                  />
                  <motion.circle
                    cx="128"
                    cy="128"
                    r="120"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-primary"
                    initial={{ pathLength: 1 }}
                    animate={{ pathLength: restTimer.time / 60 }} // Approximate
                    transition={{ duration: 1, ease: "linear" }}
                  />
                </svg>
                <div className="text-7xl font-mono font-bold tracking-tighter text-shadow-lg">
                  {formatTime(restTimer.time)}
                </div>
              </div>

              <div className="flex gap-6 w-full justify-center">
                <button
                  onClick={() => restTimer.reset(restTimer.time + 10)}
                  className="flex flex-col items-center gap-1 text-xs font-bold uppercase tracking-wider hover:text-primary transition">
                  <div className="p-4 bg-gray-800 rounded-full mb-1 hover:bg-gray-700 transition">
                    <Clock size={24} />
                  </div>
                  +10s
                </button>

                <button
                  onClick={() => setShowRestModal(false)}
                  className="flex flex-col items-center gap-1 text-xs font-bold uppercase tracking-wider hover:text-red-500 transition">
                  <div className="p-6 bg-red-600 rounded-full mb-1 shadow-lg shadow-red-600/30 hover:bg-red-500 transition transform hover:scale-110">
                    <SkipForward size={32} fill="currentColor" />
                  </div>
                  Saltar
                </button>

                <button
                  onClick={() =>
                    restTimer.isActive ? restTimer.pause() : restTimer.start()
                  }
                  className="flex flex-col items-center gap-1 text-xs font-bold uppercase tracking-wider hover:text-blue-400 transition">
                  <div className="p-4 bg-gray-800 rounded-full mb-1 hover:bg-gray-700 transition">
                    {restTimer.isActive ? (
                      <Pause size={24} />
                    ) : (
                      <Play size={24} />
                    )}
                  </div>
                  {restTimer.isActive ? "Pausa" : "Seguir"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
