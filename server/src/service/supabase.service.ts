import supabase from "../config/supabase.config";

/**
 * @class SupabaseService
 * @description This class provides methods to interact with Supabase storage.
 * @method uploadFile - Uploads a file to Supabase storage.
 * @method getFile - Retrieves a file from Supabase storage.
 * @method deleteFile - Deletes a file from Supabase storage.
 */

export class SupabaseService {
    async uploadFile(filePath: string, file: any) {
        const {data, error} = await supabase.storage.from("vault").upload(filePath, file, {
            upsert: true,
        });
        if (error) {
            throw new Error(`Error uploading file: ${error.message}`);
        }
        return data;
    }

    async getFile(filePath: string) {
        const {data, error} = await supabase.storage.from("vault").download(filePath);
        if (error) {
            throw new Error(`Error retrieving file: ${error.message}`);
        }
        return data;
    }

    async deleteFile(filePath: string) {
        const {data, error} = await supabase.storage.from("vault").remove([filePath]);
        if (error) {
            throw new Error(`Error deleting file: ${error.message}`);
        }
        return data;
    }
}