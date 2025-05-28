import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import {Login} from "./pages/login/Login.tsx";
import {Register} from "./pages/register/Register.tsx";
import {GeneratePasskey} from "./pages/generate-passkey/GeneratePasskey.tsx";
import {PasswordDashboardPage} from "./pages/password-dashboard/PasswordDashboard.tsx";
import Layout from "./components/Layout.tsx";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/generate-passkey" element={<GeneratePasskey/>}/>
                    <Route path="/password-dashboard" element={<PasswordDashboardPage/>}/>
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;