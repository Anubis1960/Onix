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
exports.Users1744707094772 = void 0;
class Users1744707094772 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "user"
            (
                "user_id"  UUID         NOT NULL DEFAULT uuid_generate_v4(),
                "email"    VARCHAR(100) NOT NULL,
                "password" VARCHAR(511) NOT NULL,

                UNIQUE ("email"),
                PRIMARY KEY ("user_id")
            );
        `, undefined);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE IF EXISTS "user"`, undefined);
            yield queryRunner.query(`DROP INDEX IF EXISTS "user_email_key"`, undefined);
            yield queryRunner.query(`DROP INDEX IF EXISTS "user_pkey"`, undefined);
        });
    }
}
exports.Users1744707094772 = Users1744707094772;
