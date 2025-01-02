import { AuthService } from "@/lib/backend/services/authService";
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

    async login(req: NextApiRequest, res: NextApiResponse) {
        try {
            await dbConnect();
            const { username, password } = req.body;
            if(!username || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'username and password are required'
                });
            }

            const { user, token } = await AuthService.login(username, password);

            return res.status(200).json({
                success: 'true',
                message: 'Login Successfully',
                data: {
                    user,
                    token,
                }
            });
        } catch (error) {
            console.error('Login Failed:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            });
        }
    },

};

