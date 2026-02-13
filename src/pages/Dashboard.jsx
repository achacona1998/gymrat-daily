import React from "react";
import { useApp } from "../context/AppContext";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Link } from "react-router-dom";
import { Play, TrendingUp, Zap, Star } from "lucide-react";
import { motion } from "framer-motion";

export const Dashboard = () => {
  const { routines, userProfile, currentLevel } = useApp();
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.

  const todaysRoutines = routines.filter((r) => r.day === dayOfWeek);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="space-y-8"
      variants={container}
      initial="hidden"
      animate="show">
      <motion.div
        variants={item}
        className="relative bg-linear-to-br from-gray-900 to-gray-800 p-8 rounded-2xl shadow-2xl overflow-hidden text-white clip-sport-card">
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary blur-[60px] opacity-30 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-1 uppercase">
                HOLA,{" "}
                <span className="text-primary italic">
                  {userProfile?.name || "ATLETA"}
                </span>
              </h2>
              <p className="text-gray-400 capitalize font-medium flex items-center gap-2">
                <Zap size={16} className="text-yellow-400" />
                {format(today, "EEEE, d 'de' MMMM", { locale: es })}
              </p>
            </div>

            <div className="bg-gray-800/80 p-2 rounded-lg border border-gray-700 text-center min-w-[80px]">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">
                Nivel
              </p>
              <div className="flex items-center justify-center gap-1">
                <Star size={14} className="text-yellow-500 fill-yellow-500" />
                <span className="text-xl font-black text-white">
                  {currentLevel?.level || 1}
                </span>
              </div>
              <p className="text-[10px] text-primary font-bold truncate max-w-[80px]">
                {currentLevel?.title || "Novato"}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={item}>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800 border-l-4 border-primary pl-3 dark:text-white">
          ENTRENAMIENTO DE HOY
        </h3>

        {todaysRoutines.length > 0 ? (
          <div className="space-y-4">
            {todaysRoutines.map((routine) => (
              <motion.div
                key={routine.id}
                className="card-sport p-0 flex justify-between items-stretch group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}>
                <div className="p-5 flex-1 relative z-10">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <TrendingUp size={80} />
                  </div>
                  <h4 className="font-bold text-xl text-gray-900 uppercase tracking-wide mb-1 dark:text-white">
                    {routine.name}
                  </h4>
                  <p className="text-sm text-gray-500 font-medium flex items-center gap-2 dark:text-gray-400">
                    <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-bold text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                      {routine.exercises.length} Ejercicios
                    </span>
                  </p>
                </div>
                <Link
                  to={`/workout/${routine.id}`}
                  className="bg-primary w-16 flex items-center justify-center text-white clip-path-polygon hover:bg-red-600 transition-colors relative overflow-hidden">
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  <Play size={24} fill="currentColor" />
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-xl shadow-lg text-center border-2 border-dashed border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="inline-block p-4 bg-gray-50 rounded-full mb-4 dark:bg-gray-700">
              <Zap size={32} className="text-gray-400 dark:text-gray-500" />
            </div>
            <p className="text-gray-500 font-medium mb-4 dark:text-gray-400">
              Día de descanso o sin programar.
            </p>
            <Link
              to="/routines"
              className="text-primary font-bold hover:underline uppercase tracking-wide text-sm">
              Gestionar rutinas
            </Link>
          </div>
        )}
      </motion.div>

      {/* Sugerencia rápida */}
      <motion.div
        variants={item}
        className="bg-linear-to-r from-secondary to-blue-600 p-6 rounded-2xl shadow-xl text-white relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
        <div className="relative z-10">
          <h3 className="font-bold text-xl mb-2 italic">¿NEXT LEVEL?</h3>
          <p className="text-sm opacity-90 mb-4 font-medium max-w-[80%]">
            Descubre rutinas diseñadas por expertos para romper tus límites.
          </p>
          <Link
            to="/suggestions"
            className="inline-block bg-white text-blue-600 px-6 py-2 rounded-full text-sm font-bold shadow-md hover:bg-gray-100 transition transform hover:scale-105 uppercase tracking-wide">
            Explorar Rutinas
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};
