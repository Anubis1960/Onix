"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileShared1744738004683 = void 0;
class FileShared1744738004683 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "shared_file"
            (
                "file_id"             UUID         NOT NULL DEFAULT uuid_generate_v4(),
                "file_name"           VARCHAR(100) NOT NULL,
                "file_size"           INT          NOT NULL,
                "file_type"           VARCHAR(255) NOT NULL,
                "storage_path"        VARCHAR(255) NOT NULL,
                "room_id"             UUID         NOT NULL,
                "downloads_remaining" INT2         NOT NULL,
                "time_to_live"        INT2         NOT NULL,
                "created_at"          TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,

                PRIMARY KEY ("file_id")
            );
        `, undefined);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE IF EXISTS "shared_file"`, undefined);
            yield queryRunner.query(`DROP INDEX IF EXISTS "shared_file_pkey"`, undefined);
        });
    }
}
exports.FileShared1744738004683 = FileShared1744738004683;
