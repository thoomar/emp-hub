import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const externalLinks = [
    { 
        url: "https://timeoff.timesharehelpcenter.com", 
        label: "Time Off Requests", 
        icon: "calendar",
        description: "Submit and manage time off"
    },
    { 
        url: "https://lst.timesharehelpcenter.com", 
        label: "Live Sales Tracker", 
        icon: "chart",
        description: "Real-time sales performance"
    },
];

const internalFeatures = [
    { to: "/leaderboard", label: "Call of Fame", icon: "trophy", description: "Top performers" },
    { to: "/knowledge", label: "Knowledge Base", icon: "book", description: "Resources & guides" },
    { to: "/calculator", label: "Calculator", icon: "calculator", description: "Financial tools" },
    { to: "/commissions", label: "Commissions", icon: "dollar", description: "Earnings tracker" },
];

export default function Home() {
    const [authStatus, setAuthStatus] = useState(null);

    useEffect(() => {
        // Always use dark mode
        document.documentElement.classList.add("dark");
    }, []);

    useEffect(() => {
        // Check Zoho and O365 auth status
        fetch('/api/config')
            .then(res => res.json())
            .then(data => {
                setAuthStatus({
                    zoho: {
                        hasRefreshToken: data.hasRefreshToken,
                        hasClientId: data.hasClientId
                    },
                    o365: {
                        hasToken: data.hasO365Token,
                        hasConfig: data.hasO365Config
                    }
                });
            })
            .catch(() => setAuthStatus({ 
                zoho: { hasRefreshToken: false, hasClientId: false },
                o365: { hasToken: false, hasConfig: false }
            }));
    }, []);

    const cardClasses = ({ isActive }) =>
        [
            "flex flex-col items-center justify-center gap-2 rounded-xl py-8 px-6",
            "text-lg font-semibold transition-all duration-300 shadow-lg",
            "border border-gray-700/50",
            isActive
                ? "bg-yellow-400 text-black scale-105 border-yellow-400"
                : "bg-gray-800 text-gray-100 hover:bg-gray-750 hover:scale-[1.02] hover:border-yellow-400/50 hover:shadow-yellow-400/20"
        ].join(" ");

    const externalCardClasses = 
        "flex flex-col items-center justify-center gap-3 rounded-xl py-10 px-8 " +
        "text-lg font-semibold transition-all duration-300 shadow-lg " +
        "bg-gradient-to-br from-yellow-400 to-yellow-500 " +
        "text-black hover:scale-[1.02] hover:shadow-2xl hover:shadow-yellow-500/30 border border-yellow-500";

    return (
        <div className="min-h-screen w-full flex flex-col items-center bg-black transition-colors duration-700 px-4 py-8">

            {/* Header */}
            <div className="flex flex-col items-center mb-10 mt-8">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-yellow-400 rounded-lg flex items-center justify-center shadow-lg shadow-yellow-500/50">
                        <svg className="w-8 h-8 md:w-10 md:h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-yellow-400 tracking-tight">
                        Employee Portal
                    </h1>
                </div>
                <p className="mt-2 text-lg md:text-xl text-gray-300 text-center font-medium">
                    Timeshare Help Center
                </p>
                
                {/* Auth Status Badges */}
                {authStatus && (
                    <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
                        {/* Zoho Badge */}
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800 border border-gray-700 shadow-lg">
                            <span className={`w-3 h-3 rounded-full ${authStatus.zoho.hasRefreshToken ? 'bg-green-500' : 'bg-yellow-400'}`}></span>
                            <span className="text-sm font-medium text-gray-200">
                                {authStatus.zoho.hasRefreshToken ? 'Zoho Connected' : 'Zoho Setup Required'}
                            </span>
                            {!authStatus.zoho.hasRefreshToken && (
                                <a 
                                    href="/oauth/start" 
                                    className="ml-2 text-xs text-yellow-400 hover:text-yellow-300 hover:underline"
                                >
                                    Connect
                                </a>
                            )}
                        </div>
                        
                        {/* O365 Badge */}
                        {authStatus.o365.hasConfig && (
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800 border border-gray-700 shadow-lg">
                                <span className={`w-3 h-3 rounded-full ${authStatus.o365.hasToken ? 'bg-green-500' : 'bg-yellow-400'}`}></span>
                                <span className="text-sm font-medium text-gray-200">
                                    {authStatus.o365.hasToken ? 'O365 Connected' : 'O365 Setup Required'}
                                </span>
                                {!authStatus.o365.hasToken && (
                                    <a 
                                        href="/oauth/o365/start" 
                                        className="ml-2 text-xs text-yellow-400 hover:text-yellow-300 hover:underline"
                                    >
                                        Connect
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="w-full max-w-7xl mx-auto space-y-12">
                {/* External Links Section */}
                <section>
                    <h2 className="text-2xl font-bold text-yellow-400 mb-6">
                        Quick Access
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
                                <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mb-3">
                                    {item.icon === 'calendar' && (
                                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                    {item.icon === 'chart' && (
                                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                                        </svg>
                                    )}
                                </div>
                                <span className="text-xl font-bold">{item.label}</span>
                                <span className="text-sm opacity-90">{item.description}</span>
                            </a>
                        ))}
                    </div>
                </section>

                {/* Internal Features Section */}
                <section>
                    <h2 className="text-2xl font-bold text-yellow-400 mb-6">
                        Portal Tools
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {internalFeatures.map((item) => (
                            <NavLink key={item.to} to={item.to} className={cardClasses}>
                                <div className="w-12 h-12 bg-yellow-400/10 border border-yellow-400/30 rounded-lg flex items-center justify-center mb-3">
                                    {item.icon === 'trophy' && (
                                        <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" />
                                        </svg>
                                    )}
                                    {item.icon === 'book' && (
                                        <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                                        </svg>
                                    )}
                                    {item.icon === 'calculator' && (
                                        <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 100 2h.01a1 1 0 100-2H13zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM7 8a1 1 0 000 2h.01a1 1 0 000-2H7z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                    {item.icon === 'dollar' && (
                                        <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </div>
                                <span className="text-base font-semibold">{item.label}</span>
                                <span className="text-xs text-gray-400 text-center">{item.description}</span>
                            </NavLink>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
