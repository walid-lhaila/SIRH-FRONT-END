import { config } from 'dotenv';
import mongoose, { Connection } from 'mongoose';

config();

const MONGODB_URI: string | undefined = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

async function dbConnect(): Promise<Connection> {
    console.log('Connecting to MongoDB...');
    try {
        await mongoose.connect(MONGODB_URI as string);
        console.log('Connected to MongoDB successfully!');
        return mongoose.connection;
    } catch (error) {
        console.error('Error connecting to MongoDB:', (error as Error).message);
        process.exit(1);
    }
}

export default dbConnect;

