import {API_URL} from "../utils/constants.ts";
import {SharedFileModel} from "../models/shared-file.model.ts";

export class SharedFileService {

    public async getSharedFileById(id: string): Promise<SharedFileModel> {
        const response = await fetch(`${API_URL}/shared-file/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.json();
    }

    public async createSharedFile(file: File, downloadsRemaining: number, timeToLive: number, roomId: string): Promise<SharedFileModel> {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("downloadsRemaining", downloadsRemaining.toString());
        formData.append("timeToLive", timeToLive.toString());
        formData.append("roomId", roomId);

        const response = await fetch(`${API_URL}/shared-file`, {
            method: "POST",
            body: formData
        });
        return response.json();
    }

    public async deleteSharedFile(id: string): Promise<SharedFileModel> {
        const response = await fetch(`${API_URL}/shared-file/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.json();
    }

    public async getSharedFilesByRoomId(roomId: string): Promise<SharedFileModel[]> {
        const response = await fetch(`${API_URL}/shared-file/folder/room/${roomId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.json();
    }

    public async downloadFile(id: string): Promise<Blob> {
        const response = await fetch(`${API_URL}/file/download/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.blob();
    }
}