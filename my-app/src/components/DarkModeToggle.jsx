import React from 'react';

export default function DarkModeToggle({ darkMode, setDarkMode }) {
    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/90 dark:bg-slate-800/90 shadow-lg hover:scale-110 transition-all duration-300"
            aria-label="Toggle dark mode"
        >
            {darkMode ? (
                <span className="text-2xl">☀️</span>
            ) : (
                <span className="text-2xl">🌙</span>
            )}
        </button>
    );
}
