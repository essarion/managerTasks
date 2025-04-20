import React from "react";
import { Route, Routes } from "react-router-dom";

import LoginForm from "./pages/LoginForm";
import DashBoard from "./pages/DashBoard";
import GreetingScreen from "./pages/GreetingScreen";

function App() {
    return (
        <Routes>
            <Route path='/' element={<GreetingScreen />} />
            <Route path='/dashboard' element={<DashBoard />} />
            <Route path='/login' element={<LoginForm />} />
        </Routes>
    )
}


export default App



