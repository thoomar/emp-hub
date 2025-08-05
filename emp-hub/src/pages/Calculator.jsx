import { useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

export default function Calculator() {
    const [units, setUnits] = useState("");
    const [avgSale, setAvgSale] = useState("");
    const [goal, setGoal] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleCalculate = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://127.0.0.1:8000/api/calculate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    units_sold: Number(units),
                    avg_sale: Number(avgSale),
                    goal: Number(goal),
                }),
            });

            if (!response.ok) throw new Error("API Error");
            const data = await response.json();
            setResult(data);
        } catch (err) {
            console.error("Calculation failed:", err);
            setResult(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">🧮 MTD Calculator</h1>

            <div className="grid gap-4">
                <input
                    type="number"
                    value={units}
                    onChange={(e) => setUnits(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2"
                    placeholder="Units Sold"
                />
                <input
                    type="number"
                    value={avgSale}
                    onChange={(e) => setAvgSale(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2"
                    placeholder="Average Sale ($)"
                />
                <input
                    type="number"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2"
                    placeholder="Sales Goal ($)"
                />

                <button
                    onClick={handleCalculate}
                    disabled={loading}
                    className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    {loading ? "Calculating..." : "Calculate"}
                </button>
            </div>

            {result && (
                <>
                    <div className="mt-6 bg-white shadow rounded-xl p-4 border">
                        <p className="text-lg text-gray-800">
                            <strong>Total Sales:</strong> ${result.total_sales.toLocaleString()}
                        </p>
                        <p className="text-lg text-gray-800 mt-2">
                            <strong>% to Goal:</strong> {result.percent_to_goal}%
                        </p>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Performance Chart</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                                data={[
                                    { name: "Goal", amount: Number(goal) },
                                    { name: "Actual", amount: result.total_sales },
                                ]}
                                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="amount" fill="#2563EB" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </>
            )}
        </div>
    );
}
