import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import KnowledgeBase from "../pages/KnowledgeBase.jsx";
import CallofFame from "../pages/CallofFame.jsx";
import Calculator from "../pages/Calculator";
import Commissions from "../pages/Commissions";

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/knowledge" element={<KnowledgeBase />} />
        <Route path="/leaderboard" element={<CallofFame />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/commissions" element={<Commissions />} />
        {/* Add more routes as needed */}
    </Routes>
);

export default AppRoutes;
