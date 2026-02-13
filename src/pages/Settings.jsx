import React, { useRef } from "react";
import { useApp } from "../context/AppContext";
import {
  Bell,
  Trash2,
  Info,
  ChevronRight,
  Shield,
  Smartphone,
  Download,
  Upload,
  Database,
  Moon,
  Volume2,
  Ruler,
  Calendar,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { motion } from "framer-motion";

export const Settings = () => {
  const {
    routines,
    history,
    settings,
    userProfile,
    achievements,
    updateSettings,
  } = useApp();
  const fileInputRef = useRef(null);

  const handleReset = () => {
    if (
      confirm(
        "¿Estás seguro de borrar todos los datos? Esta acción no se puede deshacer.",
      )
    ) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const handleExport = () => {
    const data = {
      routines,
      history,
      settings,
      userProfile,
      achievements,
      exportDate: new Date().toISOString(),
      version: "1.1.0",
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gymrat-daily_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);

        // Basic validation
        if (data.routines && Array.isArray(data.routines)) {
          if (
            confirm(
              `Se importarán:\n- ${data.routines.length} rutinas\n- ${data.history?.length || 0} entrenamientos\n- Perfil y Logros\n\nLos datos actuales serán reemplazados. ¿Continuar?`,
            )
          ) {
            localStorage.setItem("routines", JSON.stringify(data.routines));
            localStorage.setItem("history", JSON.stringify(data.history || []));
            if (data.settings)
              localStorage.setItem("settings", JSON.stringify(data.settings));
            if (data.userProfile)
              localStorage.setItem(
                "userProfile",
                JSON.stringify(data.userProfile),
              );
            if (data.achievements)
              localStorage.setItem(
                "achievements",
                JSON.stringify(data.achievements),
              );

            alert(
              "Datos importados correctamente. La aplicación se reiniciará.",
            );
            window.location.reload();
          }
        } else {
          alert("El archivo no tiene un formato válido.");
        }
      } catch (err) {
        alert("Error al leer el archivo. Asegúrate de que es un JSON válido.");
        console.error(err);
      }
    };
    reader.readAsText(file);
    // Reset input
    event.target.value = "";
  };

  const requestNotification = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("¡GymRat Daily Activado!", {
            body: "Te avisaremos cuando sea hora de entrenar.",
            icon: "/icon-192x192.png",
          });
        }
      });
    }
  };

  const toggleSetting = (key) => {
    updateSettings({
      ...settings,
      [key]: !settings[key],
    });
  };

  return (
    <div className="space-y-6 pb-24">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl font-display font-black italic uppercase text-gray-900 leading-none dark:text-white">
          Configuración
        </h2>
      </div>

      {/* Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-sport p-5 border-l-4 border-l-purple-500">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-50 rounded-full text-purple-500 dark:bg-purple-900/30 dark:text-purple-400">
            <ToggleLeft size={24} />
          </div>
          <h3 className="font-bold text-lg text-gray-800 uppercase dark:text-gray-200">
            Preferencias
          </h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl dark:bg-gray-700/50">
            <div className="flex items-center gap-3">
              <Volume2 className="text-gray-500 dark:text-gray-400" size={20} />
              <span className="font-bold text-gray-700 dark:text-gray-200">
                Efectos de Sonido
              </span>
            </div>
            <button
              onClick={() => toggleSetting("soundEnabled")}
              className="text-primary">
              {settings.soundEnabled ? (
                <ToggleRight size={32} className="fill-primary/20" />
              ) : (
                <ToggleLeft
                  size={32}
                  className="text-gray-300 dark:text-gray-500"
                />
              )}
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl dark:bg-gray-700/50">
            <div className="flex items-center gap-3">
              <Moon className="text-gray-500 dark:text-gray-400" size={20} />
              <span className="font-bold text-gray-700 dark:text-gray-200">
                Modo Oscuro (Beta)
              </span>
            </div>
            <button
              onClick={() => toggleSetting("darkMode")}
              className="text-primary">
              {settings.darkMode ? (
                <ToggleRight size={32} className="fill-primary/20" />
              ) : (
                <ToggleLeft
                  size={32}
                  className="text-gray-300 dark:text-gray-500"
                />
              )}
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl dark:bg-gray-700/50">
            <div className="flex items-center gap-3">
              <Ruler className="text-gray-500 dark:text-gray-400" size={20} />
              <span className="font-bold text-gray-700 dark:text-gray-200">
                Unidades Métricas (
                {settings.units === "imperial" ? "lbs/in" : "kg/cm"})
              </span>
            </div>
            <button
              onClick={() =>
                updateSettings({
                  ...settings,
                  units: settings.units === "imperial" ? "metric" : "imperial",
                })
              }
              className="text-primary">
              {settings.units !== "imperial" ? (
                <ToggleRight size={32} className="fill-primary/20" />
              ) : (
                <ToggleLeft
                  size={32}
                  className="text-gray-300 dark:text-gray-500"
                />
              )}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-sport p-5 border-l-4 border-l-secondary">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-secondary/10 rounded-full text-secondary dark:bg-secondary/20">
            <Bell size={24} />
          </div>
          <h3 className="font-bold text-lg text-gray-800 uppercase dark:text-gray-200">
            Notificaciones
          </h3>
        </div>
        <p className="text-sm text-gray-500 mb-4 dark:text-gray-400">
          Activa los recordatorios para no perderte ninguna sesión de
          entrenamiento.
        </p>
        <button
          onClick={requestNotification}
          className="w-full py-3 bg-gray-900 text-white rounded-lg font-bold uppercase tracking-wider hover:bg-primary transition-colors flex justify-center items-center gap-2">
          <Smartphone size={18} /> Activar Notificaciones
        </button>
      </motion.div>

      {/* Data Backup */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card-sport p-5 border-l-4 border-l-blue-500">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-50 rounded-full text-blue-500 dark:bg-blue-900/30 dark:text-blue-400">
            <Database size={24} />
          </div>
          <h3 className="font-bold text-lg text-gray-800 uppercase dark:text-gray-200">
            Copia de Seguridad
          </h3>
        </div>
        <p className="text-sm text-gray-500 mb-4 dark:text-gray-400">
          Exporta tus datos para guardarlos o transferirlos a otro dispositivo.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleExport}
            className="py-3 bg-blue-50 text-blue-600 rounded-lg font-bold uppercase tracking-wider hover:bg-blue-100 transition-colors flex justify-center items-center gap-2 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/40">
            <Download size={18} /> Exportar
          </button>
          <button
            onClick={() => fileInputRef.current.click()}
            className="py-3 bg-gray-50 text-gray-600 rounded-lg font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors flex justify-center items-center gap-2 border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600">
            <Upload size={18} /> Importar
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImport}
            accept=".json"
            className="hidden"
          />
        </div>
      </motion.div>

      {/* Data Management */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card-sport p-5 border-l-4 border-l-red-500">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-50 rounded-full text-red-500 dark:bg-red-900/30 dark:text-red-400">
            <Shield size={24} />
          </div>
          <h3 className="font-bold text-lg text-gray-800 uppercase dark:text-gray-200">
            Zona de Peligro
          </h3>
        </div>
        <p className="text-sm text-gray-500 mb-4 dark:text-gray-400">
          Si necesitas reiniciar la aplicación desde cero, puedes borrar todos
          los datos aquí.
        </p>
        <button
          onClick={handleReset}
          className="w-full py-3 border-2 border-red-100 text-red-500 rounded-lg font-bold uppercase tracking-wider hover:bg-red-50 transition-colors flex justify-center items-center gap-2 dark:border-red-900/50 dark:hover:bg-red-900/20">
          <Trash2 size={18} /> Borrar Todo
        </button>
      </motion.div>

      {/* About */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gray-100 rounded-2xl p-5 flex items-center justify-between dark:bg-gray-800/50">
        <div className="flex items-center gap-3">
          <Info size={20} className="text-gray-400" />
          <div>
            <p className="font-bold text-gray-700 dark:text-gray-300">
              Versión 1.1.0
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Desarrollado con pasión deportiva
            </p>
          </div>
        </div>
        <div className="text-xs font-mono text-gray-400">BUILD 2026</div>
      </motion.div>
    </div>
  );
};
