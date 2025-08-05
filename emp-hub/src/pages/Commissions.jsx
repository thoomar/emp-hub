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
        <div>
            <h2>Commissions</h2>
            {loading && <div>Loading...</div>}
            {error && <div style={{ color: "red" }}>{error}</div>}
            <pre>{JSON.stringify(commissions, null, 2)}</pre>
        </div>
    );
}
