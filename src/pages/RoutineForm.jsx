import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { v4 as uuidv4 } from "uuid";
import {
  Plus,
  Trash2,
  Save,
  ArrowLeft,
  Dumbbell,
  Calendar,
  Clock,
  Hash,
  Repeat,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DAYS = [
  { id: 1, name: "Lunes" },
  { id: 2, name: "Martes" },
  { id: 3, name: "Miércoles" },
  { id: 4, name: "Jueves" },
  { id: 5, name: "Viernes" },
  { id: 6, name: "Sábado" },
  { id: 0, name: "Domingo" },
];

import { exercises as exercisesList } from "../data/exercises";

export const RoutineForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { routines, addRoutine } = useApp();

  // Get day from URL query params
  const queryParams = new URLSearchParams(location.search);
  const initialDay = queryParams.get("day");

  const [name, setName] = useState("");
  const [day, setDay] = useState(initialDay ? parseInt(initialDay) : 1);
  const [exercises, setExercises] = useState([]);
  const [suggestions, setSuggestions] = useState({}); // { index: [suggestion1, suggestion2] }

  useEffect(() => {
    if (id) {
      const routine = routines.find((r) => r.id === id);
      if (routine) {
        setName(routine.name);
        setDay(routine.day);
        setExercises(routine.exercises);
      }
    }
  }, [id, routines]);

  const addExercise = () => {
    setExercises([
      ...exercises,
      {
        id: uuidv4(),
        name: "",
        sets: 3,
        reps: 10,
        weight: 0,
        rest: 60,
      },
    ]);
  };

  const updateExerciseField = (index, field, value) => {
    const newExercises = [...exercises];
    newExercises[index][field] = value;
    setExercises(newExercises);

    if (field === "name") {
      if (value.trim().length > 1) {
        const matches = exercisesList
          .filter((ex) => ex.name.toLowerCase().includes(value.toLowerCase()))
          .slice(0, 5); // Limit to 5 suggestions
        setSuggestions({ ...suggestions, [index]: matches });
      } else {
        const newSuggestions = { ...suggestions };
        delete newSuggestions[index];
        setSuggestions(newSuggestions);
      }
    }
  };

  const selectSuggestion = (index, suggestionName) => {
    updateExerciseField(index, "name", suggestionName);
    const newSuggestions = { ...suggestions };
    delete newSuggestions[index];
    setSuggestions(newSuggestions);
  };

  const removeExercise = (index) => {
    const newExercises = exercises.filter((_, i) => i !== index);
    setExercises(newExercises);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!name.trim()) return;

    const routine = {
      id: id || uuidv4(),
      name,
      day: parseInt(day),
      exercises,
    };

    addRoutine(routine);
    navigate("/routines");
  };

  return (
    <div className="pb-32 px-4 pt-6 bg-gray-50 min-h-screen dark:bg-gray-900">
      <div className="flex justify-between items-center mb-8 sticky top-0 bg-gray-50 z-10 py-2 dark:bg-gray-900">
        <div className="flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 p-2 bg-white rounded-full shadow-md text-gray-600 hover:text-primary transition dark:bg-gray-800 dark:text-gray-300">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-2xl font-black italic uppercase tracking-wide text-gray-800 dark:text-white">
            {id ? "Editar Rutina" : "Nueva Rutina"}
          </h2>
        </div>
        <button
          onClick={handleSubmit}
          className="p-2 bg-primary text-white rounded-full shadow-md hover:bg-red-700 transition"
          title="Guardar Rutina">
          <Save size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
          <div className="relative">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">
              Nombre
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-sport pl-12 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                placeholder="Ej: PECHO & TRÍCEPS"
                required
              />
              <Dumbbell
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">
              Día
            </label>
            <div className="relative">
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="input-sport pl-12 appearance-none cursor-pointer dark:bg-gray-700 dark:text-white dark:border-gray-600">
                {DAYS.map((d) => (
                  <option key={d.id} value={d.id} className="dark:bg-gray-800">
                    {d.name}
                  </option>
                ))}
              </select>
              <Calendar
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-end border-b-2 border-gray-200 pb-2 px-2 dark:border-gray-700">
            <h3 className="font-black text-xl italic text-gray-800 dark:text-white">
              EJERCICIOS
            </h3>
            <span className="text-xs font-bold bg-primary text-white px-2 py-1 rounded-full">
              {exercises.length}
            </span>
          </div>

          <AnimatePresence mode="popLayout">
            {exercises.map((ex, index) => (
              <motion.div
                key={ex.id || index}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="card-sport p-5 border-l-4 border-l-secondary relative overflow-visible dark:bg-gray-800 dark:border-l-secondary">
                <button
                  type="button"
                  onClick={() => removeExercise(index)}
                  className="absolute -top-3 -right-3 p-2 bg-white text-red-500 rounded-full shadow-md hover:bg-red-500 hover:text-white transition z-10 border border-gray-100 dark:bg-gray-700 dark:border-gray-600">
                  <Trash2 size={16} />
                </button>

                <div className="mb-4 relative">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 block">
                    Nombre del Ejercicio
                  </label>
                  <input
                    type="text"
                    value={ex.name}
                    onChange={(e) =>
                      updateExerciseField(index, "name", e.target.value)
                    }
                    className="w-full font-bold text-lg border-b-2 border-gray-100 focus:border-secondary outline-none placeholder-gray-300 transition-colors bg-transparent py-1 text-gray-800 dark:text-white dark:border-gray-700 dark:placeholder-gray-600"
                    placeholder="NOMBRE EJERCICIO"
                    required
                    autoComplete="off"
                  />
                  {suggestions[index] && suggestions[index].length > 0 && (
                    <div className="absolute z-50 left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-100 max-h-48 overflow-y-auto dark:bg-gray-800 dark:border-gray-700">
                      {suggestions[index].map((s) => (
                        <div
                          key={s.id}
                          onClick={() => selectSuggestion(index, s.name)}
                          className="px-4 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0 dark:hover:bg-gray-700 dark:border-gray-700">
                          <p className="font-bold text-sm text-gray-800 dark:text-white">
                            {s.name}
                          </p>
                          <p className="text-[10px] text-gray-400 uppercase">
                            {s.category}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-4 gap-3">
                  <div className="bg-gray-50 p-2 rounded-lg text-center border border-gray-100 dark:bg-gray-700/50 dark:border-gray-600">
                    <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 flex justify-center items-center gap-1">
                      <Hash size={10} /> Series
                    </label>
                    <input
                      type="number"
                      value={ex.sets}
                      onChange={(e) =>
                        updateExerciseField(
                          index,
                          "sets",
                          parseInt(e.target.value) || 0,
                        )
                      }
                      className="w-full text-center font-bold bg-transparent outline-none text-gray-800 dark:text-white"
                    />
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg text-center border border-gray-100 dark:bg-gray-700/50 dark:border-gray-600">
                    <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 flex justify-center items-center gap-1">
                      <Repeat size={10} /> Reps
                    </label>
                    <input
                      type="number"
                      value={ex.reps}
                      onChange={(e) =>
                        updateExerciseField(
                          index,
                          "reps",
                          parseInt(e.target.value) || 0,
                        )
                      }
                      className="w-full text-center font-bold bg-transparent outline-none text-gray-800 dark:text-white"
                    />
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg text-center border border-gray-100 dark:bg-gray-700/50 dark:border-gray-600">
                    <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 flex justify-center items-center gap-1">
                      <Dumbbell size={10} /> Kg
                    </label>
                    <input
                      type="number"
                      value={ex.weight}
                      onChange={(e) =>
                        updateExerciseField(
                          index,
                          "weight",
                          parseFloat(e.target.value) || 0,
                        )
                      }
                      className="w-full text-center font-bold bg-transparent outline-none text-gray-800 dark:text-white"
                    />
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg text-center border border-gray-100 dark:bg-gray-700/50 dark:border-gray-600">
                    <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 flex justify-center items-center gap-1">
                      <Clock size={10} /> Desc.
                    </label>
                    <input
                      type="number"
                      value={ex.rest}
                      onChange={(e) =>
                        updateExerciseField(
                          index,
                          "rest",
                          parseInt(e.target.value) || 0,
                        )
                      }
                      className="w-full text-center font-bold bg-transparent outline-none text-gray-800 dark:text-white"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <button
            type="button"
            onClick={addExercise}
            className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-400 font-bold flex items-center justify-center gap-2 hover:border-primary hover:text-primary transition-colors group bg-white dark:bg-gray-800 dark:border-gray-600">
            <div className="bg-gray-100 p-2 rounded-full group-hover:bg-primary group-hover:text-white transition-colors dark:bg-gray-700">
              <Plus size={20} />
            </div>
            AGREGAR EJERCICIO
          </button>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-20 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] dark:bg-gray-800 dark:border-gray-700">
          <button
            type="submit"
            className="btn-primary w-full shadow-orange-500/30">
            <Save size={20} /> GUARDAR RUTINA
          </button>
        </div>
      </form>
    </div>
  );
};
