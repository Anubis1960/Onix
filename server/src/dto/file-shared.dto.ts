import {FileVaultDto} from "./file-vault.dto";

export class FileSharedDTO extends FileVaultDto {
    private _downloadsRemaining: number;
    private _timeToLive: number;
    private _createdAt: Date;

    constructor(name: string, size: number, downloadsRemaining: number, timeToLive: number, createdAt: Date) {
        super(name, size);
        this._downloadsRemaining = downloadsRemaining;
        this._timeToLive = timeToLive;
        this._createdAt = createdAt;
    }


    get downloadsRemaining(): number {
        return this._downloadsRemaining;
    }

    set downloadsRemaining(value: number) {
        this._downloadsRemaining = value;
    }

    get timeToLive(): number {
        return this._timeToLive;
    }

    set timeToLive(value: number) {
        this._timeToLive = value;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    set createdAt(value: Date) {
        this._createdAt = value;
    }

    toString() {
        return `FileSharedDTO { name: ${this.name}, size: ${this.size}, downloadsRemaining: ${this._downloadsRemaining}, timeToLive: ${this._timeToLive}, createdAt: ${this._createdAt} }`;
    }
}