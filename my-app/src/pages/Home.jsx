import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DarkModeToggle from "../components/DarkModeToggle";

const externalLinks = [
    { 
        url: "https://timeoff.timesharehelpcenter.com", 
        label: "Request Time Off", 
        emoji: "🏖️",
        description: "Submit your time off requests"
    },
    { 
        url: "https://lst.timesharehelpcenter.com", 
        label: "Live Sales Tracker", 
        emoji: "📊",
        description: "Track real-time sales performance"
    },
];

const internalFeatures = [
    { to: "/leaderboard", label: "Call of Fame", emoji: "🏆", description: "View top performers" },
    { to: "/knowledge", label: "Knowledge Base", emoji: "📚", description: "Access resources & guides" },
    { to: "/calculator", label: "Calculator", emoji: "🧮", description: "Financial calculations" },
    { to: "/commissions", label: "Commissions", emoji: "💰", description: "Track your earnings" },
];

export default function Home() {
    const [darkMode, setDarkMode] = useState(() =>
        window.matchMedia("(prefers-color-scheme: dark)").matches
    );
    const [authStatus, setAuthStatus] = useState(null);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", darkMode);
    }, [darkMode]);

    useEffect(() => {
        // Check Zoho auth status
        fetch('/api/config')
            .then(res => res.json())
            .then(data => {
                setAuthStatus({
                    hasRefreshToken: data.hasRefreshToken,
                    hasClientId: data.hasClientId
                });
            })
            .catch(() => setAuthStatus({ hasRefreshToken: false, hasClientId: false }));
    }, []);

    const cardClasses = ({ isActive }) =>
        [
            "flex flex-col items-center justify-center gap-2 rounded-2xl py-8 px-6",
            "text-lg font-semibold transition-all duration-300 shadow-lg",
            "border-2 border-transparent",
            isActive
                ? "bg-blue-500 dark:bg-blue-600 text-white scale-105 border-blue-600 dark:border-blue-400"
                : "bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 hover:scale-105 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-xl"
        ].join(" ");

    const externalCardClasses = 
        "flex flex-col items-center justify-center gap-2 rounded-2xl py-8 px-6 " +
        "text-lg font-semibold transition-all duration-300 shadow-lg " +
        "bg-gradient-to-br from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700 " +
        "text-white hover:scale-105 hover:shadow-xl border-2 border-green-600 dark:border-green-500";

    return (
        <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-700 px-4 py-8">
            <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

            {/* Header */}
            <div className="flex flex-col items-center mb-8 mt-8">
                <div className="flex items-center gap-4 mb-3">
                    <span className="text-5xl md:text-6xl drop-shadow-lg">🏢</span>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 tracking-tight">
                        Employee Portal
                    </h1>
                </div>
                <p className="mt-2 text-xl md:text-2xl text-gray-600 dark:text-gray-300 text-center font-medium">
                    Welcome to Timeshare Help Center
                </p>
                
                {/* Auth Status Badge */}
                {authStatus && (
                    <div className="mt-4 flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-800 shadow-md">
                        <span className={`w-3 h-3 rounded-full ${authStatus.hasRefreshToken ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {authStatus.hasRefreshToken ? 'Zoho Connected' : 'Zoho Setup Required'}
                        </span>
                        {!authStatus.hasRefreshToken && (
                            <a 
                                href="/oauth/start" 
                                className="ml-2 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                Connect
                            </a>
                        )}
                    </div>
                )}
            </div>

            <div className="w-full max-w-7xl mx-auto space-y-12">
                {/* External Links Section */}
                <section>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
                        <span className="text-3xl">🔗</span>
                        Quick Links
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {externalLinks.map((item) => (
                            <a 
                                key={item.url} 
                                href={item.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={externalCardClasses}
                            >
                                <span className="text-5xl mb-2">{item.emoji}</span>
                                <span className="text-xl">{item.label}</span>
                                <span className="text-sm opacity-90">{item.description}</span>
                                <span className="text-xs mt-1 opacity-75">↗ Opens in new tab</span>
                            </a>
                        ))}
                    </div>
                </section>

                {/* Internal Features Section */}
                <section>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
                        <span className="text-3xl">⚡</span>
                        Portal Features
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {internalFeatures.map((item) => (
                            <NavLink key={item.to} to={item.to} className={cardClasses}>
                                <span className="text-5xl mb-2">{item.emoji}</span>
                                <span className="text-xl">{item.label}</span>
                                <span className="text-xs text-gray-600 dark:text-gray-400 text-center">{item.description}</span>
                            </NavLink>
                        ))}
                    </div>
                </section>

                {/* Coming Soon Section */}
                <section className="pb-8">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
                        <span className="text-3xl">🚀</span>
                        Coming Soon
                    </h2>
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
                        <p className="text-gray-600 dark:text-gray-400 text-center text-lg">
                            More features will be added here. Stay tuned!
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
