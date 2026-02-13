import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../context/AppContext";
import { ChevronRight, User, Ruler, Weight, Target, Check, Calendar } from "lucide-react";
import clsx from "clsx";

export const Onboarding = () => {
  const { userProfile, updateUserProfile } = useApp();
  const [step, setStep] = useState(0);

  // Initialize with existing data if available (handling "Atleta" default)
  const [formData, setFormData] = useState({
    name: userProfile?.name !== "Atleta" ? userProfile?.name || "" : "",
    height: userProfile?.height || "",
    weight:
      userProfile?.weightHistory?.length > 0
        ? userProfile.weightHistory[userProfile.weightHistory.length - 1].weight
        : "",
    gender: userProfile?.gender || "male",
    goal: userProfile?.goal || "muscle",
    trainingDays: userProfile?.trainingDays || [],
  });

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleFinish = () => {
    // Avoid duplicate weight entries if running multiple times on same day
    // But for simplicity in onboarding, we append a new initial/update entry
    const newWeightEntry = {
      date: new Date().toISOString(),
      weight: Number(formData.weight),
    };

    updateUserProfile({
      ...userProfile, // Merge with existing profile data
      name: formData.name,
      height: Number(formData.height),
      gender: formData.gender,
      goal: formData.goal,
      trainingDays: formData.trainingDays,
      weightHistory: [...(userProfile?.weightHistory || []), newWeightEntry],
      onboardingCompleted: true,
    });
  };

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleDay = (day) => {
    setFormData((prev) => {
      const days = prev.trainingDays.includes(day)
        ? prev.trainingDays.filter((d) => d !== day)
        : [...prev.trainingDays, day];
      return { ...prev, trainingDays: days };
    });
  };

  const steps = [
    {
      id: "welcome",
      title: "¡Bienvenido!",
      subtitle: "Vamos a personalizar tu experiencia. ¿Cómo te llamas?",
      icon: User,
      content: (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Tu nombre"
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
            className="w-full p-4 bg-gray-800 border-2 border-gray-700 rounded-xl focus:border-primary focus:outline-none text-white text-xl text-center placeholder-gray-500"
            autoFocus
          />
        </div>
      ),
      isValid: () => formData.name.length > 1,
    },
    {
      id: "stats",
      title: "Tus Datos",
      subtitle: "Para calcular tu progreso necesitamos algunos detalles.",
      icon: Ruler,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-gray-400 text-sm uppercase font-bold">
                Altura (cm)
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="175"
                  value={formData.height}
                  onChange={(e) => updateField("height", e.target.value)}
                  className="w-full p-4 bg-gray-800 border-2 border-gray-700 rounded-xl focus:border-primary focus:outline-none text-white text-xl text-center"
                />
                <Ruler
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                  size={20}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-gray-400 text-sm uppercase font-bold">
                Peso (kg)
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="70"
                  value={formData.weight}
                  onChange={(e) => updateField("weight", e.target.value)}
                  className="w-full p-4 bg-gray-800 border-2 border-gray-700 rounded-xl focus:border-primary focus:outline-none text-white text-xl text-center"
                />
                <Weight
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                  size={20}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4 justify-center">
            {["male", "female"].map((g) => (
              <button
                key={g}
                onClick={() => updateField("gender", g)}
                className={clsx(
                  "px-6 py-3 rounded-xl border-2 font-bold transition-all",
                  formData.gender === g
                    ? "border-primary bg-primary/20 text-white"
                    : "border-gray-700 text-gray-500 hover:border-gray-500",
                )}>
                {g === "male" ? "Hombre" : "Mujer"}
              </button>
            ))}
          </div>
        </div>
      ),
      isValid: () => formData.height > 0 && formData.weight > 0,
    },
    {
      id: "schedule",
      title: "Días de Entreno",
      subtitle: "¿Qué días planeas ir al gimnasio?",
      icon: Calendar,
      content: (
        <div className="grid grid-cols-2 gap-3">
          {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((day) => (
            <button
              key={day}
              onClick={() => toggleDay(day)}
              className={clsx(
                "p-3 rounded-xl border-2 font-bold transition-all",
                formData.trainingDays.includes(day)
                  ? "border-primary bg-primary/20 text-white"
                  : "border-gray-700 text-gray-500 hover:border-gray-500"
              )}>
              {day}
            </button>
          ))}
        </div>
      ),
      isValid: () => formData.trainingDays.length > 0,
    },
    {
      id: "goals",
      title: "Tu Objetivo",
      subtitle: "¿Qué quieres lograr principalmente?",
      icon: Target,
      content: (
        <div className="grid grid-cols-1 gap-3">
          {[
            { id: "muscle", label: "Ganar Músculo", icon: "💪" },
            { id: "weight_loss", label: "Perder Peso", icon: "🔥" },
            { id: "strength", label: "Fuerza", icon: "🏋️‍♂️" },
            { id: "endurance", label: "Resistencia", icon: "🏃‍♂️" },
          ].map((goal) => (
            <button
              key={goal.id}
              onClick={() => updateField("goal", goal.id)}
              className={clsx(
                "p-4 rounded-xl border-2 flex items-center gap-4 transition-all text-left",
                formData.goal === goal.id
                  ? "border-primary bg-primary/20 text-white"
                  : "border-gray-700 text-gray-400 hover:border-gray-600",
              )}>
              <span className="text-2xl">{goal.icon}</span>
              <span className="font-bold text-lg">{goal.label}</span>
              {formData.goal === goal.id && (
                <Check className="ml-auto text-primary" />
              )}
            </button>
          ))}
        </div>
      ),
      isValid: () => !!formData.goal,
    },
  ];

  const currentStep = steps[step];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="z-10 w-full max-w-md">
        {/* Progress Bar */}
        <div className="mb-8 flex gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={clsx(
                "h-2 flex-1 rounded-full transition-all duration-300",
                i <= step ? "bg-primary" : "bg-gray-700",
              )}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800/50 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-700">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                <currentStep.icon size={32} />
              </div>
            </div>

            <h1 className="text-3xl font-display font-black text-center mb-2 uppercase italic">
              {currentStep.title}
            </h1>
            <p className="text-gray-400 text-center mb-8">
              {currentStep.subtitle}
            </p>

            {currentStep.content}

            <div className="mt-8">
              <button
                onClick={step === steps.length - 1 ? handleFinish : handleNext}
                disabled={!currentStep.isValid()}
                className={clsx(
                  "w-full py-4 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all transform",
                  currentStep.isValid()
                    ? "bg-linear-to-r from-primary to-orange-600 hover:shadow-lg hover:-translate-y-1 text-white shadow-primary/30"
                    : "bg-gray-700 text-gray-500 cursor-not-allowed",
                )}>
                {step === steps.length - 1 ? "Comenzar" : "Continuar"}
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
