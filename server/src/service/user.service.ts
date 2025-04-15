import {UserRepository} from "../repository/user.repository";
import logger from "../config/logger.config";
import {UserDAO} from "../dao/UserDAO";
import {hashPassword, decryptPassword} from "../utils/crypt";

type HashData = {
    salt: string;
    hash: string;
}

export class UserService {
    async getAllUsers() {
        let users = await UserRepository.findAll();
        if (!users) {
            logger.info("No users found");
            return [];
        }

        let userDAOs = users.map(user => {
            const userDAO = new UserDAO();
            userDAO.id = user.id;
            userDAO.email = user.email;
            return userDAO;
        });
        logger.info(userDAOs.toString());
        return userDAOs;
    }

    async getUserById(id: number) {
        const user = await UserRepository.findById(id);
        if (!user) {
            logger.info("User not found for ID:", id)
            return {status: 404, message: "User not found"};
        }
        logger.info(user.toString());
        const userDAO = new UserDAO();
        userDAO.id = user.id;
        userDAO.email = user.email;
        return userDAO;
    }

    async createUser(userData: any) {
        const {email, password} = userData;
        const existingUser = await UserRepository.findByEmail(email);
        if (existingUser) {
            return {status: 409, message: "User already exists"};
        }
        let hashed: HashData = hashPassword(password);
        const newUser = await UserRepository.createUser(email, hashed.hash, hashed.salt);
        const userDAO = new UserDAO();
        userDAO.id = newUser.id;
        userDAO.email = newUser.email;
        logger.info(userDAO.toString());
        return userDAO;

    }

    async updateUser(id: number, updatedData: any) {
        const user = await UserRepository.findById(id);
        if (!user) {
            return {status: 404, message: "User not found"};
        }
        let partialUser = {
            email: user.email,
            password: user.password,
            salt: user.salt
        }

        if (updatedData.email) {
            partialUser["email"] = updatedData.email;
        }

        if (updatedData.password) {
            let hashed: HashData = hashPassword(updatedData.password);
            partialUser["password"] = hashed.hash;
            partialUser["salt"] = hashed.salt;
        }

        await UserRepository.updateUser(id, partialUser);
        const userDAO = new UserDAO();

        userDAO.id = user.id;
        userDAO.email = user.email;
        logger.info(userDAO.toString());

        return userDAO;
    }

    async deleteUser(id: number) {
        const user = await UserRepository.findById(id);
        if (!user) {
            return {status: 404, message: "User not found"};
        }
        await UserRepository.deleteUser(id);
        const userDAO = new UserDAO();
        userDAO.id = user.id
        userDAO.email = user.email;

        logger.info(userDAO.toString());

        return userDAO;
    }
}