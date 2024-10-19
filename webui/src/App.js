import { React } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import Analytics from "./Analytics";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/analytics" element={<Analytics />} />
            </Routes>
        </BrowserRouter>
        );
}

export default App;
