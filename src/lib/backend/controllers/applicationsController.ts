import dbConnect from "@/lib/backend/database/database";
import { ApplicationsService } from "@/lib/backend/services/applicationsService";

export const ApplicationsController = {
    async apply(formData: FormData) {
        try {
            await dbConnect();

            const title = formData.get('title') as string;
            const description = formData.get('description') as string;
            const location = formData.get('location') as string;
            const type = formData.get('type') as string;
            const company = formData.get('company') as string;
            const status = formData.get('status') as 'pending' | 'accepted' | 'rejected';
            const createdBy = formData.get('createdBy') as string;
            const user = formData.get('user') as string;
            const cv = formData.get('cv') as File;

            if (!title || !description || !location || !type || !company || !status || !createdBy || !user || !cv) {
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
};

