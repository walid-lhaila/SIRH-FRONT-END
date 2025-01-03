import dbConnect from "@/lib/backend/database/database";
import { ApplicationsService } from "@/lib/backend/services/applicationsService";
import jwt from 'jsonwebtoken';

interface DecodedToken {
    userId: string;
}

export const ApplicationsController = {
    async apply(formData: FormData, token: string) {
        try {
            await dbConnect();

            const secretKey = process.env.JWT_SECRET;

            // Check if secretKey is defined
            if (!secretKey) {
                throw new Error('JWT_SECRET is not defined');
            }

            const decoded = jwt.verify(token, secretKey);

            // Type guard to check if decoded is of type DecodedToken
            if (typeof decoded === 'object' && decoded !== null && 'userId' in decoded) {
                const userId = (decoded as DecodedToken).userId;

                const title = formData.get('title') as string;
                const description = formData.get('description') as string;
                const location = formData.get('location') as string;
                const type = formData.get('type') as string;
                const company = formData.get('company') as string;
                const status = formData.get('status') as 'pending' | 'accepted' | 'rejected';
                const createdBy = formData.get('createdBy') as string;
                const cv = formData.get('cv') as File;

                if (!title || !description || !location || !type || !company || !status || !createdBy || !cv) {
                    return {
                        status: 400,
                        data: {
                            success: false,
                            message: 'All Fields Are Required',
                        },
                    };
                }

                const cvBuffer = await cv.arrayBuffer();

                const createApply = await ApplicationsService.apply({ title, company, createdBy, cv: Buffer.from(cvBuffer), description, location, status, type, user: userId });

                return {
                    status: 201,
                    data: {
                        success: true,
                        message: 'Application Created Successfully',
                        data: createApply,
                    },
                };
            } else {
                return {
                    status: 401,
                    data: {
                        success: false,
                        message: 'Invalid Token',
                    },
                };
            }
        } catch (error) {
            console.error('Application Failed:', error);
            return {
                status: 500,
                data: {
                    success: false,
                    message: 'Internal Server Error',
                },
            };
        }
    },

    async getApplicationByUserId(token: string) {
        try {
            await dbConnect();
            const secretKey = process.env.JWT_SECRET;

            // Check if secretKey is defined
            if (!secretKey) {
                throw new Error('JWT_SECRET is not defined');
            }

            const decoded = jwt.verify(token, secretKey);

            // Type guard to check if decoded is of type DecodedToken
            if (typeof decoded === 'object' && decoded !== null && 'userId' in decoded) {
                const userId = (decoded as DecodedToken).userId;

                const applications = await ApplicationsService.getApplicationByUserId(userId);
                return {
                    status: 200,
                    data: {
                        success: true,
                        message: 'Application Retrieved Successfully',
                        data: applications,
                    },
                };
            } else {
                return {
                    status: 401,
                    data: {
                        success: false,
                        message: 'Invalid Token',
                    },
                };
            }
        } catch (error) {
            console.error('Failed To Retrieve Applications:', error);
            return {
                status: 500,
                data: {
                    success: false,
                    message: 'Internal Server Error',
                },
            };
        }
    }
};