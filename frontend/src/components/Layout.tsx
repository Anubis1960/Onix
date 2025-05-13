import React from "react";

function Layout({children}: { children: React.ReactNode }) {
    return (
        <div className="layout">
            <header>
                <h1>My Application</h1>
            </header>
            <main>{children}</main>
            <footer>
                <p>&copy; 2023 My Application</p>
            </footer>
        </div>
    );
}

export default Layout;