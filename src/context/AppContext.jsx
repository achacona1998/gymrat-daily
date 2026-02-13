import React, { createContext, useContext, useState, useEffect } from "react";
import { storageService } from "../services/storage";
import {
  checkNewAchievements,
  calculateTotalXP,
  calculateLevel,
  calculateNextLevel,
} from "../utils/gamification";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [routines, setRoutines] = useState([]);
  const [history, setHistory] = useState([]);
  const [settings, setSettings] = useState({
    level: "intermediate",
    reminders: [],
  });
  const [userProfile, setUserProfile] = useState({
    name: "Atleta",
    weightHistory: [],
    measurements: [],
  });
  const [achievements, setAchievements] = useState([]);

  // Gamification Stats
  const totalXP = calculateTotalXP(history, achievements);
  const currentLevel = calculateLevel(totalXP);
  const nextLevel = calculateNextLevel(totalXP);

  useEffect(() => {
    // Load initial data
    setRoutines(storageService.getRoutines());
    setHistory(storageService.getHistory());
    setSettings(storageService.getSettings());
    setUserProfile(storageService.getUserProfile());
    setAchievements(storageService.getAchievements());
  }, []);

  // Apply settings effects
  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.darkMode]);

  const addRoutine = (routine) => {
    const updated = storageService.saveRoutine(routine);
    if (updated) setRoutines(storageService.getRoutines());
  };

  const deleteRoutine = (id) => {
    const updated = storageService.deleteRoutine(id);
    if (updated) setRoutines(storageService.getRoutines());
  };

  const addHistory = (entry) => {
    const updated = storageService.addHistoryEntry(entry);
    if (updated) {
      const newHistory = storageService.getHistory();
      setHistory(newHistory);

      // Check for achievements
      const newUnlockedIds = checkNewAchievements(newHistory, achievements);
      newUnlockedIds.forEach((id) => unlockAchievement(id));
    }
  };

  const updateSettings = (newSettings) => {
    const updated = storageService.saveSettings(newSettings);
    if (updated) setSettings(storageService.getSettings());
  };

  const updateUserProfile = (newProfile) => {
    const updated = storageService.saveUserProfile(newProfile);
    if (updated) setUserProfile(storageService.getUserProfile());
  };

  const unlockAchievement = (achievementId) => {
    const currentAchievements = storageService.getAchievements();
    if (currentAchievements.find((a) => a.id === achievementId)) return;

    const newAchievement = {
      id: achievementId,
      date: new Date().toISOString(),
    };
    const updatedList = [...currentAchievements, newAchievement];
    const saved = storageService.saveAchievements(updatedList);
    if (saved) setAchievements(updatedList);
  };

  return (
    <AppContext.Provider
      value={{
        routines,
        history,
        settings,
        userProfile,
        achievements,
        addRoutine,
        deleteRoutine,
        addHistory,
        updateSettings,
        updateUserProfile,
        unlockAchievement,
        totalXP,
        currentLevel,
        nextLevel,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
