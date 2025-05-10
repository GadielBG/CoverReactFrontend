import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./views/AuthPage";
import HomeView from "./views/HomeView";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<HomeView />} />
      </Routes>
    </BrowserRouter>
  );
}
