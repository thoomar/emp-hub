import React from "react";

export default function DarkModeToggle({ darkMode, setDarkMode }) {
    return (
        <button
            aria-label="Toggle dark mode"
            className="fixed top-4 right-6 md:top-6 md:right-12 z-50 rounded-full p-2 bg-white/90 dark:bg-slate-800/90 shadow-xl hover:scale-110 transition"
            onClick={() => setDarkMode(!darkMode)}
            type="button"
        >
            {darkMode ? (
                <span role="img" aria-label="Switch to light mode" className="text-yellow-300 text-2xl">🌞</span>
            ) : (
                <span role="img" aria-label="Switch to dark mode" className="text-gray-900 text-2xl">🌙</span>
            )}
        </button>
    );
}
