export class FileVaultDto {
    private _name: string;
    private _size: number;

    constructor(name: string, size: number) {
        this._name = name;
        this._size = size;
    }


    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get size(): number {
        return this._size;
    }

    set size(value: number) {
        this._size = value;
    }

    toString() {
        return `FileVaultDto { name: ${this._name}, size: ${this._size} }`;
    }
}