import bcrypt from "bcrypt";

export function hashPassword(password: string): string {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

export function comparePassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
}