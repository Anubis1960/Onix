import {UserRepository} from "../repository/user.repository";
import logger from "../config/logger.config";
import {UserDto} from "../dto/user.dto";
import {hashPassword} from "../utils/crypt";
import {User} from "../entity/user.entity";

export class UserService {
    async getAllUsers() {
        let users = await UserRepository.findAll();
        if (!users) {
            logger.info("No users found");
            return [];
        }

        return users.map(user => {
            return new UserDto(user.id, user.email);
        });
    }

    async getUserById(id: string) {
        const user = await UserRepository.findById(id);
        if (!user) {
            logger.info("User not found for ID:", id)
            return {status: 404, message: "User not found"};
        }
        logger.info(user.toString());
        return new UserDto(user.id, user.email);
    }

    async createUser(userData: any) {
        const {email, password} = userData;
        const existingUser = await UserRepository.findByEmail(email);
        if (existingUser) {
            return {status: 409, message: "User already exists"};
        }
        let hash: string = hashPassword(password);
        const newUser = await UserRepository.createUser(email, hash);
        return new UserDto(newUser.id, newUser.email);

    }

    async updateUser(id: string, updatedData: { email?: string; password?: string }) {
        const user = await UserRepository.findById(id);
        if (!user) {
            return {status: 404, message: "User not found"};
        }
        let partialUser: Partial<Partial<User>> = {
            email: updatedData.email,
            password: updatedData.password ? hashPassword(updatedData.password) : undefined
        }

        await UserRepository.updateUser(id, partialUser);
        return new UserDto(
            user.id,
            partialUser.email || user.email
        );
    }

    async deleteUser(id: string) {
        const user = await UserRepository.findById(id);
        if (!user) {
            return {status: 404, message: "User not found"};
        }
        await UserRepository.deleteUser(id);
        return new UserDto(user.id, user.email);
    }
}