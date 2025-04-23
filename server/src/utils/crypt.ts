import bcrypt from "bcrypt";

export function hashPassword(password: string): string {
    let hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    console.log(hash);
    return hash
}

export function comparePassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
}