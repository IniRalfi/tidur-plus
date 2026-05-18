import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ProfilPage from "./pages/anggota/ProfilPage"; 
import CallbackPage from "./pages/auth/CallbackPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        //Routing
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profil" element={<ProfilPage />} />
        <Route path="/auth/google/callback" element={<CallbackPage />} />
      </Routes>
    </BrowserRouter>
  );
}