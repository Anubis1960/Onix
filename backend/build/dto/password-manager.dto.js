"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordManagerDto = void 0;
/**
 * @class PasswordManagerDto
 * @description Data Transfer Object for PasswordManager.
 */
class PasswordManagerDto {
    constructor(domain, name, password) {
        this.domain = domain;
        this.username = name;
        this.password = password;
    }
    toString() {
        return `PasswordManagerDto { name: ${this.username}, password: ${this.password} }`;
    }
}
exports.PasswordManagerDto = PasswordManagerDto;
