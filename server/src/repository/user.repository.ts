import dataSource from "../config/datasource.config";
import {User} from "../entity/user.entity";

/**
 * @class UserRepository
 * @description This class provides methods to interact with the User entity in the database.
 * It extends the default repository provided by TypeORM and adds custom methods for user operations.
 * This repository is used to interact with the user table in the database.
 */
export const UserRepository = dataSource.getRepository(User).extend({
    findAll() {
        return this.createQueryBuilder("user")
            .getMany();
    },

    findByEmail(email: string) {
        return this.createQueryBuilder("user")
            .where("user.email = :email", {email})
            .getOne();
    },

    findById(id: string) {
        return this.createQueryBuilder("user")
            .where("user.id = :id", {id})
            .getOne();
    },

    createUser(email: string, password: string) {
        const user = this.create({email, password});
        return this.save(user);
    },

    updateUser(id: string, updatedData: Partial<User>) {
        return this.createQueryBuilder("user")
            .update(User)
            .set(updatedData)
            .where("user_id = :id", {id})
            .execute();
    },

    deleteUser(id: string) {
        return this.createQueryBuilder("user")
            .delete()
            .from(User)
            .where("user_id = :id", {id})
            .execute();
    },
})