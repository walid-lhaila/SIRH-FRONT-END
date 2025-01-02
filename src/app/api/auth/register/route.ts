import { NextRequest, NextResponse } from 'next/server';
import { AuthController } from "@/lib/backend/controllers/authController";

interface RegisterRequestBody {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
}

interface ResponseBody {
    success: boolean;
    message: string;
    data?: {
        user: {
            id: string;
            username: string;
            firstName: string;
            lastName: string;
            email: string;
        };
        token: string;
    };
}

interface CustomResponse {
    status: (code: number) => CustomResponse;
    json: (data: ResponseBody) => void;
}

export async function POST(request: NextRequest) {
    try {
        const body: RegisterRequestBody = await request.json();

        let statusCode = 200;
        let responseBody: ResponseBody = { success: true, message: "Request processed successfully" };

        const res: CustomResponse = {
            status: (code: number) => {
                statusCode = code;
                return res;
            },
            json: (data: ResponseBody) => {
                responseBody = data;
            },
        };

        await AuthController.register({ body }, res);

        return NextResponse.json(responseBody, { status: statusCode });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error instanceof Error ? error.message : "Internal server error" },
            { status: 500 }
        );
    }
}
