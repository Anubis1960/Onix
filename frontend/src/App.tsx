import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {ProtectedRoute, PublicRoute} from './components/AuthGuard.tsx'
import './App.css'
import {Login} from "./pages/login/Login.tsx";
import {Register} from "./pages/register/Register.tsx";
import Layout from "./components/Layout.tsx";

function App() {
    return (
        <>
            <Layout>
                <BrowserRouter>
                    <Routes>
                        <Route element={<ProtectedRoute/>}>
                            <Route path="/" element={<div>Home</div>}/>
                        </Route>
                        <Route element={<PublicRoute/>}>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/register" element={<Register/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Layout>
        </>
    )
}

export default App
