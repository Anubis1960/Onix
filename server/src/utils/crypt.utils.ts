import bcrypt from "bcrypt";

/**
 * Hashes a password using bcrypt.
 * @param password - The password to hash.
 * @returns The hashed password.
 */
export function hashPassword(password: string): string {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

/**
 * Compares a password with a hashed password.
 * @param password - The password to compare.
 * @param hash - The hashed password to compare against.
 * @returns True if the passwords match, false otherwise.
 */
export function comparePassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
}