import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import {
  convertWeightToDisplay,
  convertWeightToStorage,
  convertLengthToDisplay,
  convertLengthToStorage,
  getWeightUnitLabel,
  getLengthUnitLabel,
} from "../utils/units";
import { motion } from "framer-motion";
import {
  User,
  Ruler,
  Weight,
  Activity,
  Save,
  ChevronRight,
  TrendingDown,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { es } from "date-fns/locale";

export const Profile = () => {
  const { userProfile, updateUserProfile, currentLevel, settings } = useApp();
  const [name, setName] = useState(userProfile.name);
  const [height, setHeight] = useState(
    convertLengthToDisplay(userProfile.height, settings.units),
  );
  const [weight, setWeight] = useState(
    userProfile.weightHistory.length > 0
      ? convertWeightToDisplay(
          userProfile.weightHistory[userProfile.weightHistory.length - 1]
            .weight,
          settings.units,
        )
      : 0,
  );
  const [measurements, setMeasurements] = useState(() => {
    const lastMeasurements =
      userProfile.measurements[userProfile.measurements.length - 1] || {};
    return {
      chest: convertLengthToDisplay(
        lastMeasurements.chest || 0,
        settings.units,
      ),
      waist: convertLengthToDisplay(
        lastMeasurements.waist || 0,
        settings.units,
      ),
      arms: convertLengthToDisplay(lastMeasurements.arms || 0, settings.units),
      legs: convertLengthToDisplay(lastMeasurements.legs || 0, settings.units),
    };
  });

  const [bmi, setBmi] = useState(0);

  // Reminder Logic
  const lastUpdateDate =
    userProfile.weightHistory.length > 0
      ? new Date(
          userProfile.weightHistory[userProfile.weightHistory.length - 1].date,
        )
      : new Date();

  const daysSinceUpdate = differenceInDays(new Date(), lastUpdateDate);
  // Show reminder if more than 30 days have passed (simulating monthly reminder)
  // For testing purposes, you might want to lower this threshold, but per request it's monthly.
  const showReminder = daysSinceUpdate >= 30;

  useEffect(() => {
    const h = convertLengthToStorage(height, settings.units);
    const w = convertWeightToStorage(weight, settings.units);

    if (h > 0 && w > 0) {
      const heightInMeters = h / 100;
      setBmi((w / (heightInMeters * heightInMeters)).toFixed(1));
    }
  }, [height, weight, settings.units]);

  const handleSave = () => {
    const weightMetric = parseFloat(
      convertWeightToStorage(weight, settings.units),
    );
    const heightMetric = parseFloat(
      convertLengthToStorage(height, settings.units),
    );

    const measurementsMetric = {
      chest: parseFloat(
        convertLengthToStorage(measurements.chest, settings.units),
      ),
      waist: parseFloat(
        convertLengthToStorage(measurements.waist, settings.units),
      ),
      arms: parseFloat(
        convertLengthToStorage(measurements.arms, settings.units),
      ),
      legs: parseFloat(
        convertLengthToStorage(measurements.legs, settings.units),
      ),
    };

    const newWeightEntry = {
      date: new Date().toISOString(),
      weight: weightMetric,
    };
    const newMeasurementsEntry = {
      date: new Date().toISOString(),
      ...measurementsMetric,
    };

    // Only add new entries if they changed or it's the first one
    const lastWeight =
      userProfile.weightHistory[userProfile.weightHistory.length - 1];
    const updatedWeightHistory =
      !lastWeight || lastWeight.weight !== weightMetric
        ? [...userProfile.weightHistory, newWeightEntry]
        : userProfile.weightHistory;

    const updatedMeasurements = [
      ...userProfile.measurements,
      newMeasurementsEntry,
    ];

    updateUserProfile({
      ...userProfile,
      name,
      height: heightMetric,
      weightHistory: updatedWeightHistory,
      measurements: updatedMeasurements,
    });

    alert("Perfil actualizado correctamente");
  };

  const getBmiStatus = (bmiValue) => {
    if (bmiValue < 18.5) return { label: "Bajo Peso", color: "text-blue-500" };
    if (bmiValue < 24.9)
      return { label: "Peso Normal", color: "text-green-500" };
    if (bmiValue < 29.9)
      return { label: "Sobrepeso", color: "text-yellow-500" };
    return { label: "Obesidad", color: "text-red-500" };
  };

  const bmiStatus = getBmiStatus(bmi);

  return (
    <div className="pb-20 px-4 pt-6">
      <h2 className="text-2xl font-black italic tracking-wide text-gray-800 border-l-4 border-primary pl-3 mb-6 uppercase dark:text-white">
        Mi Perfil
      </h2>

      {/* Monthly Reminder */}
      {showReminder && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-xl shadow-sm flex items-start gap-4 dark:bg-red-900/20">
          <div className="bg-red-100 p-2 rounded-full shrink-0 dark:bg-red-900/50">
            <AlertCircle size={24} className="text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h4 className="font-bold text-red-700 uppercase tracking-wide text-sm mb-1 dark:text-red-400">
              Actualización Mensual Requerida
            </h4>
            <p className="text-red-600 text-sm dark:text-red-300">
              Han pasado {daysSinceUpdate} días desde tu última actualización.
              Por favor, registra tu peso y medidas actuales para seguir tu
              progreso con precisión.
            </p>
          </div>
        </motion.div>
      )}

      {/* Main Stats Card */}
      <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-xl mb-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10">
          <User size={120} />
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-gray-900 font-bold text-2xl border-4 border-white/20">
            {name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="text-gray-400 text-sm">
              Nivel {currentLevel?.level}: {currentLevel?.title}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-4">
          <div className="text-center">
            <p className="text-xs text-gray-400 uppercase mb-1">Peso</p>
            <p className="text-xl font-bold font-mono">
              {weight}{" "}
              <span className="text-xs text-primary">
                {getWeightUnitLabel(settings.units)}
              </span>
            </p>
          </div>
          <div className="text-center border-l border-white/10">
            <p className="text-xs text-gray-400 uppercase mb-1">Altura</p>
            <p className="text-xl font-bold font-mono">
              {height}{" "}
              <span className="text-xs text-primary">
                {getLengthUnitLabel(settings.units)}
              </span>
            </p>
          </div>
          <div className="text-center border-l border-white/10">
            <p className="text-xs text-gray-400 uppercase mb-1">IMC</p>
            <p
              className={`text-xl font-bold font-mono ${bmiStatus.color.replace("text-", "text-")}`}>
              {bmi}
            </p>
          </div>
        </div>
      </div>

      {/* Forms */}
      <div className="space-y-6">
        <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="font-bold text-gray-700 uppercase text-sm mb-4 flex items-center gap-2 dark:text-gray-200">
            <User size={18} className="text-primary" /> Datos Personales
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1 dark:text-gray-500">
                Nombre
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 font-bold text-gray-800 focus:outline-none focus:border-primary transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1 dark:text-gray-500">
                  Peso ({getWeightUnitLabel(settings.units)})
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 font-bold text-gray-800 focus:outline-none focus:border-primary transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <Weight
                    size={16}
                    className="absolute right-3 top-3.5 text-gray-400 dark:text-gray-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1 dark:text-gray-500">
                  Altura ({getLengthUnitLabel(settings.units)})
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 font-bold text-gray-800 focus:outline-none focus:border-primary transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <Ruler
                    size={16}
                    className="absolute right-3 top-3.5 text-gray-400 dark:text-gray-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="font-bold text-gray-700 uppercase text-sm mb-4 flex items-center gap-2 dark:text-gray-200">
            <Activity size={18} className="text-secondary" /> Medidas Corporales
            ({getLengthUnitLabel(settings.units)})
          </h3>

          <div className="grid grid-cols-2 gap-4">
            {["chest", "waist", "arms", "legs"].map((part) => (
              <div key={part}>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1 dark:text-gray-500">
                  {part === "chest"
                    ? "Pecho"
                    : part === "waist"
                      ? "Cintura"
                      : part === "arms"
                        ? "Brazos"
                        : "Piernas"}
                </label>
                <input
                  type="number"
                  value={measurements[part] || ""}
                  onChange={(e) =>
                    setMeasurements({
                      ...measurements,
                      [part]: parseFloat(e.target.value),
                    })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 font-bold text-gray-800 focus:outline-none focus:border-secondary transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            ))}
          </div>
        </section>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
          className="w-full bg-primary text-gray-900 font-black uppercase py-4 rounded-xl shadow-lg shadow-primary/30 flex items-center justify-center gap-2 text-lg">
          <Save size={20} /> Guardar Progreso
        </motion.button>
      </div>
    </div>
  );
};
