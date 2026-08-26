import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { HomePage } from "./pages/HomePage";
import { ProfileTest } from "./pages/ProfileTest";
import { ProfileResults } from "./pages/ProfileResults";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/test" element={<ProfileTest />} />
        <Route path="/profile" element={<ProfileResults />} />

        {/* Redirect unknown routes to the home page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
