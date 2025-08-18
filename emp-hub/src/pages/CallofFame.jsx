import { useEffect } from "react";
import api from "../api/client";

export default function CallofFame() {
    useEffect(() => {
        api
            .get("/leaderboard")
            .then(() => {
                // Placeholder: handle leaderboard data here
            })
            .catch((err) => {
                console.error("Failed to fetch leaderboard", err);
            });
    }, []);

    return (
        <section className="section">
            <h2>Call of Fame</h2>
            <p>Top performers and team metrics. (We can connect this to your data source next.)</p>
        </section>
    );
}
