"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compressFile = compressFile;
exports.decompressFile = decompressFile;
const pako_1 = __importDefault(require("pako"));
function compressFile(file) {
    try {
        return pako_1.default.deflate(file);
    }
    catch (error) {
        console.error('Error compressing data:', error);
        return new Uint8Array();
    }
}
function decompressFile(compressedData) {
    try {
        return Buffer.from(pako_1.default.inflate(compressedData));
    }
    catch (error) {
        console.error('Error decompressing data:', error);
        return Buffer.alloc(0);
    }
}
