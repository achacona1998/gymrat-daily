import React, { useMemo } from "react";
import { useApp } from "../context/AppContext";
import { achievementsList } from "../data/achievements";
import { calculateStreak } from "../utils/gamification";
import { motion } from "framer-motion";
import {
  Trophy,
  Lock,
  Flame,
  Star,
  Crown,
  Medal,
  TrendingUp,
} from "lucide-react";

export const Achievements = () => {
  const {
    achievements,
    history,
    totalXP,
    currentLevel,
    nextLevel,
    userProfile,
  } = useApp();
  const streak = calculateStreak(history);

  const unlockedIds = achievements.map((a) => a.id);

  const progressPercent = useMemo(() => {
    if (nextLevel.level === "MAX") return 100;
    const currentLevelBaseXP = currentLevel.xp;
    const nextLevelTargetXP = nextLevel.xp;
    const needed = nextLevelTargetXP - currentLevelBaseXP;
    const gained = totalXP - currentLevelBaseXP;
    return Math.min(100, Math.max(0, (gained / needed) * 100));
  }, [totalXP, currentLevel, nextLevel]);

  // Mock Leaderboard Data
  const leaderboard = useMemo(() => {
    const mockUsers = [
      { id: "u1", name: "SpartanKing", xp: 5800, level: 10, isUser: false },
      { id: "u2", name: "GymRat99", xp: 4200, level: 9, isUser: false },
      { id: "u3", name: "IronLady", xp: 3500, level: 8, isUser: false },
      {
        id: "me",
        name: userProfile?.name || "Tú",
        xp: totalXP,
        level: currentLevel.level,
        isUser: true,
      },
      { id: "u4", name: "NewbieJoe", xp: 1200, level: 5, isUser: false },
    ];
    return mockUsers.sort((a, b) => b.xp - a.xp);
  }, [totalXP, currentLevel, userProfile]);

  return (
    <div className="pb-20 px-4 pt-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-black italic tracking-wide text-gray-800 border-l-4 border-primary pl-3 mb-6 uppercase dark:text-white">
        Progreso y Logros
      </h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Level Card */}
        <div className="bg-gray-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden dark:bg-gray-800">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Crown size={120} />
          </div>

          <div className="relative z-10 flex items-center gap-4 mb-4">
            <div className="w-20 h-20 rounded-full bg-linear-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg border-4 border-gray-800 dark:border-gray-700 shrink-0">
              <span className="text-3xl font-black text-white">
                {currentLevel.level}
              </span>
            </div>
            <div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">
                Nivel Actual
              </p>
              <h3 className="text-2xl font-black italic text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-white">
                {currentLevel.title}
              </h3>
              <p className="text-sm font-medium text-gray-300 flex items-center gap-1">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                {totalXP} XP Totales
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative z-10">
            <div className="flex justify-between text-xs font-bold text-gray-400 mb-1">
              <span>{currentLevel.xp} XP</span>
              <span>
                {nextLevel.level === "MAX" ? "MAX" : `${nextLevel.xp} XP`}
              </span>
            </div>
            <div className="h-4 bg-gray-700 rounded-full overflow-hidden border border-gray-600 dark:bg-gray-900">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-linear-to-r from-primary to-red-500"
              />
            </div>
            {nextLevel.level !== "MAX" && (
              <p className="text-xs text-center mt-2 text-gray-400">
                Faltan{" "}
                <span className="text-white font-bold">
                  {nextLevel.xp - totalXP} XP
                </span>{" "}
                para {nextLevel.title}
              </p>
            )}
          </div>
        </div>

        {/* Streak Banner */}
        <div className="bg-linear-to-r from-orange-500 to-red-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden flex flex-col justify-center items-center">
          <div className="absolute right-0 top-0 opacity-20">
            <Flame size={100} />
          </div>
          <div className="relative z-10 text-center">
            <p className="text-sm font-bold uppercase tracking-wider mb-2">
              Racha Actual
            </p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-6xl font-black italic">{streak}</span>
              <span className="text-xl font-bold mt-4">Días</span>
            </div>
            <p className="text-xs opacity-80 mt-2">
              ¡Sigue entrenando para mantener el fuego encendido!
            </p>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-white rounded-2xl p-6 shadow-md mb-8 border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2 dark:text-white">
          <TrendingUp size={20} className="text-primary" />
          Tabla de Clasificación
        </h3>
        <div className="space-y-3">
          {leaderboard.map((user, index) => (
            <div
              key={user.id}
              className={`flex items-center p-3 rounded-xl border ${
                user.isUser
                  ? "bg-primary/5 border-primary/20 ring-1 ring-primary/30 dark:bg-primary/20 dark:border-primary/30"
                  : "bg-gray-50 border-gray-100 dark:bg-gray-700/50 dark:border-gray-700"
              }`}>
              <div className="w-8 font-black text-gray-400 text-lg flex justify-center">
                {index + 1}
              </div>
              <div className="flex-1 px-3 min-w-0">
                <p
                  className={`font-bold text-sm truncate ${
                    user.isUser
                      ? "text-primary"
                      : "text-gray-700 dark:text-gray-200"
                  }`}>
                  {user.name} {user.isUser && "(Tú)"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Nivel {user.level}
                </p>
              </div>
              <div className="font-mono font-bold text-sm text-gray-600 bg-white px-2 py-1 rounded border border-gray-200 shadow-sm dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600">
                {user.xp} XP
              </div>
              {index === 0 && (
                <Crown size={16} className="text-yellow-500 ml-2" />
              )}
              {index === 1 && (
                <Medal size={16} className="text-gray-400 ml-2" />
              )}
              {index === 2 && (
                <Medal size={16} className="text-amber-700 ml-2" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Achievements Grid */}
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2 dark:text-white">
        <Trophy size={20} className="text-yellow-500" />
        Colección de Trofeos
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {achievementsList.map((achievement, index) => {
          const isUnlocked = unlockedIds.includes(achievement.id);
          const Icon = achievement.icon;

          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-4 rounded-xl border-2 flex flex-col items-center text-center h-48 justify-center ${
                isUnlocked
                  ? "bg-white border-primary shadow-md dark:bg-gray-800"
                  : "bg-gray-50 border-gray-200 opacity-70 grayscale dark:bg-gray-800/50 dark:border-gray-700"
              }`}>
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${
                  isUnlocked ? achievement.bgColor : "bg-gray-200 dark:bg-gray-700"
                }`}>
                <Icon
                  size={32}
                  className={
                    isUnlocked
                      ? achievement.color
                      : "text-gray-400 dark:text-gray-500"
                  }
                />
              </div>

              <h3 className="font-bold text-gray-800 text-sm mb-1 leading-tight dark:text-white">
                {achievement.title}
              </h3>
              <p className="text-[10px] text-gray-500 leading-tight mb-2 dark:text-gray-400">
                {achievement.description}
              </p>

              <div className="mt-auto inline-block bg-gray-100 px-2 py-0.5 rounded text-[10px] font-bold text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                +{achievement.xp} XP
              </div>

              {!isUnlocked && (
                <div className="absolute top-2 right-2 text-gray-400">
                  <Lock size={14} />
                </div>
              )}

              {isUnlocked && (
                <div className="absolute -top-3 -right-3 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-1 rounded-full shadow-sm flex items-center gap-1">
                  <Trophy size={10} />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
