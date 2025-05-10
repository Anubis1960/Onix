/**
 * @class PasswordManagerDto
 * @description Data Transfer Object for PasswordManager.
 */
export class PasswordManagerDto {
    public id: string;
    public domain: string;
    public username: string;
    public password: string;

    constructor(id: string, domain: string, name: string, password: string) {
        this.id = id;
        this.domain = domain;
        this.username = name;
        this.password = password;
    }

    toString() {
        return `PasswordManagerDto { name: ${this.username}, password: ${this.password} }`;
    }
}