import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Routines } from "./pages/Routines";
import { RoutineForm } from "./pages/RoutineForm";
import { Workout } from "./pages/Workout";
import { History } from "./pages/History";
import { Suggestions } from "./pages/Suggestions";
import { Settings } from "./pages/Settings";
import { Profile } from "./pages/Profile";
import { Exercises } from "./pages/Exercises";
import { Achievements } from "./pages/Achievements";
import { Onboarding } from "./pages/Onboarding";
import { LoadingScreen } from "./components/LoadingScreen";
import { AnimatePresence } from "framer-motion";

const MainContent = () => {
  const { userProfile } = useApp();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        !userProfile?.onboardingCompleted ? (
          <Onboarding />
        ) : (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="routines" element={<Routines />} />
                <Route path="routines/new" element={<RoutineForm />} />
                <Route path="routines/edit/:id" element={<RoutineForm />} />
                <Route path="history" element={<History />} />
                <Route path="suggestions" element={<Suggestions />} />
                <Route path="settings" element={<Settings />} />
                <Route path="profile" element={<Profile />} />
                <Route path="exercises" element={<Exercises />} />
                <Route path="achievements" element={<Achievements />} />
              </Route>
              {/* Workout is standalone to focus */}
              <Route path="workout/:id" element={<Workout />} />
            </Routes>
          </BrowserRouter>
        )
      )}
    </>
  );
};

function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
