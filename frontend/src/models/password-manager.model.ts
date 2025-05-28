export class PasswordManagerModel {
    [x: string]: any;

    public id: string;
    public domain: string;
    public username: string;
    public password: string;

    constructor(id: string, domain: string, username: string, password: string) {
        this.id = id;
        this.domain = domain;
        this.username = username;
        this.password = password;
    }

    toString() {
        return `PasswordManagerModel { domain: ${this.domain}, username: ${this.username}, password: ${this.password} }`;
    }
}