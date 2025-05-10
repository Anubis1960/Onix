"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const folder_entity_1 = require("./folder.entity");
const password_manager_entity_1 = require("./password-manager.entity");
/**
 * @class User
 * @description This class represents a user entity with its metadata
 * This class reflects the database table structure and is used for ORM mapping.
 */
let User = class User {
    /**
     * @constructor
     * @param {string} id - The unique identifier for the user.
     * @param {string} email - The email of the user.
     * @param {string} password - The password of the user.
     */
    constructor(id, email, password) {
        this._id = id;
        this._email = email;
        this._password = password;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get email() {
        return this._email;
    }
    set email(value) {
        this._email = value;
    }
    get password() {
        return this._password;
    }
    set password(value) {
        this._password = value;
    }
    get folders() {
        return this._folders;
    }
    set folders(value) {
        this._folders = value;
    }
    get passwordManagers() {
        return this._passwordManagers;
    }
    set passwordManagers(value) {
        this._passwordManagers = value;
    }
    toString() {
        return `User { user_id: ${this._id}, email: ${this._email}`;
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryColumn)({
        name: "user_id",
        generated: "uuid",
        type: "uuid",
        default: () => "uuid_generate_v4()",
    })
], User.prototype, "_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 100,
        unique: true,
        nullable: false
    })
], User.prototype, "_email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 60,
        nullable: false,
    })
], User.prototype, "_password", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => folder_entity_1.Folder, (folder) => folder.user)
], User.prototype, "_folders", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => password_manager_entity_1.PasswordManager, (passwordManager) => passwordManager.user)
], User.prototype, "_passwordManagers", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)("user", { schema: "public" })
], User);
