import { NextRequest } from 'next/server';
import { AuthController } from "@/lib/backend/controllers/authController";

export async function POST(request: NextRequest | { json: () => Promise<any> }) {
    const body = request.json ? await request.json() : request.body;

    const req = { body };
    let statusCode = 200;
    let responseBody = {};

    const res = {
        status: (code: number) => {
            statusCode = code;
            return res;
        },
        json: (data: any) => {
            responseBody = data;
        },
    };

    await AuthController.register(req as any, res as any);

    return {
        status: statusCode,
        body: JSON.stringify(responseBody),
    };
}
