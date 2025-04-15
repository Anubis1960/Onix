import crypto from "crypto";

export function hashPassword(password: string) {
    let salt = crypto.randomBytes(128).toString("base64");
    let iterations = 10000;
    let keylen = 256;
    let digest = "sha512";
    let hash = crypto.pbkdf2Sync(password, salt, iterations, keylen, digest);
    let hashString = hash.toString("base64");
    console.log(hashString.length);
    return {
        salt: salt,
        hash: hashString,
    };
}

export function decryptPassword(password: string, salt: string) {
    let iterations = 10000;
    let keylen = 256;
    let digest = "sha512";
    let hash = crypto.pbkdf2Sync(password, salt, iterations, keylen, digest);
    return hash.toString("base64");
}