import pako from 'pako';

export function compressFile(file: Buffer): Uint8Array {
    try {
        return pako.deflate(file);
    } catch (error) {
        console.error('Error compressing data:', error);
        return new Uint8Array();
    }
}

export function decompressFile(compressedData: Uint8Array): Buffer {
    try {
        return Buffer.from(pako.inflate(compressedData));
    } catch (error) {
        console.error('Error decompressing data:', error);
        return Buffer.alloc(0);
    }
}