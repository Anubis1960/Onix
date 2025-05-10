import {API_URL} from "../utils/constants.ts";
import {PasswordManagerModel} from "../models/password-manager.model.ts";


export class PasswordManagerService {
    public async getPasswordById(id: string): Promise<PasswordManagerModel> {
        const response = await fetch(`${API_URL}/password-manager/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.json();
    }

    public async addPasswordEntry(domain: string, username: string, password: string, userId: string): Promise<PasswordManagerModel> {
        const response = await fetch(`${API_URL}/password-manager`, {
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
            })
        });
        return response.json();
    }

    public async updatePasswordEntry(id: string, domain: string, username: string, password: string): Promise<PasswordManagerModel> {
        const response = await fetch(`${API_URL}/password-manager/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                domain,
                username,
                password
            })
        });
        return response.json();
    }

    public async deletePasswordEntry(id: string): Promise<PasswordManagerModel> {
        const response = await fetch(`${API_URL}/password-manager/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.json();
    }

    public async getPasswordsByUserId(userId: string): Promise<PasswordManagerModel[]> {
        const response = await fetch(`${API_URL}/password-manager/user/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.json();
    }
}
