import {useEffect, useState} from 'react';
import {Navigate, Outlet} from 'react-router-dom';


function ProtectedRoute() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    return (
        <div>
            {isAuthenticated ? (
                <Outlet/>
            ) : (
                <Navigate to="/login"/>
            )}
        </div>
    );
}

function PublicRoute() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    return (
        <div>
            {isAuthenticated ? (
                <Navigate to="/"/>
            ) : (
                <Outlet/>
            )}
        </div>
    );
}


export {ProtectedRoute, PublicRoute};