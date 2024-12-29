import ApplicationsSchema from "@/lib/backend/models/applicationsSchema";
import minioClient from "../../../../minio/minio";


interface ApplicationData {
    title: string;
    description: string;
    location: string;
    type: string;
    company: string;
    status: 'pending' | 'accepted' | 'rejected';
    createdBy: string;
    cv: Buffer;
    user: string;
}

export const ApplicationsService = {
    async apply(applicationData: ApplicationData) {
        const { cv, ...otherData } = applicationData;

        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.pdf`;
        const bucketName = process.env.MINIO_BUCKET_NAME || 'cvs';

        await minioClient.putObject(bucketName, fileName, cv);

        const createApplication = await ApplicationsSchema.create({
            ...otherData,
            cv: `${bucketName}/${fileName}`
        });
        return createApplication;
    }
}