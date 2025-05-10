import {API_URL} from "../utils/constants.ts";
import {FileModel} from "../models/file.model.ts";

export class FileService {
    public async getFileById(id: string): Promise<FileModel> {
        const response = await fetch(`${API_URL}/file/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            }
        });
        return response.json();
    }

    public async createFile(file: File, folderId: string, userId: string): Promise<FileModel> {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folderId", folderId);
        formData.append("userId", userId);

        const response = await fetch(`${API_URL}/file`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: formData
        });
        return response.json();
    }

    public async updateFile(id: string, fileName?: string, folderId?: string): Promise<FileModel> {
        const formData = new FormData();
        if (fileName) {
            formData.append("fileName", fileName);
        }
        if (folderId) {
            formData.append("folderId", folderId);
        }
        const response = await fetch(`${API_URL}/file/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: formData
        });
        return response.json();
    }

    public async deleteFile(id: string): Promise<FileModel> {
        const response = await fetch(`${API_URL}/file/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            }
        });
        return response.json();
    }

    public async getFilesByFolderId(folderId: string): Promise<FileModel[]> {
        const response = await fetch(`${API_URL}/file/folder/${folderId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            }
        });
        return response.json();
    }

    public async downloadFile(id: string): Promise<Blob> {
        const response = await fetch(`${API_URL}/file/download/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            }
        });
        return response.blob();
    }


}