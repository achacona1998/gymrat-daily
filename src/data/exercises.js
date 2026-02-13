export const exercises = [
  // --- PECHO ---
  {
    id: "chest-press",
    name: "Press de Banca",
    category: "Pecho",
    description:
      "Acuéstate en un banco plano. Sujeta la barra con un agarre ligeramente más ancho que los hombros. Baja la barra hasta el pecho y empuja hacia arriba.",
    difficulty: "Intermedio",
    muscles: ["Pectorales", "Tríceps", "Deltoides anterior"],
  },
  {
    id: "chest-press-incline",
    name: "Press Inclinado",
    category: "Pecho",
    description:
      "Similar al press de banca pero en un banco inclinado (30-45°). Enfoca el trabajo en la parte superior del pecho.",
    difficulty: "Intermedio",
    muscles: ["Pectorales (Superior)", "Tríceps", "Deltoides anterior"],
  },
  {
    id: "chest-press-decline",
    name: "Press Declinado",
    category: "Pecho",
    description:
      "En banco declinado, enfoca el trabajo en la parte inferior del pectoral.",
    difficulty: "Intermedio",
    muscles: ["Pectorales (Inferior)", "Tríceps"],
  },
  {
    id: "chest-press-dumbbells",
    name: "Press con Mancuernas",
    category: "Pecho",
    description:
      "Press de banca realizado con mancuernas, permitiendo mayor rango de movimiento y trabajo estabilizador.",
    difficulty: "Intermedio",
    muscles: ["Pectorales", "Tríceps"],
  },
  {
    id: "chest-press-incline-dumbbells",
    name: "Press Inclinado Mancuernas",
    category: "Pecho",
    description:
      "Press inclinado con mancuernas para la parte superior del pecho.",
    difficulty: "Intermedio",
    muscles: ["Pectorales (Superior)", "Tríceps"],
  },
  {
    id: "chest-fly",
    name: "Aperturas con Mancuernas",
    category: "Pecho",
    description:
      "Acuéstate en un banco plano. Abre los brazos en forma de arco hasta sentir estiramiento, luego cierra arriba.",
    difficulty: "Principiante",
    muscles: ["Pectorales"],
  },
  {
    id: "chest-dips",
    name: "Fondos en Paralelas",
    category: "Pecho",
    description:
      "Suspéndete en barras paralelas. Inclina el torso hacia adelante y baja flexionando los codos. Empuja para subir.",
    difficulty: "Avanzado",
    muscles: ["Pectorales (Inferior)", "Tríceps", "Deltoides anterior"],
  },
  {
    id: "push-ups",
    name: "Flexiones",
    category: "Pecho",
    description:
      "En el suelo, manos al ancho de hombros. Baja el cuerpo recto hasta el suelo y empuja arriba.",
    difficulty: "Principiante",
    muscles: ["Pectorales", "Tríceps", "Core"],
  },
  {
    id: "push-ups-diamond",
    name: "Flexiones Diamante",
    category: "Pecho",
    description:
      "Flexiones con las manos juntas formando un diamante. Enfatiza tríceps y pecho interior.",
    difficulty: "Intermedio",
    muscles: ["Tríceps", "Pectorales (Interior)"],
  },
  {
    id: "cable-crossover",
    name: "Cruce de Poleas",
    category: "Pecho",
    description:
      "De pie entre dos poleas altas, tira de los agarres hacia abajo y al centro frente a tu cintura.",
    difficulty: "Intermedio",
    muscles: ["Pectorales (Medio/Inferior)"],
  },
  {
    id: "cable-fly-low",
    name: "Cruce de Poleas Baja",
    category: "Pecho",
    description:
      "Desde poleas bajas, eleva los brazos hacia arriba y al centro. Enfoca pecho superior.",
    difficulty: "Intermedio",
    muscles: ["Pectorales (Superior)"],
  },
  {
    id: "pec-deck",
    name: "Pec Deck (Mariposa)",
    category: "Pecho",
    description:
      "Sentado en la máquina, junta los brazos frente al pecho manteniendo los codos flexionados.",
    difficulty: "Principiante",
    muscles: ["Pectorales"],
  },
  {
    id: "pullover-dumbbell",
    name: "Pullover con Mancuerna",
    category: "Pecho",
    description:
      "Tumbado perpendicular al banco, baja la mancuerna por detrás de la cabeza con brazos semi-extendidos.",
    difficulty: "Intermedio",
    muscles: ["Pectorales", "Dorsales", "Serratos"],
  },
  {
    id: "svend-press",
    name: "Press Svend",
    category: "Pecho",
    description:
      "De pie, aprieta dos discos o una mancuerna entre las manos frente al pecho y extiende los brazos.",
    difficulty: "Principiante",
    muscles: ["Pectorales (Interior)"],
  },
  {
    id: "landmine-press",
    name: "Press Landmine",
    category: "Pecho",
    description:
      "Empuja un extremo de la barra anclada desde el pecho hacia arriba y adelante con una o dos manos.",
    difficulty: "Intermedio",
    muscles: ["Pectorales (Superior)", "Hombros"],
  },

  // --- ESPALDA ---
  {
    id: "deadlift",
    name: "Peso Muerto",
    category: "Espalda",
    description:
      "Levanta la barra desde el suelo extendiendo caderas y rodillas. Espalda recta en todo momento.",
    difficulty: "Avanzado",
    muscles: ["Espalda baja", "Isquios", "Glúteos", "Trapecios"],
  },
  {
    id: "rack-pull",
    name: "Rack Pull",
    category: "Espalda",
    description:
      "Peso muerto parcial desde la altura de las rodillas. Enfoca espalda alta y trapecios.",
    difficulty: "Avanzado",
    muscles: ["Espalda alta", "Trapecios"],
  },
  {
    id: "pull-up",
    name: "Dominadas Pronas",
    category: "Espalda",
    description:
      "Agarre amplio, palmas al frente. Tira hasta pasar la barbilla. Enfoca anchura dorsal.",
    difficulty: "Avanzado",
    muscles: ["Dorsales", "Bíceps", "Antebrazos"],
  },
  {
    id: "chin-up",
    name: "Dominadas Supinas",
    category: "Espalda",
    description:
      "Agarre cerrado, palmas hacia ti. Enfoca más bíceps y dorsal bajo.",
    difficulty: "Intermedio",
    muscles: ["Dorsales", "Bíceps"],
  },
  {
    id: "lat-pulldown",
    name: "Jalón al Pecho",
    category: "Espalda",
    description:
      "Sentado, tira de la barra hacia la parte superior del pecho. Alternativa a las dominadas.",
    difficulty: "Principiante",
    muscles: ["Dorsales", "Bíceps"],
  },
  {
    id: "lat-pulldown-close",
    name: "Jalón Agarre Cerrado",
    category: "Espalda",
    description:
      "Jalón con agarre neutro cerrado (triángulo). Enfoca dorsal bajo y medio.",
    difficulty: "Principiante",
    muscles: ["Dorsales", "Bíceps"],
  },
  {
    id: "barbell-row",
    name: "Remo con Barra",
    category: "Espalda",
    description:
      "Inclina el torso 45°. Tira de la barra hacia el abdomen manteniendo la espalda recta.",
    difficulty: "Intermedio",
    muscles: ["Dorsales", "Romboises", "Trapecios"],
  },
  {
    id: "pendlay-row",
    name: "Remo Pendlay",
    category: "Espalda",
    description:
      "Remo con barra estricto, apoyando la barra en el suelo en cada repetición. Torso paralelo al suelo.",
    difficulty: "Avanzado",
    muscles: ["Espalda completa", "Potencia"],
  },
  {
    id: "dumbbell-row",
    name: "Remo con Mancuerna",
    category: "Espalda",
    description:
      "Apoya una rodilla y mano en banco. Tira de la mancuerna hacia la cadera con el otro brazo.",
    difficulty: "Intermedio",
    muscles: ["Dorsales", "Bíceps"],
  },
  {
    id: "meadows-row",
    name: "Remo Meadows",
    category: "Espalda",
    description:
      "Remo unilateral con barra landmine. Permite gran estiramiento y contracción.",
    difficulty: "Avanzado",
    muscles: ["Dorsales", "Deltoides posterior"],
  },
  {
    id: "t-bar-row",
    name: "Remo en Barra T",
    category: "Espalda",
    description:
      "Remo con barra anclada o máquina específica. Agarre neutro o prono.",
    difficulty: "Intermedio",
    muscles: ["Espalda media", "Grosor dorsal"],
  },
  {
    id: "seated-row",
    name: "Remo en Polea Baja",
    category: "Espalda",
    description:
      "Sentado frente a la polea, tira del agarre hacia el abdomen manteniendo la espalda erguida.",
    difficulty: "Principiante",
    muscles: ["Espalda media", "Dorsales"],
  },
  {
    id: "face-pull",
    name: "Face Pull",
    category: "Hombros",
    description:
      "En polea alta con cuerda, tira hacia la cara separando las manos al final.",
    difficulty: "Intermedio",
    muscles: ["Deltoides posterior", "Manguito rotador", "Trapecios"],
  },
  {
    id: "straight-arm-pulldown",
    name: "Pull-over en Polea",
    category: "Espalda",
    description:
      "De pie, brazos rectos, baja la barra desde la altura de los ojos hasta los muslos.",
    difficulty: "Intermedio",
    muscles: ["Dorsales", "Serratos"],
  },
  {
    id: "hyperextensions",
    name: "Hiperextensiones",
    category: "Espalda",
    description:
      "En banco inclinado, baja el torso y sube usando la fuerza de la espalda baja y glúteos.",
    difficulty: "Principiante",
    muscles: ["Espalda baja (Lumbares)", "Glúteos"],
  },

  // --- PIERNAS ---
  {
    id: "squat",
    name: "Sentadilla con Barra",
    category: "Piernas",
    description:
      "Barra en trapecios. Baja flexionando rodillas y caderas. El rey de los ejercicios de pierna.",
    difficulty: "Avanzado",
    muscles: ["Cuádriceps", "Glúteos", "Isquios"],
  },
  {
    id: "front-squat",
    name: "Sentadilla Frontal",
    category: "Piernas",
    description:
      "Barra apoyada en los hombros delanteros. Mayor énfasis en cuádriceps y core.",
    difficulty: "Avanzado",
    muscles: ["Cuádriceps", "Core"],
  },
  {
    id: "goblet-squat",
    name: "Sentadilla Goblet",
    category: "Piernas",
    description:
      "Sostén una mancuerna o pesa rusa frente al pecho y realiza una sentadilla profunda.",
    difficulty: "Principiante",
    muscles: ["Cuádriceps", "Glúteos"],
  },
  {
    id: "sumo-squat",
    name: "Sentadilla Sumo",
    category: "Piernas",
    description:
      "Pies muy separados, puntas hacia afuera. Enfatiza aductores y glúteos.",
    difficulty: "Intermedio",
    muscles: ["Aductores", "Glúteos", "Cuádriceps"],
  },
  {
    id: "leg-press",
    name: "Prensa de Piernas",
    category: "Piernas",
    description:
      "Empuja la plataforma con los pies. Evita bloquear rodillas al extender.",
    difficulty: "Principiante",
    muscles: ["Cuádriceps", "Glúteos"],
  },
  {
    id: "hack-squat",
    name: "Sentadilla Hack",
    category: "Piernas",
    description:
      "En máquina Hack, espalda apoyada. Gran aislamiento de cuádriceps.",
    difficulty: "Intermedio",
    muscles: ["Cuádriceps"],
  },
  {
    id: "lunges",
    name: "Zancadas",
    category: "Piernas",
    description:
      "Da un paso largo adelante y baja la rodilla trasera casi al suelo. Alterna piernas.",
    difficulty: "Intermedio",
    muscles: ["Cuádriceps", "Glúteos"],
  },
  {
    id: "walking-lunges",
    name: "Zancadas Caminando",
    category: "Piernas",
    description:
      "Realiza zancadas avanzando en cada paso. Desafiante para el equilibrio y resistencia.",
    difficulty: "Intermedio",
    muscles: ["Cuádriceps", "Glúteos", "Cardio"],
  },
  {
    id: "bulgarian-squat",
    name: "Sentadilla Búlgara",
    category: "Piernas",
    description:
      "Un pie apoyado atrás en banco. Baja con la pierna delantera. Excelente para glúteo.",
    difficulty: "Avanzado",
    muscles: ["Cuádriceps", "Glúteos"],
  },
  {
    id: "leg-extension",
    name: "Extensiones de Cuádriceps",
    category: "Piernas",
    description:
      "Sentado en máquina, extiende las piernas hasta que estén rectas.",
    difficulty: "Principiante",
    muscles: ["Cuádriceps"],
  },
  {
    id: "leg-curl",
    name: "Curl Femoral Tumbado",
    category: "Piernas",
    description:
      "Tumbado, flexiona las rodillas llevando los talones hacia el glúteo.",
    difficulty: "Principiante",
    muscles: ["Isquiotibiales"],
  },
  {
    id: "seated-leg-curl",
    name: "Curl Femoral Sentado",
    category: "Piernas",
    description:
      "Sentado, presiona hacia abajo con los talones flexionando las rodillas.",
    difficulty: "Principiante",
    muscles: ["Isquiotibiales"],
  },
  {
    id: "rdl",
    name: "Peso Muerto Rumano",
    category: "Piernas",
    description:
      "Baja la barra rozando las piernas, caderas atrás, rodillas semi-flexionadas. Siente el estiramiento femoral.",
    difficulty: "Intermedio",
    muscles: ["Isquiotibiales", "Glúteos"],
  },
  {
    id: "stiff-leg-deadlift",
    name: "Peso Muerto Piernas Rígidas",
    category: "Piernas",
    description:
      "Similar al Rumano pero con piernas casi rectas y bajando más la barra.",
    difficulty: "Avanzado",
    muscles: ["Isquiotibiales"],
  },
  {
    id: "calf-raise-standing",
    name: "Elevación de Gemelos De Pie",
    category: "Piernas",
    description: "De pie, levanta los talones. Enfoca el gastrocnemio.",
    difficulty: "Principiante",
    muscles: ["Gemelos"],
  },
  {
    id: "calf-raise-seated",
    name: "Elevación de Gemelos Sentado",
    category: "Piernas",
    description: "Sentado, rodillas flexionadas. Enfoca el sóleo.",
    difficulty: "Principiante",
    muscles: ["Sóleo"],
  },
  {
    id: "hip-thrust",
    name: "Hip Thrust",
    category: "Piernas",
    description:
      "Espalda alta en banco, barra en caderas. Levanta la cadera contrayendo glúteos fuertemente.",
    difficulty: "Intermedio",
    muscles: ["Glúteos"],
  },
  {
    id: "glute-bridge",
    name: "Puente de Glúteos",
    category: "Piernas",
    description:
      "Tumbado en el suelo, eleva caderas. Versión más simple del Hip Thrust.",
    difficulty: "Principiante",
    muscles: ["Glúteos"],
  },
  {
    id: "abductor-machine",
    name: "Máquina de Abductores",
    category: "Piernas",
    description:
      "Sentado, abre las piernas contra resistencia. Trabaja glúteo medio/menor.",
    difficulty: "Principiante",
    muscles: ["Glúteos (Cadera)"],
  },
  {
    id: "adductor-machine",
    name: "Máquina de Aductores",
    category: "Piernas",
    description:
      "Sentado, cierra las piernas contra resistencia. Trabaja interior del muslo.",
    difficulty: "Principiante",
    muscles: ["Aductores"],
  },
  {
    id: "cable-kickback",
    name: "Patada de Glúteo en Polea",
    category: "Piernas",
    description:
      "De pie, patea hacia atrás con un tobillo atado a la polea baja.",
    difficulty: "Intermedio",
    muscles: ["Glúteos"],
  },

  // --- HOMBROS ---
  {
    id: "shoulder-press",
    name: "Press Militar Barra",
    category: "Hombros",
    description:
      "De pie, empuja la barra desde el pecho hasta arriba de la cabeza.",
    difficulty: "Intermedio",
    muscles: ["Deltoides", "Tríceps", "Core"],
  },
  {
    id: "shoulder-press-dumbbells",
    name: "Press de Hombros Mancuernas",
    category: "Hombros",
    description:
      "Sentado o de pie, press con mancuernas. Mayor libertad de movimiento.",
    difficulty: "Intermedio",
    muscles: ["Deltoides", "Tríceps"],
  },
  {
    id: "arnold-press",
    name: "Press Arnold",
    category: "Hombros",
    description:
      "Press de hombros con giro de muñeca. Inicia palmas hacia ti, termina palmas al frente.",
    difficulty: "Intermedio",
    muscles: ["Deltoides (Todos)"],
  },
  {
    id: "lateral-raises",
    name: "Elevaciones Laterales",
    category: "Hombros",
    description:
      "Levanta mancuernas hacia los lados hasta la altura de los hombros.",
    difficulty: "Principiante",
    muscles: ["Deltoides lateral"],
  },
  {
    id: "egyptian-lateral-raises",
    name: "Elevaciones Laterales Egipcias",
    category: "Hombros",
    description:
      "Unilateral en polea, cuerpo inclinado hacia afuera. Tensión constante.",
    difficulty: "Intermedio",
    muscles: ["Deltoides lateral"],
  },
  {
    id: "front-raises",
    name: "Elevaciones Frontales",
    category: "Hombros",
    description:
      "Levanta el peso hacia el frente hasta la altura de los ojos (mancuerna o disco).",
    difficulty: "Principiante",
    muscles: ["Deltoides anterior"],
  },
  {
    id: "reverse-fly",
    name: "Pájaros (Posterior)",
    category: "Hombros",
    description:
      "Inclinado hacia adelante, levanta los brazos hacia los lados. Enfocado en hombro posterior.",
    difficulty: "Intermedio",
    muscles: ["Deltoides posterior"],
  },
  {
    id: "reverse-pec-deck",
    name: "Pájaros en Máquina",
    category: "Hombros",
    description:
      "Siéntate mirando al respaldo en la máquina de Pec Deck y abre los brazos hacia atrás.",
    difficulty: "Principiante",
    muscles: ["Deltoides posterior"],
  },
  {
    id: "upright-row",
    name: "Remo al Mentón",
    category: "Hombros",
    description:
      "De pie, sube la barra o mancuernas pegadas al cuerpo hasta el pecho alto.",
    difficulty: "Intermedio",
    muscles: ["Deltoides lateral", "Trapecios"],
  },
  {
    id: "shrugs",
    name: "Encogimientos",
    category: "Hombros",
    description:
      "Con peso en manos, eleva los hombros hacia las orejas. Brazos rectos.",
    difficulty: "Principiante",
    muscles: ["Trapecios"],
  },

  // --- BRAZOS ---
  {
    id: "bicep-curl",
    name: "Curl de Bíceps con Barra",
    category: "Brazos",
    description:
      "De pie, flexiona codos llevando la barra al pecho. Codos pegados al cuerpo.",
    difficulty: "Principiante",
    muscles: ["Bíceps"],
  },
  {
    id: "bicep-curl-dumbbells",
    name: "Curl de Bíceps Alterno",
    category: "Brazos",
    description:
      "Curl con mancuernas alternando brazos, con supinación (giro) de muñeca.",
    difficulty: "Principiante",
    muscles: ["Bíceps"],
  },
  {
    id: "hammer-curl",
    name: "Curl Martillo",
    category: "Brazos",
    description:
      "Curl con mancuernas y palmas enfrentadas (agarre neutro). Enfoca braquial.",
    difficulty: "Principiante",
    muscles: ["Bíceps", "Braquial"],
  },
  {
    id: "preacher-curl",
    name: "Curl Predicador",
    category: "Brazos",
    description:
      "Brazos apoyados en banco Scott. Aísla el bíceps completamente evitando inercia.",
    difficulty: "Intermedio",
    muscles: ["Bíceps"],
  },
  {
    id: "spider-curl",
    name: "Curl Araña",
    category: "Brazos",
    description:
      "Pecho apoyado en banco inclinado, brazos colgando. Curl estricto.",
    difficulty: "Intermedio",
    muscles: ["Bíceps (Cabeza corta)"],
  },
  {
    id: "bayesian-curl",
    name: "Curl Bayesiano",
    category: "Brazos",
    description:
      "De espaldas a la polea, brazo atrasado. Curl con polea baja. Máximo estiramiento.",
    difficulty: "Intermedio",
    muscles: ["Bíceps (Cabeza larga)"],
  },
  {
    id: "concentration-curl",
    name: "Curl Concentrado",
    category: "Brazos",
    description: "Sentado, codo apoyado en muslo interno. Curl controlado.",
    difficulty: "Principiante",
    muscles: ["Bíceps"],
  },
  {
    id: "reverse-curl",
    name: "Curl Inverso",
    category: "Brazos",
    description:
      "Curl con agarre prono (palmas abajo). Enfoca antebrazos y braquial.",
    difficulty: "Intermedio",
    muscles: ["Antebrazos", "Braquial"],
  },
  {
    id: "tricep-pushdown",
    name: "Extensión de Tríceps Polea",
    category: "Brazos",
    description: "En polea alta, extiende los brazos hacia abajo. Codos fijos.",
    difficulty: "Principiante",
    muscles: ["Tríceps"],
  },
  {
    id: "tricep-rope-pushdown",
    name: "Extensión con Cuerda",
    category: "Brazos",
    description:
      "Igual que polea pero con cuerda, abriendo al final para mayor contracción.",
    difficulty: "Principiante",
    muscles: ["Tríceps"],
  },
  {
    id: "skullcrushers",
    name: "Press Francés",
    category: "Brazos",
    description: "Tumbado, baja la barra Z hacia la frente flexionando codos.",
    difficulty: "Intermedio",
    muscles: ["Tríceps"],
  },
  {
    id: "overhead-extension",
    name: "Extensión Tras Nuca",
    category: "Brazos",
    description:
      "Sentado o de pie, extiende la mancuerna o polea por encima de la cabeza.",
    difficulty: "Intermedio",
    muscles: ["Tríceps (Cabeza larga)"],
  },
  {
    id: "tricep-dips",
    name: "Fondos entre Bancos",
    category: "Brazos",
    description:
      "Manos en un banco detrás de ti, baja el cuerpo flexionando codos.",
    difficulty: "Principiante",
    muscles: ["Tríceps"],
  },
  {
    id: "tricep-kickback",
    name: "Patada de Tríceps",
    category: "Brazos",
    description:
      "Torso inclinado, extiende el brazo hacia atrás con mancuerna o polea.",
    difficulty: "Principiante",
    muscles: ["Tríceps"],
  },
  {
    id: "wrist-curl",
    name: "Curl de Muñeca",
    category: "Brazos",
    description: "Apoya antebrazos en banco y flexiona muñecas con peso.",
    difficulty: "Principiante",
    muscles: ["Antebrazos"],
  },

  // --- CORE ---
  {
    id: "plank",
    name: "Plancha Abdominal",
    category: "Core",
    description:
      "Posición estática apoyado en antebrazos. Cuerpo recto como una tabla.",
    difficulty: "Principiante",
    muscles: ["Abdominales", "Core completo"],
  },
  {
    id: "side-plank",
    name: "Plancha Lateral",
    category: "Core",
    description: "Apoyado en un antebrazo de lado. Levanta la cadera y mantén.",
    difficulty: "Intermedio",
    muscles: ["Oblicuos", "Core"],
  },
  {
    id: "crunches",
    name: "Crunches (Abdominales)",
    category: "Core",
    description: "Tumbado, eleva ligeramente el torso contrayendo el abdomen.",
    difficulty: "Principiante",
    muscles: ["Recto abdominal"],
  },
  {
    id: "leg-raises",
    name: "Elevación de Piernas Suelo",
    category: "Core",
    description:
      "Tumbado, eleva las piernas rectas hasta formar 90°. Controla la bajada.",
    difficulty: "Intermedio",
    muscles: ["Abdominales inferiores"],
  },
  {
    id: "hanging-leg-raises",
    name: "Elevación de Piernas Colgado",
    category: "Core",
    description:
      "Colgado de barra, eleva piernas (o rodillas) hacia el pecho. Muy intenso.",
    difficulty: "Avanzado",
    muscles: ["Abdominales inferiores", "Flexores"],
  },
  {
    id: "russian-twist",
    name: "Giros Rusos",
    category: "Core",
    description: "Sentado en V, gira el torso de lado a lado con peso.",
    difficulty: "Intermedio",
    muscles: ["Oblicuos"],
  },
  {
    id: "woodchopper",
    name: "Leñador (Woodchopper)",
    category: "Core",
    description:
      "En polea alta, tira diagonalmente hacia abajo girando el torso.",
    difficulty: "Intermedio",
    muscles: ["Oblicuos", "Core funcional"],
  },
  {
    id: "ab-wheel",
    name: "Rueda Abdominal",
    category: "Core",
    description:
      "De rodillas, rueda hacia adelante extendiendo el cuerpo y regresa. Requiere fuerza.",
    difficulty: "Avanzado",
    muscles: ["Core completo"],
  },
  {
    id: "mountain-climbers",
    name: "Escaladores",
    category: "Core",
    description:
      "En posición de plancha alta, lleva rodillas al pecho alternadamente rápido.",
    difficulty: "Intermedio",
    muscles: ["Core", "Cardio"],
  },
  {
    id: "vacuum",
    name: "Vacío Abdominal",
    category: "Core",
    description:
      "Expulsa todo el aire y mete el abdomen hacia adentro. Fortalece el transverso.",
    difficulty: "Intermedio",
    muscles: ["Transverso abdominal"],
  },

  // --- CARDIO / FUNCIONAL ---
  {
    id: "burpees",
    name: "Burpees",
    category: "Piernas", // Multi-grupo
    description: "Sentadilla, plancha, flexión, salto. Todo en uno.",
    difficulty: "Avanzado",
    muscles: ["Cuerpo completo", "Cardio"],
  },
  {
    id: "kettlebell-swing",
    name: "Swing con Pesa Rusa",
    category: "Piernas", // Multi-grupo
    description:
      "Balancea la pesa rusa entre las piernas y hasta la altura del pecho usando la cadera.",
    difficulty: "Intermedio",
    muscles: ["Cadera", "Glúteos", "Espalda baja", "Hombros"],
  },
  {
    id: "box-jumps",
    name: "Saltos al Cajón",
    category: "Piernas",
    description: "Salta con ambos pies sobre un cajón resistente.",
    difficulty: "Intermedio",
    muscles: ["Piernas", "Potencia"],
  },
  {
    id: "battle-ropes",
    name: "Cuerdas de Batalla",
    category: "Hombros", // Multi-grupo
    description: "Mueve las cuerdas pesadas en ondas alternas o simultáneas.",
    difficulty: "Intermedio",
    muscles: ["Hombros", "Brazos", "Cardio"],
  },
];

export const categories = [
  "Pecho",
  "Espalda",
  "Piernas",
  "Hombros",
  "Brazos",
  "Core",
];
