import {API_URL} from "../utils/constants.ts";

class SharedFileService {

    public async getSharedFileById(id: string): Promise<Response> {
        return await fetch(`${API_URL}/shared-file/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    public async createSharedFile(file: File, downloadsRemaining: number, timeToLive: number, roomId: string): Promise<Response> {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("downloadsRemaining", downloadsRemaining.toString());
        formData.append("timeToLive", timeToLive.toString());
        formData.append("roomId", roomId);

        return await fetch(`${API_URL}/shared-file`, {
            method: "POST",
            body: formData
        });
    }

    public async deleteSharedFile(id: string): Promise<Response> {
        return await fetch(`${API_URL}/shared-file/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    public async getSharedFilesByRoomId(roomId: string): Promise<Response> {
        return await fetch(`${API_URL}/shared-file/folder/room/${roomId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include'
        });
    }

    public async downloadFile(id: string): Promise<Response> {
        return await fetch(`${API_URL}/file/download/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include'
        });
    }
}

export const sharedFileService = new SharedFileService();