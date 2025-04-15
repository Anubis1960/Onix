export class UserDAO {
    id: number;
    email: string;

    toString() {
        return `UserDAO { id: ${this.id}, email: ${this.email} }`;
    }
}