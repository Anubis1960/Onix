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
exports.Folder1744737995859 = void 0;
class Folder1744737995859 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            CREATE TABLE IF NOT EXISTS public."folder"
            (
                "folder_id"   UUID         NOT NULL DEFAULT uuid_generate_v4(),
                "user_id"     UUID         NOT NULL,
                "folder_name" VARCHAR(255) NOT NULL,
                "parent_id"   UUID,

                PRIMARY KEY ("folder_id"),
                FOREIGN KEY ("user_id") REFERENCES public."user" ("user_id") ON DELETE CASCADE,
                FOREIGN KEY ("parent_id") REFERENCES public."folder" ("folder_id") ON DELETE CASCADE
            );
        `, undefined);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE IF EXISTS folder`, undefined);
            yield queryRunner.query(`DROP INDEX IF EXISTS folder_pkey`, undefined);
            yield queryRunner.query(`DROP INDEX IF EXISTS folder_user_id_fkey`, undefined);
            yield queryRunner.query(`DROP INDEX IF EXISTS folder_parent_id_fkey`, undefined);
        });
    }
}
exports.Folder1744737995859 = Folder1744737995859;
