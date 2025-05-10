"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseService = void 0;
const supabase_config_1 = __importDefault(require("../config/supabase.config"));
/**
 * @class SupabaseService
 * @description This class provides methods to interact with Supabase storage.
 * @method uploadFile - Uploads a file to Supabase storage.
 * @method getFile - Retrieves a file from Supabase storage.
 * @method deleteFile - Deletes a file from Supabase storage.
 */
class SupabaseService {
    uploadFile(bucket, filePath, file, mimetype) {
        return __awaiter(this, void 0, void 0, function* () {
            // compress file
            const { data, error } = yield supabase_config_1.default.storage.from(bucket).upload(filePath, file, {
                contentType: mimetype,
            });
            if (error) {
                return null;
            }
            return data;
        });
    }
    getFile(bucket, filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase_config_1.default.storage.from(bucket).download(filePath);
            if (error) {
                return null;
            }
            return data;
        });
    }
    deleteFile(bucket, filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase_config_1.default.storage.from(bucket).remove([filePath]);
            if (error) {
                return null;
            }
            return data;
        });
    }
    moveFile(bucket, oldFilePath, newFilePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase_config_1.default.storage.from(bucket).move(oldFilePath, newFilePath);
            if (error) {
                return null;
            }
            return data;
        });
    }
}
exports.SupabaseService = SupabaseService;
