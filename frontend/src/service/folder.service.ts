import {API_URL} from "../utils/constants.ts";
import {FolderModel} from "../models/folder.model.ts";
import {FileModel} from "../models/file.model.ts";

class FolderService {

    public async getFolderById(id: string): Promise<FolderModel> {
        const response = await fetch(`${API_URL}/folder/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        });
        return response.json();
    }

    public async createFolder(name: string, parentId: string, userId: string): Promise<FolderModel> {
        const response: Response = await fetch(`${API_URL}/folder`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify({
                name,
                parentId,
                userId
            })
        });
        return response.json();
    }

    public async updateFolder(id: string, folderName?: string, parentId?: string): Promise<FolderModel> {

        const formData = new FormData();
        if (folderName) {
            formData.append("folderName", folderName);
        }
        if (parentId) {
            formData.append("parentId", parentId);
        }

        const response = await fetch(`${API_URL}/folder/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            },
            body: formData
        });
        return response.json();
    }

    public async deleteFolder(id: string): Promise<FolderModel> {
        const response = await fetch(`${API_URL}/folder/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        });
        return response.json();
    }

    public async getFoldersByUserId(userId: string): Promise<FolderModel[]> {
        const response = await fetch(`${API_URL}/folder/user/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        });
        return response.json();
    }

    public async getChildrenByParentId(parentId: string): Promise<{
        files: FileModel[],
        folders: FolderModel[]
    }> {
        const response = await fetch(`${API_URL}/folder/children/${parentId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        });
        return response.json();
    }
}

export const folderService = new FolderService();