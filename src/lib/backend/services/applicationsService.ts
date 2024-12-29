import ApplicationsSchema from "@/lib/backend/models/applicationsSchema";


interface ApplicationData {
    title: string;
    description: string;
    location: string;
    type: string;
    company: string;
    status: 'pending' | 'accepted' | 'rejected';
    createdBy: string;
    cv: string;
    user: string;
}

export const ApplicationsService = {
    async apply(applicationData: ApplicationData) {
        const createApplication = await ApplicationsSchema.create(applicationData);
        return createApplication;
    }
}