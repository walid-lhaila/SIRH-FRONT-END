import { AuthService } from "@/lib/backend/services/authService";
import UsersSchema from "@/lib/backend/models/usersSchema";
import dbConnect from "@/lib/backend/database/database";
import { NextApiRequest, NextApiResponse } from 'next';



export const AuthController = {
    async register(req: NextApiRequest, res: NextApiResponse) {
        try {
            await dbConnect();
            const { firstName, lastName, username, email, password } = req.body;

            if (!firstName || !lastName || !username || !email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'All fields are required',
                });
            }

            const newUser = await AuthService.register({ firstName, lastName, username, email, password });
            return res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: newUser,
            });
        } catch (error) {
            console.error('Registration Failed:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            });
        }
    },

};

