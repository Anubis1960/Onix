import {FileVaultDto} from "./file-vault.dto";

export class FileSharedDTO extends FileVaultDto {
    downloadsRemaining: number;
    timeToLive: number;
    createdAt: Date;
}