"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = void 0;
const typeorm_1 = require("typeorm");
const file_metadata_1 = require("./file.metadata");
const folder_entity_1 = require("./folder.entity");
/**
 * @class File
 * @extends FileMetadata
 * @description This class represents a file entity with its metadata and folder ID
 * This class reflects the database table structure and is used for ORM mapping.
 */
let File = class File extends file_metadata_1.FileMetadata {
    /**
     * @constructor
     * @param {string} id - The unique identifier for the file.
     * @param {string} fileName - The name of the file.
     * @param {number} fileSize - The size of the file in bytes.
     * @param {string} fileType - The MIME type of the file.
     * @param {string} folderId - The ID of the folder to which the file belongs.
     */
    constructor(id, fileName, fileSize, fileType, folderId) {
        super(id, fileName, fileSize, fileType, "");
        this._folderId = folderId;
    }
    get folderId() {
        return this._folderId;
    }
    set folderId(value) {
        this._folderId = value;
    }
    get folder() {
        return this._folder;
    }
    set folder(value) {
        this._folder = value;
    }
};
exports.File = File;
__decorate([
    (0, typeorm_1.Column)({
        name: "folder_id",
        type: "uuid",
        nullable: false,
    })
], File.prototype, "_folderId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => folder_entity_1.Folder, (folder) => folder.files),
    (0, typeorm_1.JoinColumn)({ name: "folder_id" })
], File.prototype, "_folder", void 0);
exports.File = File = __decorate([
    (0, typeorm_1.Entity)("file", { schema: "public" })
], File);
