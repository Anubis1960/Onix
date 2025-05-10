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
exports.PasswordManager1745434463232 = void 0;
class PasswordManager1745434463232 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            CREATE TABLE public."password_manager"
            (
                "password_id" UUID         NOT NULL DEFAULT uuid_generate_v4(),
                "user_id"     UUID         NOT NULL,
                "domain"      VARCHAR(255) NOT NULL,
                "username"    VARCHAR(255) NOT NULL,
                "password"    VARCHAR(255) NOT NULL,
                PRIMARY KEY ("password_id"),
                FOREIGN KEY ("user_id") REFERENCES public."user" ("user_id") ON DELETE CASCADE
            );
        `, undefined);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE IF EXISTS "password_manager"`, undefined);
            yield queryRunner.query(`DROP INDEX IF EXISTS "password_manager_pkey"`, undefined);
        });
    }
}
exports.PasswordManager1745434463232 = PasswordManager1745434463232;
