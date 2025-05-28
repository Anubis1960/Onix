import {API_URL} from "../utils/constants.ts";

class FileService {
    public async getFileById(id: string): Promise<Response> {
        return await fetch(`${API_URL}/file/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            },
            credentials: 'include'
        });
    }

    public async createFile(file: File, folderId: string, userId: string): Promise<Response> {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folderId", folderId);
        formData.append("userId", userId);

        return await fetch(`${API_URL}/file`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: formData,
            credentials: 'include'
        });
    }

    public async updateFile(id: string, fileName?: string, folderId?: string): Promise<Response> {
        const formData = new FormData();
        if (fileName) {
            formData.append("fileName", fileName);
        }
        if (folderId) {
            formData.append("folderId", folderId);
        }
        return await fetch(`${API_URL}/file/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: formData,
            credentials: 'include'
        });
    }

    public async deleteFile(id: string): Promise<Response> {
        return await fetch(`${API_URL}/file/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            },
            credentials: 'include'
        });
    }

    public async getFilesByFolderId(folderId: string): Promise<Response> {
        return await fetch(`${API_URL}/file/folder/${folderId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            },
            credentials: 'include'
        });
    }

    public async downloadFile(id: string): Promise<Response> {
        return await fetch(`${API_URL}/file/download/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            },
            credentials: 'include'
        });
    }

}

export const fileService = new FileService();