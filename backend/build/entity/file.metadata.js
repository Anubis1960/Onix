"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileMetadata = void 0;
const typeorm_1 = require("typeorm");
/**
 * @class FileMetadata
 * @description This class represents the metadata of a file.
 * This class reflects the database table structure and is used for ORM mapping.
 */
class FileMetadata {
    /**
     * @constructor
     * @param {string} id - The unique identifier for the file.
     * @param {string} fileName - The name of the file.
     * @param {number} fileSize - The size of the file in bytes.
     * @param {string} fileType - The MIME type of the file.
     * @param {string} storagePath - The path where the file is stored.
     */
    constructor(id, fileName, fileSize, fileType, storagePath) {
        this._id = id;
        this._fileName = fileName;
        this._fileSize = fileSize;
        this._fileType = fileType;
        this._storagePath = storagePath;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get fileName() {
        return this._fileName;
    }
    set fileName(value) {
        this._fileName = value;
    }
    get fileSize() {
        return this._fileSize;
    }
    set fileSize(value) {
        this._fileSize = value;
    }
    get fileType() {
        return this._fileType;
    }
    set fileType(value) {
        this._fileType = value;
    }
    get storagePath() {
        return this._storagePath;
    }
    set storagePath(value) {
        this._storagePath = value;
    }
}
exports.FileMetadata = FileMetadata;
__decorate([
    (0, typeorm_1.PrimaryColumn)({
        name: "file_id",
        generated: "uuid",
        type: "uuid",
        default: () => "uuid_generate_v4()",
    })
], FileMetadata.prototype, "_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "file_name",
        type: "varchar",
        length: 100,
    })
], FileMetadata.prototype, "_fileName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "file_size",
        type: "int",
    })
], FileMetadata.prototype, "_fileSize", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "file_type",
        type: "varchar",
        length: 100,
    })
], FileMetadata.prototype, "_fileType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "storage_path",
        type: "varchar",
        length: 255,
    })
], FileMetadata.prototype, "_storagePath", void 0);
