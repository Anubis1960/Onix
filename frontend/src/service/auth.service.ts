import {UserModel} from "../models/user.model.ts";

class AuthService {
    public async login(email: string, password: string): Promise<Response> {
        return await fetch(`http://localhost:5000/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password}),
            credentials: 'include'
        });
    }

    public async register(email: string, password: string): Promise<Response> {
        return await fetch(`http://localhost:5000/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password}),
            credentials: 'include'
        });
    }

    public async logout(): Promise<void> {
        await fetch(`http://localhost:5000/auth/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include'
        });
    }

    public async refreshToken(): Promise<Response> {
        return await fetch(`http://localhost:5000/auth/refresh-token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include'
        });
    }

    public getCurrentUser(): UserModel | null {
        const user = localStorage.getItem("user");
        if (user) {
            return JSON.parse(user);
        }
        return null;
    }
}

export const authService = new AuthService();