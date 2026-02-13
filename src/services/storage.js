const KEYS = {
  ROUTINES: "gym_app_routines",
  HISTORY: "gym_app_history",
  SETTINGS: "gym_app_settings",
  USER_PROFILE: "gym_app_user_profile",
  ACHIEVEMENTS: "gym_app_achievements",
};

export const storageService = {
  // Helper to simulate JSON file reading
  _read: (key) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Error reading ${key}:`, error);
      return null;
    }
  },

  // Helper to simulate JSON file writing
  _write: (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error(`Error writing ${key}:`, error);
      return false;
    }
  },

  getRoutines: () => {
    return storageService._read(KEYS.ROUTINES) || [];
  },

  saveRoutines: (routines) => {
    return storageService._write(KEYS.ROUTINES, routines);
  },

  saveRoutine: (routine) => {
    const routines = storageService.getRoutines();
    const index = routines.findIndex((r) => r.id === routine.id);
    if (index >= 0) {
      routines[index] = routine;
    } else {
      routines.push(routine);
    }
    return storageService._write(KEYS.ROUTINES, routines);
  },

  deleteRoutine: (id) => {
    const routines = storageService.getRoutines();
    const newRoutines = routines.filter((r) => r.id !== id);
    return storageService._write(KEYS.ROUTINES, newRoutines);
  },

  getHistory: () => {
    return storageService._read(KEYS.HISTORY) || [];
  },

  addHistoryEntry: (entry) => {
    const history = storageService.getHistory();
    history.push(entry);
    return storageService._write(KEYS.HISTORY, history);
  },

  getSettings: () => {
    return (
      storageService._read(KEYS.SETTINGS) || {
        level: "intermediate",
        reminders: [],
      }
    );
  },

  saveSettings: (settings) => {
    return storageService._write(KEYS.SETTINGS, settings);
  },

  getUserProfile: () => {
    return (
      storageService._read(KEYS.USER_PROFILE) || {
        name: "Atleta",
        height: 0,
        weightHistory: [], // { date: ISOString, weight: number }
        measurements: [], // { date: ISOString, chest, waist, arm, leg }
        goals: [], // Strings
        gender: "male",
        trainingDays: [], // Array of days (e.g., ["Lunes", "Miércoles", "Viernes"])
        onboardingCompleted: false,
      }
    );
  },

  saveUserProfile: (profile) => {
    return storageService._write(KEYS.USER_PROFILE, profile);
  },

  getAchievements: () => {
    return storageService._read(KEYS.ACHIEVEMENTS) || [];
  },

  saveAchievements: (achievements) => {
    return storageService._write(KEYS.ACHIEVEMENTS, achievements);
  },
};
