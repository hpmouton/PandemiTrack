import { React } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
function App() {
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage />} />
        </Routes>
    </BrowserRouter>
}

export default App;
