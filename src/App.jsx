import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import "./index.css";
import { HomePage } from "./pages/HomePage/HomePage";
import { Wish } from "./pages/WishPage/Wish";
import { Intro } from "./pages/Intro/Intro";
function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/intro" element={<Intro />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/" element={<Navigate to="/intro" replace />} />
                    <Route path="/wish" element={<Wish />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
