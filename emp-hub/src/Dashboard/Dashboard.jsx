import { Link } from "react-router-dom";

const links = [
    { to: "/commissions", label: "Commission History" },
    { to: "/calculator", label: "MTD Calculator" },
    { to: "/leaderboard", label: "Call of Fame" },
    { to: "/knowledge", label: "Knowledge Center" },
];

export default function Dashboard() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-200 to-indigo-200 dark:from-slate-900 dark:to-slate-800 transition-colors duration-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl p-6">
                {links.map((link) => (
                    <Link
                        to={link.to}
                        key={link.to}
                        className="flex items-center justify-center bg-white/90 dark:bg-slate-900/90 shadow-2xl rounded-3xl py-10 px-8 text-xl font-semibold text-blue-800 dark:text-blue-200 hover:scale-105 hover:bg-blue-200/60 dark:hover:bg-slate-800/80 transition-all duration-300"
                    >
                        <h2 className="text-center">{link.label}</h2>
                    </Link>
                ))}
            </div>
        </div>
    );
}
