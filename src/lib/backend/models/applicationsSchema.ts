import mongoose, { Schema, Document } from 'mongoose';

interface IApplication extends Document {
    title: string;
    description: string;
    location: string;
    type: string;
    company: string;
    createdBy: string;
    status: 'pending' | 'accepted' | 'rejected';
    user: string;
}

const applicationSchema = new Schema<IApplication>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true },
    company: { type: String, required: true },
    createdBy: { type: String, required: true },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
    },
    user: { type: String, required: true },
}, {
    timestamps: true,
});

export default mongoose.models.Applications || mongoose.model<IApplication>('Applications', applicationSchema);