export class UserPasswordDto {
    public domain: string;
    public username: string;
    public password: string;
    public userId: string;

    constructor(domain: string, username: string, password: string, userId: string) {
        this.domain = domain;
        this.username = username;
        this.password = password;
        this.userId = userId;
    }
}