/**
 * @class PasswordManagerDto
 * @description Data Transfer Object for PasswordManager.
 */
export class PasswordManagerDto {
    private _domain: string;
    private _username: string;
    private _password: string;

    constructor(domain: string, name: string, password: string) {
        this._domain = domain;
        this._username = name;
        this._password = password;
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    get domain(): string {
        return this._domain;
    }

    set domain(value: string) {
        this._domain = value;
    }

    toString() {
        return `PasswordManagerDto { name: ${this._username}, password: ${this._password} }`;
    }
}