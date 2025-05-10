"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordManager = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
/**
 * @class PasswordManager
 * @description This class represents a password manager entity with its metadata
 * This class reflects the database table structure and is used for ORM mapping.
 */
let PasswordManager = class PasswordManager {
    /**
     * @constructor
     * @param {string} id - The unique identifier for the password manager entry.
     * @param {string} userId - The ID of the user who owns this entry.
     * @param {string} domain - The domain associated with the password.
     * @param {string} username - The username for the password entry.
     * @param {string} password - The password for the entry.
     */
    constructor(id, userId, domain, username, password) {
        this._id = id;
        this._userId = userId;
        this._domain = domain;
        this._username = username;
        this._password = password;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get userId() {
        return this._userId;
    }
    set userId(value) {
        this._userId = value;
    }
    get domain() {
        return this._domain;
    }
    set domain(value) {
        this._domain = value;
    }
    get username() {
        return this._username;
    }
    set username(value) {
        this._username = value;
    }
    get password() {
        return this._password;
    }
    set password(value) {
        this._password = value;
    }
    get user() {
        return this._user;
    }
    set user(value) {
        this._user = value;
    }
};
exports.PasswordManager = PasswordManager;
__decorate([
    (0, typeorm_1.PrimaryColumn)({
        name: "password_id",
        type: "uuid",
        generated: "uuid",
        default: () => "uuid_generate_v4()",
    })
], PasswordManager.prototype, "_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "user_id",
        type: "uuid",
        nullable: false,
        primary: false,
    })
], PasswordManager.prototype, "_userId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "domain",
        type: "varchar",
        length: 255,
        nullable: false,
    })
], PasswordManager.prototype, "_domain", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "username",
        type: "varchar",
        length: 255,
        nullable: false,
    })
], PasswordManager.prototype, "_username", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "password",
        type: "varchar",
        length: 255,
        nullable: false,
    })
], PasswordManager.prototype, "_password", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => user_entity_1.User, (user) => user.passwordManagers),
    (0, typeorm_1.JoinColumn)({ name: "user_id" })
], PasswordManager.prototype, "_user", void 0);
exports.PasswordManager = PasswordManager = __decorate([
    (0, typeorm_1.Entity)("password_manager", { schema: "public" })
], PasswordManager);
