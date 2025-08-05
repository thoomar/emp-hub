import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Knowledge from "../pages/Knowledge";
import Leaderboard from "../pages/Leaderboard";
import Calculator from "../pages/Calculator";
import Commissions from "../pages/Commissions";

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/knowledge" element={<Knowledge />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/commissions" element={<Commissions />} />
        {/* Add more routes as needed */}
    </Routes>
);

export default AppRoutes;
