import {NextApiRequest, NextApiResponse} from "next";
import dbConnect from "@/lib/backend/database/database";
import ApplicationsSchema from "@/lib/backend/models/applicationsSchema";
import {ApplicationsService} from "@/lib/backend/services/applicationsService";


export const ApplicationsController = {
    async apply(req: NextApiRequest, res: NextApiResponse) {
        try {
            await dbConnect();
            const { title, description, location, type, company, status, createdBy, cv, user } = req.body;

            if(!title || !description || !location || !type || !company || !status || !createdBy || !cv || !user) {
                return res.status(400).json({
                    success: false,
                    message: 'All Fields Are Required',
                });
            }
            const createApply = await ApplicationsService.apply({ title, company, createdBy, cv, description, location, status, type, user });
            return res.status(201).json({
                success: true,
                message: 'Application Created Successfully',
                data: createApply,
            });
        } catch (error) {
            console.error('Application Failed:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            });
        }
    },
}