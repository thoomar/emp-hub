import { Link } from "react-router-dom";

const links = [
    { to: "/commissions", label: "Commission History" },
    { to: "/calculator", label: "MTD Calculator" },
    { to: "/leaderboard", label: "Call of Fame" },
    { to: "/knowledge", label: "Knowledge Center" },
];

export default function Dashboard() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
            {links.map((link) => (
                <Link
                    to={link.to}
                    key={link.to}
                    className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300"
                >
                    <h2 className="text-xl font-semibold text-gray-800">{link.label}</h2>
                </Link>
            ))}
        </div>
    );
}
