import dbConnect from "@/lib/backend/database/database";
import { ApplicationsService } from "@/lib/backend/services/applicationsService";
import jwt from 'jsonwebtoken';

export const ApplicationsController = {
    async apply(formData: FormData, token: string) {
        try {
            await dbConnect();

            const secretKey = process.env.JWT_SECRET;
            const decoded = jwt.verify(token, secretKey) as {userId: string}

            if(!decoded || !decoded.userId){
                return {
                    status: 401,
                    data: {
                        success: false,
                        message: 'Invalid Token',
                    },
                };
            }

            const title = formData.get('title') as string;
            const description = formData.get('description') as string;
            const location = formData.get('location') as string;
            const type = formData.get('type') as string;
            const company = formData.get('company') as string;
            const status = formData.get('status') as 'pending' | 'accepted' | 'rejected';
            const createdBy = formData.get('createdBy') as string;
            const user = decoded.userId;
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

            const createApply = await ApplicationsService.apply({ title,  company,  createdBy,  cv: Buffer.from(cvBuffer),  description,  location,  status,  type,  user });

            return {
                status: 201,
                data: {
                    success: true,
                    message: 'Application Created Successfully',
                    data: createApply,
                },
            };
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

    async getApplicationByUserId (token: string) {
        try {
            await dbConnect();
            const secretKey = process.env.JWT_SECRET;
            const decoded = jwt.verify(token, secretKey) as { userId: string };

            if (!decoded || !decoded.userId){
                return {
                    status: 401,
                    data: {
                        success: false,
                        message: 'Invalid Token',
                    },
                };
            }
            const applications = await ApplicationsService.getApplicationByUserId(decoded.userId);
            return {
                status: 200,
                data: {
                    success: true,
                    message: 'Application Retrieved Successfully',
                    data: applications,
                },
            };
        } catch (error) {
            console.error('Failed To Retrieved Applications:', error);
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

