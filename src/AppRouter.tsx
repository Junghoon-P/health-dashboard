import { Routes, Route, Navigate } from "react-router-dom";
import {
  CheckupStartPage,
  CheckupVerifyPage,
  CheckupResultPage,
  CheckupErrorPage,
} from "@/pages/checkup";
import { GlobalLoadingSpinner } from "@/components";

export function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/checkup/start" replace />} />
        <Route path="/checkup/start" element={<CheckupStartPage />} />
        <Route path="/checkup/verify" element={<CheckupVerifyPage />} />
        <Route path="/checkup/result" element={<CheckupResultPage />} />
        <Route path="/checkup/error" element={<CheckupErrorPage />} />
      </Routes>
      <GlobalLoadingSpinner />
    </>
  );
}
