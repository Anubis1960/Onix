import {UserModel} from "../models/user.model.ts";

export class AuthService {
    public async login(email: string, password: string): Promise<{
        accessToken: string,
        user: UserModel,
    }> {
        const response = await fetch(`http://localhost:5000/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        });
        return response.json();
    }

    public async register(email: string, password: string): Promise<UserModel> {
        const response = await fetch(`http://localhost:5000/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        });
        return response.json();
    }

    public async logout(): Promise<void> {
        await fetch(`http://localhost:5000/auth/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    public async refreshToken(): Promise<{ accessToken: string }> {
        const response = await fetch(`http://localhost:5000/auth/refresh-token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        });
        return response.json();
    }
}