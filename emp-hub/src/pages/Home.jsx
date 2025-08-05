import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DarkModeToggle from "../components/DarkModeToggle";

const navItems = [
    { to: "/knowledge", label: "Knowledge Base", emoji: "📚" },
    { to: "/leaderboard", label: "Leaderboard", emoji: "🏆" },
    { to: "/calculator", label: "Calculator", emoji: "🧮" },
    { to: "/commissions", label: "Commissions", emoji: "💰" },
];

const Home = () => {
    const [darkMode, setDarkMode] = useState(() =>
        window.matchMedia("(prefers-color-scheme: dark)").matches
    );

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-indigo-200 dark:from-slate-900 dark:to-slate-800 transition-colors duration-700 relative">
            <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

            <div className="flex flex-col items-center mb-14 animate-fade-in">
                <div className="flex items-center gap-3">
                    <span className="text-4xl md:text-5xl drop-shadow">⚡</span>
                    <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 dark:text-white tracking-tight drop-shadow-lg">
                        EMP Hub
                    </h1>
                </div>
                <p className="mt-4 text-lg md:text-xl text-gray-700 dark:text-gray-200 text-center">
                    Select a section to get started:
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-2xl animate-fade-in">
                {navItems.map((item) => (
                    <Link
                        key={item.to}
                        to={item.to}
                        className="flex flex-col items-center justify-center gap-2 bg-white/90 dark:bg-slate-900/90 border-none shadow-2xl rounded-3xl py-10 px-8 text-xl font-semibold text-blue-800 dark:text-blue-200 hover:scale-105 hover:bg-blue-200/60 dark:hover:bg-slate-800/80 transition-all duration-300 cursor-pointer"
                    >
                        <span className="text-4xl mb-2">{item.emoji}</span>
                        <span>{item.label}</span>
                    </Link>
                ))}
            </div>

            <footer className="absolute bottom-8 left-0 w-full flex justify-center opacity-70 text-gray-600 dark:text-gray-300 text-sm pointer-events-none select-none">
                © {new Date().getFullYear()} EMP Hub — Republic Financial Services
            </footer>
        </div>
    );
};

export default Home;
