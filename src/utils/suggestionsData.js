import { v4 as uuidv4 } from "uuid";

export const SUGGESTIONS = {
  beginner: [
    {
      name: "Full Body Principiante",
      description:
        "Rutina de cuerpo completo ideal para empezar. Trabaja todos los grupos musculares principales.",
      exercises: [
        { name: "Sentadillas Copa", sets: 3, reps: 12, weight: 10, rest: 60 },
        {
          name: "Flexiones (o rodillas)",
          sets: 3,
          reps: 10,
          weight: 0,
          rest: 60,
        },
        { name: "Remo con mancuerna", sets: 3, reps: 12, weight: 8, rest: 60 },
        {
          name: "Press Militar Mancuernas",
          sets: 3,
          reps: 12,
          weight: 5,
          rest: 60,
        },
        { name: "Plancha Abdominal", sets: 3, reps: 30, weight: 0, rest: 60 }, // reps as seconds
      ],
    },
    {
      name: "Pierna en Casa",
      description: "Fortalece el tren inferior sin necesidad de equipamiento.",
      exercises: [
        {
          name: "Sentadillas con peso corporal",
          sets: 4,
          reps: 15,
          weight: 0,
          rest: 60,
        },
        { name: "Zancadas estáticas", sets: 3, reps: 12, weight: 0, rest: 60 },
        { name: "Puente de glúteo", sets: 3, reps: 15, weight: 0, rest: 45 },
        {
          name: "Elevación de talones",
          sets: 3,
          reps: 20,
          weight: 0,
          rest: 45,
        },
      ],
    },
    {
      name: "Cardio & Core",
      description: "Mejora tu resistencia y fortalece tu zona media.",
      exercises: [
        { name: "Jumping Jacks", sets: 3, reps: 30, weight: 0, rest: 30 },
        { name: "Mountain Climbers", sets: 3, reps: 20, weight: 0, rest: 45 },
        { name: "Crunch Abdominal", sets: 3, reps: 15, weight: 0, rest: 45 },
        { name: "Plancha lateral", sets: 3, reps: 20, weight: 0, rest: 45 },
      ],
    },
    {
      name: "Introducción a Máquinas",
      description: "Familiarízate con las máquinas básicas del gimnasio.",
      exercises: [
        { name: "Prensa de piernas", sets: 3, reps: 12, weight: 40, rest: 90 },
        { name: "Jalón al pecho", sets: 3, reps: 12, weight: 25, rest: 60 },
        {
          name: "Press de pecho en máquina",
          sets: 3,
          reps: 12,
          weight: 20,
          rest: 60,
        },
        {
          name: "Extensiones de cuádriceps",
          sets: 3,
          reps: 15,
          weight: 15,
          rest: 60,
        },
      ],
    },
  ],
  intermediate: [
    {
      name: "Torso - Empuje/Tracción",
      description:
        "Enfoque en tren superior dividiendo patrones de movimiento.",
      exercises: [
        { name: "Press Banca", sets: 4, reps: 8, weight: 40, rest: 90 },
        { name: "Dominadas", sets: 4, reps: 8, weight: 0, rest: 90 },
        {
          name: "Press Militar Barra",
          sets: 3,
          reps: 10,
          weight: 20,
          rest: 90,
        },
        { name: "Remo en Polea Baja", sets: 3, reps: 12, weight: 35, rest: 60 },
        {
          name: "Elevaciones Laterales",
          sets: 3,
          reps: 15,
          weight: 8,
          rest: 45,
        },
      ],
    },
    {
      name: "Pierna - Fuerza e Hipertrofia",
      description:
        "Día intenso de pierna combinando básicos pesados y accesorios.",
      exercises: [
        { name: "Sentadilla Barra", sets: 4, reps: 6, weight: 60, rest: 120 },
        { name: "Peso Muerto Rumano", sets: 3, reps: 10, weight: 50, rest: 90 },
        { name: "Prensa Inclinada", sets: 3, reps: 12, weight: 120, rest: 90 },
        {
          name: "Zancadas con mancuernas",
          sets: 3,
          reps: 12,
          weight: 12,
          rest: 60,
        },
        {
          name: "Curl Femoral Tumbado",
          sets: 3,
          reps: 15,
          weight: 20,
          rest: 60,
        },
      ],
    },
    {
      name: "Push Day (Empuje)",
      description: "Pectoral, hombro frontal/lateral y tríceps.",
      exercises: [
        {
          name: "Press Banca Inclinado",
          sets: 4,
          reps: 8,
          weight: 40,
          rest: 90,
        },
        {
          name: "Press de Hombros Mancuernas",
          sets: 3,
          reps: 10,
          weight: 18,
          rest: 90,
        },
        { name: "Fondos en paralelas", sets: 3, reps: 10, weight: 0, rest: 90 },
        {
          name: "Aperturas con mancuernas",
          sets: 3,
          reps: 12,
          weight: 12,
          rest: 60,
        },
        {
          name: "Extensiones de Tríceps Polea",
          sets: 3,
          reps: 15,
          weight: 15,
          rest: 45,
        },
      ],
    },
    {
      name: "Pull Day (Tracción)",
      description: "Espalda completa, hombro posterior y bíceps.",
      exercises: [
        {
          name: "Peso Muerto Convencional",
          sets: 3,
          reps: 6,
          weight: 80,
          rest: 120,
        },
        { name: "Dominadas (o Jalón)", sets: 4, reps: 8, weight: 0, rest: 90 },
        { name: "Remo con Barra", sets: 3, reps: 10, weight: 50, rest: 90 },
        { name: "Face Pull", sets: 3, reps: 15, weight: 15, rest: 60 },
        {
          name: "Curl de Bíceps con Barra",
          sets: 3,
          reps: 12,
          weight: 20,
          rest: 60,
        },
      ],
    },
    {
      name: "Glúteo Focus",
      description: "Énfasis en cadena posterior y glúteos.",
      exercises: [
        { name: "Hip Thrust", sets: 4, reps: 10, weight: 60, rest: 120 },
        { name: "Sentadilla Búlgara", sets: 3, reps: 10, weight: 10, rest: 90 },
        {
          name: "Patada de glúteo en polea",
          sets: 3,
          reps: 15,
          weight: 10,
          rest: 45,
        },
        {
          name: "Abducción en máquina",
          sets: 3,
          reps: 20,
          weight: 30,
          rest: 45,
        },
      ],
    },
  ],
  advanced: [
    {
      name: "Pecho y Espalda (Antagonistas)",
      description: "Entrenamiento de alta intensidad estilo Arnold.",
      exercises: [
        { name: "Press Banca", sets: 4, reps: 8, weight: 80, rest: 90 },
        { name: "Dominadas Lastradas", sets: 4, reps: 8, weight: 10, rest: 90 },
        {
          name: "Press Inclinado Mancuernas",
          sets: 4,
          reps: 10,
          weight: 30,
          rest: 60,
        },
        { name: "Remo Gironda", sets: 4, reps: 12, weight: 60, rest: 60 },
        { name: "Cruce de Poleas", sets: 3, reps: 15, weight: 15, rest: 45 },
        { name: "Pull Over Polea", sets: 3, reps: 15, weight: 20, rest: 45 },
      ],
    },
    {
      name: "Pierna Brutal (Volumen)",
      description: "Alto volumen para máximo desarrollo de piernas.",
      exercises: [
        { name: "Sentadilla Frontal", sets: 4, reps: 8, weight: 70, rest: 120 },
        {
          name: "Peso Muerto Rumano",
          sets: 4,
          reps: 10,
          weight: 90,
          rest: 120,
        },
        { name: "Prensa de Piernas", sets: 4, reps: 15, weight: 200, rest: 90 },
        {
          name: "Extensiones Cuádriceps",
          sets: 4,
          reps: 20,
          weight: 40,
          rest: 45,
        },
        { name: "Curl Femoral", sets: 4, reps: 15, weight: 40, rest: 45 },
        { name: "Gemelo en Prensa", sets: 5, reps: 15, weight: 100, rest: 45 },
      ],
    },
    {
      name: "Hombro y Brazos (Bombeo)",
      description: "Día específico para brazos y deltoides.",
      exercises: [
        { name: "Press Militar", sets: 4, reps: 8, weight: 50, rest: 90 },
        {
          name: "Elevaciones Laterales",
          sets: 4,
          reps: 15,
          weight: 12,
          rest: 45,
        },
        {
          name: "Pájaros (Posterior)",
          sets: 3,
          reps: 15,
          weight: 10,
          rest: 45,
        },
        { name: "Curl Barra Z", sets: 4, reps: 10, weight: 30, rest: 60 },
        { name: "Press Francés", sets: 4, reps: 10, weight: 30, rest: 60 },
        { name: "Curl Martillo", sets: 3, reps: 12, weight: 15, rest: 45 },
        {
          name: "Extensiones Tríceps Cuerda",
          sets: 3,
          reps: 15,
          weight: 20,
          rest: 45,
        },
      ],
    },
    {
      name: "Fuerza 5x5 (Powerbuilding)",
      description: "Enfoque en ganar fuerza en los 3 grandes básicos.",
      exercises: [
        { name: "Sentadilla Barra", sets: 5, reps: 5, weight: 100, rest: 180 },
        { name: "Press Banca", sets: 5, reps: 5, weight: 80, rest: 180 },
        { name: "Peso Muerto", sets: 3, reps: 5, weight: 120, rest: 180 },
        { name: "Dominadas", sets: 3, reps: "Fallo", weight: 0, rest: 120 },
      ],
    },
    {
      name: "Metabólico HIIT",
      description: "Quema grasa y mejora la capacidad cardiovascular.",
      exercises: [
        { name: "Burpees", sets: 4, reps: 15, weight: 0, rest: 30 },
        { name: "Kettlebell Swing", sets: 4, reps: 20, weight: 16, rest: 45 },
        { name: "Saltos al Cajón", sets: 4, reps: 12, weight: 0, rest: 45 },
        { name: "Battle Ropes", sets: 4, reps: 30, weight: 0, rest: 45 }, // reps as seconds
        {
          name: "Plancha con movimiento",
          sets: 3,
          reps: 45,
          weight: 0,
          rest: 30,
        },
      ],
    },
  ],
};
