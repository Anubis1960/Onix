"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedFile = void 0;
const typeorm_1 = require("typeorm");
const file_metadata_1 = require("./file.metadata");
/**
 * @class SharedFile
 * @extends FileMetadata
 * @description This class represents a shared file entity with its metadata
 * This class reflects the database table structure and is used for ORM mapping.
 */
let SharedFile = class SharedFile extends file_metadata_1.FileMetadata {
    /**
     * @constructor
     * @param {string} id - The unique identifier for the shared file.
     * @param {string} fileName - The name of the file.
     * @param {number} fileSize - The size of the file in bytes.
     * @param {string} fileType - The MIME type of the file.
     * @param {string} roomId - The ID of the room to which the file is shared.
     * @param {number} downloadsRemaining - The number of downloads remaining for the shared file.
     * @param {number} timeToLive - The time to live for the shared file in seconds.
     */
    constructor(id, fileName, fileSize, fileType, roomId, downloadsRemaining, timeToLive) {
        super(id, fileName, fileSize, fileType, "");
        this._roomId = roomId;
        this._downloadsRemaining = downloadsRemaining;
        this._timeToLive = timeToLive;
        this._createdAt = new Date();
    }
    get roomId() {
        return this._roomId;
    }
    set roomId(value) {
        this._roomId = value;
    }
    get downloadsRemaining() {
        return this._downloadsRemaining;
    }
    set downloadsRemaining(value) {
        this._downloadsRemaining = value;
    }
    get timeToLive() {
        return this._timeToLive;
    }
    set timeToLive(value) {
        this._timeToLive = value;
    }
    get createdAt() {
        return this._createdAt;
    }
    set createdAt(value) {
        this._createdAt = value;
    }
};
exports.SharedFile = SharedFile;
__decorate([
    (0, typeorm_1.Column)({
        name: "room_id",
        type: "uuid",
        nullable: false,
    })
], SharedFile.prototype, "_roomId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "downloads_remaining",
        type: "int2",
        nullable: false
    })
], SharedFile.prototype, "_downloadsRemaining", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "time_to_live",
        type: "int2",
        nullable: false
    })
], SharedFile.prototype, "_timeToLive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: "created_at",
        type: "timestamp",
        default: Date.now(),
        nullable: false
    })
], SharedFile.prototype, "_createdAt", void 0);
exports.SharedFile = SharedFile = __decorate([
    (0, typeorm_1.Entity)("shared_file", { schema: "public" })
], SharedFile);
