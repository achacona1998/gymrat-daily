import React from "react";
import { useApp } from "../context/AppContext";
import {
  format,
  parseISO,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  subWeeks,
} from "date-fns";
import { es } from "date-fns/locale";
import {
  Clock,
  CheckCircle,
  Calendar as CalendarIcon,
  TrendingUp,
  Dumbbell,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { ErrorState } from "../components/ErrorState";

export const History = () => {
  const { history, userProfile } = useApp();

  // Calculate stats
  const totalWorkouts = history.length;
  const totalTime = history.reduce((acc, curr) => acc + curr.duration, 0);
  const avgTime =
    totalWorkouts > 0 ? Math.round(totalTime / totalWorkouts / 60) : 0;

  // Calculate total XP (approximate for display)
  const totalXP = history.length * 10; // Base XP

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const sortedHistory = [...history].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  // Weekly Activity Chart Logic
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 }); // Monday start
  const weekEnd = endOfWeek(today, { weekStartsOn: 1 });
  const daysInWeek = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const workoutsByDay = daysInWeek
    .map((day) => {
      const count = history.filter((h) =>
        isSameDay(parseISO(h.date), day),
      ).length;
      return {
        day: format(day, "EEEEE", { locale: es }).toUpperCase(), // L, M, X...
        fullDay: format(day, "EEEE", { locale: es }),
        count,
        isToday: isSameDay(day, today),
      };
    })
    .filter((item) => {
      if (!userProfile?.trainingDays || userProfile.trainingDays.length === 0)
        return true;
      return userProfile.trainingDays.some(
        (d) => d.toLowerCase() === item.fullDay.toLowerCase(),
      );
    });

  const maxWorkouts = Math.max(...workoutsByDay.map((d) => d.count), 5); // Minimum scale of 5

  return (
    <div className="pb-20 px-4 pt-6">
      <h2 className="text-2xl font-black italic tracking-wide text-gray-800 border-l-4 border-primary pl-3 mb-6 uppercase dark:text-white">
        Historial
      </h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-gray-900 p-4 rounded-2xl text-white shadow-lg relative overflow-hidden flex flex-col justify-between h-32 dark:bg-black/50">
          <div className="absolute right-0 top-0 p-3 opacity-10">
            <CheckCircle size={60} />
          </div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Total Entrenos
          </p>
          <div>
            <p className="text-4xl font-mono font-black text-primary leading-none">
              {totalWorkouts}
            </p>
            <p className="text-[10px] text-gray-400 mt-1">
              Sesiones completadas
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-100 relative overflow-hidden flex flex-col justify-between h-32 dark:bg-gray-800 dark:border-gray-700">
          <div className="absolute right-0 top-0 p-3 opacity-5">
            <Clock size={60} className="dark:text-white" />
          </div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Tiempo Total
          </p>
          <div>
            <p className="text-2xl font-mono font-black text-gray-800 leading-none dark:text-white">
              {Math.round(totalTime / 60)}
              <span className="text-sm font-sans text-gray-400 ml-1">min</span>
            </p>
            <p className="text-[10px] text-gray-400 mt-1">Invertidos en ti</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-100 relative overflow-hidden flex flex-col justify-between h-24 col-span-2 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                XP Ganada
              </p>
              <p className="text-3xl font-mono font-black text-yellow-500 leading-none flex items-center gap-2">
                <Zap size={24} className="fill-yellow-500" />
                {totalXP}
              </p>
            </div>
            <div className="h-full flex items-center pr-4 opacity-10">
              <TrendingUp size={48} className="dark:text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Activity Chart */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-6">
          <div className="bg-primary/10 p-2 rounded-lg text-primary dark:bg-primary/20">
            <CalendarIcon size={20} />
          </div>
          <h3 className="font-bold text-gray-800 uppercase text-sm tracking-wide dark:text-white">
            Esta Semana
          </h3>
        </div>

        <div className="flex justify-between items-end h-24 px-2">
          {workoutsByDay.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center gap-2 w-full group relative">
              <div className="relative w-full flex justify-center h-full items-end">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{
                    height: `${item.count > 0 ? (item.count / 3) * 100 : 4}%`,
                  }} // Scale based on max 3 workouts/day reasonable
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className={`w-3 rounded-t-full ${item.isToday ? "bg-primary" : item.count > 0 ? "bg-gray-800 dark:bg-gray-400" : "bg-gray-100 dark:bg-gray-700"}`}
                  style={{ maxHeight: "100%" }}
                />
              </div>
              <span
                className={`text-[10px] font-bold uppercase ${item.isToday ? "text-primary" : "text-gray-400"}`}>
                {item.day}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <h3 className="font-bold text-gray-800 uppercase text-sm tracking-wide mb-4 pl-2 border-l-4 border-gray-800 dark:text-white dark:border-white">
        Sesiones Recientes
      </h3>

      <div className="space-y-6 relative pl-4">
        {/* Timeline line */}
        <div className="absolute left-[27px] top-2 bottom-0 w-0.5 bg-gray-200 -z-10 dark:bg-gray-700"></div>

        {sortedHistory.length > 0 ? (
          sortedHistory.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative pl-8">
              {/* Timeline Dot */}
              <div className="absolute left-0 top-0 w-6 h-6 bg-white border-4 border-gray-300 rounded-full z-10 shadow-sm mt-4 dark:bg-gray-800 dark:border-gray-600"></div>

              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1 block">
                      {format(parseISO(entry.date), "EEEE, d MMM", {
                        locale: es,
                      })}
                    </span>
                    <h3 className="font-display font-black text-xl text-gray-900 uppercase italic leading-none dark:text-white">
                      {entry.routineName}
                    </h3>
                  </div>
                  <div className="bg-gray-50 px-2 py-1 rounded text-xs font-bold text-gray-500 font-mono dark:bg-gray-700 dark:text-gray-300">
                    {format(parseISO(entry.date), "HH:mm")}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 py-3 border-t border-gray-50 border-b mb-3 dark:border-gray-700">
                  <div className="text-center">
                    <Clock size={14} className="mx-auto text-gray-400 mb-1" />
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                      {Math.floor(entry.duration / 60)}m
                    </span>
                  </div>
                  <div className="text-center border-l border-gray-100 dark:border-gray-700">
                    <Dumbbell
                      size={14}
                      className="mx-auto text-gray-400 mb-1"
                    />
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                      {entry.completedSets} Series
                    </span>
                  </div>
                  <div className="text-center border-l border-gray-100 dark:border-gray-700">
                    <Zap size={14} className="mx-auto text-yellow-400 mb-1" />
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                      +10 XP
                    </span>
                  </div>
                </div>

                {/* Exercise Preview (first 3) */}
                {entry.exercises && (
                  <div className="space-y-1">
                    {entry.exercises.slice(0, 2).map((ex, i) => (
                      <p
                        key={i}
                        className="text-xs text-gray-500 flex items-center gap-2 dark:text-gray-400">
                        <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                        {ex.name}{" "}
                        <span className="text-gray-300 text-[10px] dark:text-gray-500">
                          ({ex.sets.length} series)
                        </span>
                      </p>
                    ))}
                    {entry.exercises.length > 2 && (
                      <p className="text-[10px] text-gray-400 italic pl-3 dark:text-gray-500">
                        + {entry.exercises.length - 2} ejercicios más...
                      </p>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))
        ) : (
          <div className="pl-4">
            <ErrorState
              title="Sin Historial"
              message="Aún no has completado ningún entrenamiento. ¡Tu leyenda comienza hoy!"
            />
          </div>
        )}
      </div>
    </div>
  );
};
