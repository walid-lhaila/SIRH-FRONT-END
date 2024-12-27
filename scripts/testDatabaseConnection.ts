import dbConnect from '../src/lib/backend/database/database.js';
import mongoose, { Connection } from 'mongoose';

async function testConnection(): Promise<void> {
    try {
        const connection: Connection = await dbConnect();

        console.log('\nDatabase name:', connection.name);

        if (connection.db) {
            const collections = await connection.db.listCollections().toArray();
            console.log('\nAvailable collections:', collections.map(c => c.name));

            console.log('\nTesting database query capabilities...');
            const testCollection = connection.db.collection('test');
            await testCollection.findOne({});
            console.log('Successfully queried the database');
        } else {
            console.log('Database object is undefined');
        }

        await mongoose.connection.close();
        console.log('\nDatabase connection closed successfully');
    } catch (error) {
        console.error('Test failed:', (error as Error).message);
    } finally {
        process.exit(0);
    }
}

testConnection();

