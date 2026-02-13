import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";
import {
  Home,
  Dumbbell,
  Calendar,
  Activity,
  Menu,
  X,
  Settings,
  User,
  Trophy,
  Zap,
  ChevronRight,
  Book,
} from "lucide-react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

export const Layout = () => {
  const location = useLocation();
  const { userProfile, settings, currentLevel } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { icon: Home, label: "Inicio", path: "/" },
    { icon: Dumbbell, label: "Rutinas", path: "/routines" },
    { icon: Calendar, label: "Historial", path: "/history" },
  ];

  const menuItems = [
    {
      icon: Home,
      label: "Inicio",
      path: "/",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: User,
      label: "Mi Perfil",
      path: "/profile",
      color: "from-purple-500 to-indigo-600",
    },
    {
      icon: Dumbbell,
      label: "Mis Rutinas",
      path: "/routines",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Book,
      label: "Ejercicios",
      path: "/exercises",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: Trophy,
      label: "Logros",
      path: "/achievements",
      color: "from-yellow-400 to-orange-500",
    },
    {
      icon: Activity,
      label: "Sugerencias",
      path: "/suggestions",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: Calendar,
      label: "Historial",
      path: "/history",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: Settings,
      label: "Configuración",
      path: "/settings",
      color: "from-gray-600 to-gray-700",
    },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-100 text-gray-900 font-sans overflow-hidden dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Header */}
      <header className="bg-linear-to-r from-gray-900 to-gray-800 text-white p-4 shadow-lg sticky top-0 z-30 flex justify-between items-center overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-full bg-primary opacity-20 -skew-x-12 transform translate-x-10"></div>

        <div className="flex items-center gap-2 z-10">
          <Activity className="text-primary" size={28} />
          <h1 className="text-2xl font-display font-black tracking-widest italic text-shadow">
            GYMRAT<span className="text-primary">DAILY</span>
          </h1>
        </div>

        <button
          onClick={() => setIsMenuOpen(true)}
          className="relative z-10 p-2 text-white hover:text-primary transition-colors">
          <Menu size={28} />
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-80 bg-white z-50 shadow-2xl flex flex-col dark:bg-gray-800">
              <div className="p-6 bg-gray-900 text-white flex justify-between items-center">
                <h2 className="text-xl font-display font-bold italic uppercase">
                  Menú
                </h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {menuItems.map((item, idx) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group relative overflow-hidden rounded-2xl mb-4 shadow-md hover:shadow-xl transition-all">
                      <div
                        className={`absolute inset-0 bg-linear-to-br ${item.color} opacity-90`}></div>
                      <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-4 translate-y-4">
                        <item.icon size={80} className="text-white" />
                      </div>

                      <div className="relative z-10 p-5 flex items-center justify-between text-white">
                        <div className="flex items-center gap-4">
                          <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                            <item.icon size={24} />
                          </div>
                          <span className="font-bold text-lg tracking-wide uppercase italic">
                            {item.label}
                          </span>
                        </div>
                        <ChevronRight
                          size={20}
                          className="opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all"
                        />
                      </div>
                    </motion.div>
                  </Link>
                ))}

                <div className="mt-8 border-t border-gray-100 pt-6 dark:border-gray-700">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl dark:bg-gray-700/50">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-gray-900 font-bold text-xl border-2 border-white shadow-sm dark:border-gray-600">
                      {userProfile.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 dark:text-gray-100">
                        {userProfile.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Nivel {currentLevel?.level} - {currentLevel?.title}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 pb-24 scroll-smooth">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center p-2 pb-6 shadow-[0_-5px_20px_rgba(0,0,0,0.1)] z-20 rounded-t-3xl dark:bg-gray-800 dark:border-gray-700">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className="relative flex flex-col items-center p-2 group w-20">
              {isActive && (
                <motion.div
                  layoutId="nav-bg"
                  className="absolute inset-0 bg-orange-50 rounded-xl -z-10 dark:bg-orange-900/20"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <Icon
                size={24}
                className={clsx(
                  "transition-colors duration-300",
                  isActive
                    ? "text-primary stroke-[2.5px]"
                    : "text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300",
                )}
              />
              <span
                className={clsx(
                  "text-[10px] mt-1 font-bold uppercase tracking-wider transition-colors duration-300",
                  isActive
                    ? "text-primary"
                    : "text-gray-400 dark:text-gray-500",
                )}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="nav-dot"
                  className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full"
                />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
