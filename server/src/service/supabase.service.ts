import supabase from "../config/supabase.config";
import {compressFile, decompressFile} from "../utils/archive.utils";
import logger from "../config/logger.config";

/**
 * @class SupabaseService
 * @description This class provides methods to interact with Supabase storage.
 * @method uploadFile - Uploads a file to Supabase storage.
 * @method getFile - Retrieves a file from Supabase storage.
 * @method deleteFile - Deletes a file from Supabase storage.
 */

export class SupabaseService {
    async uploadFile(bucket: string, filePath: string, file: Buffer, mimetype: string) {
        // compress file
        const {data, error} = await supabase.storage.from(bucket).upload(filePath, file, {
            contentType: mimetype,
        });
        if (error) {
            return null;
        }
        return data;
    }

    async getFile(bucket: string, filePath: string) {
        const {data, error} = await supabase.storage.from(bucket).download(filePath);
        if (error) {
            return null;
        }
        return data;
    }

    async deleteFile(bucket: string, filePath: string) {
        const {data, error} = await supabase.storage.from(bucket).remove([filePath]);
        if (error) {
            return null;
        }
        return data;
    }

    async moveFile(bucket: string, oldFilePath: string, newFilePath: string) {
        const {data, error} = await supabase.storage.from(bucket).move(oldFilePath, newFilePath);
        if (error) {
            return null;
        }
        return data;
    }
}