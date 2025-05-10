"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;
const bcrypt_1 = __importDefault(require("bcrypt"));
/**
 * Hashes a password using bcrypt.
 * @param password - The password to hash.
 * @returns The hashed password.
 */
function hashPassword(password) {
    return bcrypt_1.default.hashSync(password, bcrypt_1.default.genSaltSync(10));
}
/**
 * Compares a password with a hashed password.
 * @param password - The password to compare.
 * @param hash - The hashed password to compare against.
 * @returns True if the passwords match, false otherwise.
 */
function comparePassword(password, hash) {
    return bcrypt_1.default.compareSync(password, hash);
}
