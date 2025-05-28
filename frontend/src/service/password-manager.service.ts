import {API_URL} from "../utils/constants.ts";


class PasswordManagerService {
    public async getPasswordById(id: string): Promise<Response> {
        return await fetch(`${API_URL}/password-manager/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            credentials: 'include'
        });
    }

    public async addPasswordEntry(domain: string, username: string, password: string, userId: string): Promise<Response> {
        return await fetch(`${API_URL}/password-manager`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                domain,
                username,
                password,
                userId
            }),
            credentials: 'include'
        });
    }

    public async updatePasswordEntry(id: string, domain: string, username: string, password: string): Promise<Response> {
        return await fetch(`${API_URL}/password-manager/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                domain,
                username,
                password
            }),
            credentials: 'include'
        });
    }

    public async deletePasswordEntry(id: string): Promise<Response> {
        return await fetch(`${API_URL}/password-manager/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            credentials: 'include'
        });
    }

    public async getPasswordsByUserId(userId: string): Promise<Response> {
        return await fetch(`${API_URL}/password-manager/user/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            credentials: 'include'
        });
    }
}

export const passwordManagerService = new PasswordManagerService();
