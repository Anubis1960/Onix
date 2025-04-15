import dataSource from "../config/datasource.config";
import {User} from "../entity/user.entity";

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

    findById(id: number) {
        return this.createQueryBuilder("user")
            .where("user.id = :id", {id})
            .getOne();
    },

    createUser(email: string, password: string, salt: string) {
        const user = this.create({email, password, salt});
        return this.save(user);
    },

    updateUser(id: number, updatedData: Partial<User>) {
        return this.createQueryBuilder("user")
            .update(User)
            .set(updatedData)
            .where("user_id = :id", {id})
            .execute();
    },

    deleteUser(id: number) {
        return this.createQueryBuilder("user")
            .delete()
            .from(User)
            .where("user_id = :id", {id})
            .execute();
    },
})