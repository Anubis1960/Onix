export class UserService {
    async getAllUsers() {
        return [];
    }

    async getUserById(id: number) {
        return null;
    }

    async createUser(userData: any) {
        return userData;
    }

    async updateUser(id: number, updatedData: any) {
        return updatedData;
    }

    async deleteUser(id: number) {
        return true;
    }
}