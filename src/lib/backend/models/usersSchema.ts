import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
}

const usersSchema = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

export default mongoose.models.Users || mongoose.model<IUser>('Users', usersSchema);

