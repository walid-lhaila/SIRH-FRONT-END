import { AuthController } from "@/lib/backend/controllers/authController";
import { NextRequest } from 'next/server';

interface RegisterRequestBody {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
}

export async function POST(request: NextRequest) {
    try {
        const body: RegisterRequestBody = await request.json();

        // Pass body directly to the register function
        const result = await AuthController.register({ body });

        return new Response(JSON.stringify(result), {
            status: result.success ? 201 : 400,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Registration error:', error);
        return new Response(JSON.stringify({ success: false, message: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}