import React, { useState } from "react";
import { exercises, categories } from "../data/exercises";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ChevronRight, Dumbbell } from "lucide-react";

export const Exercises = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [expandedId, setExpandedId] = useState(null);

  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch = exercise.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Todos" || exercise.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pb-20 px-4 pt-6">
      <h2 className="text-2xl font-black italic tracking-wide text-gray-800 border-l-4 border-primary pl-3 mb-6 uppercase dark:text-white">
        Biblioteca de Ejercicios
      </h2>

      {/* Search and Filter */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar ejercicio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-12 pr-4 font-medium text-gray-700 focus:outline-none focus:border-primary shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-500"
          />
          <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setSelectedCategory("Todos")}
            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
              selectedCategory === "Todos"
                ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
            }`}>
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? "bg-primary text-gray-900 dark:text-white"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
              }`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Exercise List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredExercises.map((exercise) => (
            <motion.div
              key={exercise.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              layout
              className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden dark:bg-gray-800 dark:border-gray-700">
              <div
                onClick={() =>
                  setExpandedId(expandedId === exercise.id ? null : exercise.id)
                }
                className="p-4 flex items-center justify-between cursor-pointer active:bg-gray-50 transition-colors dark:active:bg-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary dark:bg-primary/20">
                    <Dumbbell size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-white">
                      {exercise.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {exercise.category} • {exercise.difficulty}
                    </p>
                  </div>
                </div>
                <ChevronRight
                  size={20}
                  className={`text-gray-400 transition-transform duration-300 ${expandedId === exercise.id ? "rotate-90" : ""}`}
                />
              </div>

              <AnimatePresence>
                {expandedId === exercise.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-4 pb-4 text-sm text-gray-600 border-t border-gray-50 bg-gray-50/50 dark:bg-gray-700/30 dark:border-gray-700 dark:text-gray-300">
                    <div className="pt-3">
                      <p className="mb-2">
                        <span className="font-bold text-gray-700 dark:text-gray-200">
                          Ejecución:
                        </span>{" "}
                        {exercise.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {exercise.muscles.map((muscle) => (
                          <span
                            key={muscle}
                            className="text-[10px] uppercase font-bold bg-white border border-gray-200 px-2 py-1 rounded text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
                            {muscle}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredExercises.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            <Filter size={48} className="mx-auto mb-2 opacity-20" />
            <p>No se encontraron ejercicios</p>
          </div>
        )}
      </div>
    </div>
  );
};
