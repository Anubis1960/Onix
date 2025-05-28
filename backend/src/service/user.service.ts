import {UserRepository} from "../repository/user.repository";
import logger from "../config/logger.config";
import {UserDto} from "../dto/user.dto";
import {hashPassword, comparePassword} from "../utils/crypt.utils";
import {User} from "../entity/user.entity";

/**
 * @class UserService
 * @description UserService handles user-related operations such as fetching, creating, updating, and deleting users.
 * @constructor
 * @method getAllUsers - Retrieves all users.
 * @method getUserById - Retrieves a user by their ID.
 * @method createUser - Creates a new user.
 * @method updateUser - Updates an existing user.
 * @method deleteUser - Deletes a user.
 * @method findByEmail - Finds a user by their email.
 * @method findByEmailAndPassword - Finds a user by their email and password.
 */
export class UserService {
    async getAllUsers() {
        let users = await UserRepository.findAll();
        if (!users) {
            logger.info("No users found");
            return [];
        }
        return users.map(user => {
            return new UserDto(user.id);
        });
    }

    async getUserById(id: string) {
        const user = await UserRepository.findById(id);
        if (!user) {
            logger.info("User not found for ID:", id)
            return null
        }
        logger.info(user.toString());
        return new UserDto(
            user.id
        );
    }

    async createUser(userData: any) {
        const {email, password} = userData;
        console.log("Creating user with email:", email);
        const existingUser = await UserRepository.findByEmail(email);
        if (existingUser) {
            return {status: 409, message: "User already exists"};
        }
        let hash: string = hashPassword(password);
        const newUser = await UserRepository.createUser(email, hash);
        return new UserDto(
            newUser.id
        );
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
        );
    }

    async deleteUser(id: string) {
        const user = await UserRepository.findById(id);
        if (!user) {
            return {status: 404, message: "User not found"};
        }
        await UserRepository.deleteUser(id);
        return new UserDto(
            user.id
        );
    }

    async findByEmail(id: string) {
        const user = await UserRepository.findByEmail(id);
        if (!user) {
            return null
        }
        return new UserDto(
            user.id
        );
    }

    async findByEmailAndPassword(email: string, password: string) {
        const user = await UserRepository.findByEmail(email);
        if (!user) {
            return null
        }
        console.log("User found:", user.toString());
        console.log("Password to compare:", password);
        if (!comparePassword(password, user.password)) {
            return null
        }
        return new UserDto(
            user.id
        );
    }
}