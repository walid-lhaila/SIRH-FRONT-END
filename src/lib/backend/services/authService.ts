import * as bcrypt from 'bcryptjs';
import UsersSchema from "@/lib/backend/models/usersSchema";

interface UserData {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
}

export const AuthService = {
    async register(userData: UserData) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const createUser = await UsersSchema.create({
            ...userData,
            password: hashedPassword
        });
        return createUser;
    },

};

