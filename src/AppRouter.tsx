import { Routes, Route, Navigate } from "react-router-dom";
import {
  CheckupStartPage,
  CheckupVerifyPage,
  CheckupResultPage,
} from "@/pages/checkup";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/checkup/start" replace />} />
      <Route path="/checkup/start" element={<CheckupStartPage />} />
      <Route path="/checkup/verify" element={<CheckupVerifyPage />} />
      <Route path="/checkup/result" element={<CheckupResultPage />} />
    </Routes>
  );
}
