import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';

export default function PageLayout({ children, title }) {
    const [darkMode, setDarkMode] = useState(() =>
        window.matchMedia("(prefers-color-scheme: dark)").matches
    );

    useEffect(() => {
        document.documentElement.classList.toggle("dark", darkMode);
    }, [darkMode]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-700">
            <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            
            {/* Header */}
            <header className="bg-white dark:bg-slate-800 shadow-md border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <span className="text-3xl">🏢</span>
                        <div>
                            <h1 className="text-xl font-bold text-gray-800 dark:text-white">Employee Portal</h1>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Timeshare Help Center</p>
                        </div>
                    </Link>
                    
                    <nav className="flex items-center gap-4">
                        <Link to="/" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            Home
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                {title && (
                    <div className="mb-6">
                        <h2 className="text-4xl font-bold text-gray-800 dark:text-white">{title}</h2>
                    </div>
                )}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 min-h-[400px]">
                    {children}
                </div>
            </main>
        </div>
    );
}
