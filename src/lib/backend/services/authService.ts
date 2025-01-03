import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UsersSchema from "@/lib/backend/models/usersSchema";
import * as process from "node:process";

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

    async login(username: string, password: string) {
        const user = await UsersSchema.findOne({ username });
        if(!user) {
            throw new Error('User Not Found')
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            throw new Error('Invalid Credentials');
        }

        const secretKey = process.env.JWT_SECRET;
        if(!secretKey) {
            throw new Error('JWT_SECRET in not defined');
        }
        const token = jwt.sign(
            {userId: user._id, username: user.username},
            secretKey,
            { expiresIn: '1h'}
        );
        return {user, token}
    }

};

