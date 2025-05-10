"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Folder = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const file_entity_1 = require("./file.entity");
/**
 * @class Folder
 * @description This class represents a folder entity with its metadata
 * This class reflects the database table structure and is used for ORM mapping.
 */
let Folder = class Folder {
    /**
     * @constructor
     * @param {string} id - The unique identifier for the folder.
     * @param {string} folderName - The name of the folder.
     * @param {string} parentId - The ID of the parent folder.
     * @param {string} userId - The ID of the user who owns the folder.
     */
    constructor(id, folderName, parentId, userId) {
        this._id = id;
        this._folderName = folderName;
        this._parentId = parentId;
        this._userId = userId;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get folderName() {
        return this._folderName;
    }
    set folderName(value) {
        this._folderName = value;
    }
    get parentId() {
        return this._parentId;
    }
    set parentId(value) {
        this._parentId = value;
    }
    get userId() {
        return this._userId;
    }
    set userId(value) {
        this._userId = value;
    }
    get user() {
        return this._user;
    }
    set user(value) {
        this._user = value;
    }
    get subFolders() {
        return this._subFolders;
    }
    set subFolders(value) {
        this._subFolders = value;
    }
    get parentFolder() {
        return this._parentFolder;
    }
    set parentFolder(value) {
        this._parentFolder = value;
    }
    get files() {
        return this._files;
    }
    set files(value) {
        this._files = value;
    }
};
exports.Folder = Folder;
__decorate([
    (0, typeorm_1.PrimaryColumn)({
        name: "folder_id",
        generated: "uuid",
        type: "uuid",
        default: () => "uuid_generate_v4()",
    })
], Folder.prototype, "_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "folder_name",
        type: "varchar",
        nullable: false,
    })
], Folder.prototype, "_folderName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "parent_id",
        type: "uuid",
        nullable: true
    })
], Folder.prototype, "_parentId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "user_id",
        type: "uuid",
        nullable: false,
    })
], Folder.prototype, "_userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => user_entity_1.User, (user) => user.folders),
    (0, typeorm_1.JoinColumn)({ name: "user_id" })
], Folder.prototype, "_user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => Folder, (folder) => folder._parentFolder),
    (0, typeorm_1.JoinColumn)({ name: "parent_id" })
], Folder.prototype, "_subFolders", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => Folder, (folder) => folder._subFolders),
    (0, typeorm_1.JoinColumn)({ name: "parent_id" })
], Folder.prototype, "_parentFolder", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => file_entity_1.File, (file) => file.folder),
    (0, typeorm_1.JoinColumn)({ name: "folder_id" })
], Folder.prototype, "_files", void 0);
exports.Folder = Folder = __decorate([
    (0, typeorm_1.Entity)("folder", { schema: "public" })
], Folder);
