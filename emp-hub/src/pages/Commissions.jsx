import { useEffect, useState } from "react";

export default function Commissions() {
    const [commissions, setCommissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        setError("");
        fetch("http://127.0.0.1:8000/api/commissions")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch commissions");
                return res.json();
            })
            .then((data) => {
                setCommissions(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Commissions
            </h2>
            {loading && (
                <div className="text-gray-500 dark:text-gray-400">Loading...</div>
            )}
            {error && <div className="text-red-500">{error}</div>}
            <pre className="mt-4 text-sm bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 rounded">
                {JSON.stringify(commissions, null, 2)}
            </pre>
        </div>
    );
}
