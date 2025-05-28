import {API_URL} from "../utils/constants.ts";

class FolderService {

    public async getFolderById(id: string): Promise<Response> {
        const response = await fetch(`${API_URL}/folder/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            },
            credentials: 'include'
        });
        return response.json();
    }

    public async createFolder(name: string, parentId: string, userId: string): Promise<Response> {
        return await fetch(`${API_URL}/folder`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify({
                name,
                parentId,
                userId
            }),
            credentials: 'include'
        });
    }

    public async updateFolder(id: string, folderName?: string, parentId?: string): Promise<Response> {

        const formData = new FormData();
        if (folderName) {
            formData.append("folderName", folderName);
        }
        if (parentId) {
            formData.append("parentId", parentId);
        }

        return await fetch(`${API_URL}/folder/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            },
            body: formData,
            credentials: 'include'
        });
    }

    public async deleteFolder(id: string): Promise<Response> {
        return await fetch(`${API_URL}/folder/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            },
            credentials: 'include'
        });
    }

    public async getFoldersByUserId(userId: string): Promise<Response> {
        return await fetch(`${API_URL}/folder/user/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            },
            credentials: 'include'
        });
    }

    public async getRootFolder(userId: string): Promise<Response> {
        return await fetch(`${API_URL}/folder/user/${userId}/root`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            },
            credentials: 'include'
        });
    }

    public async getChildrenByParentId(parentId: string): Promise<Response> {
        return await fetch(`${API_URL}/folder/children/${parentId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            },
            credentials: 'include'
        });
    }
}

export const folderService = new FolderService();