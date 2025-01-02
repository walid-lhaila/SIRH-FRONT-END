import { NextRequest, NextResponse } from "next/server";
import { AuthController } from "@/lib/backend/controllers/authController";
import { NextApiRequest, NextApiResponse } from "next";

interface LoginRequestBody {
    username: string;
    password: string;
}

interface ResponseBody {
    success: boolean;
    message: string;
    data?: {
        user: {
            id: string;
            username: string;
        };
        token: string;
    };
}

export async function POST(request: NextRequest) {
    try {
        const body: LoginRequestBody = await request.json();

        const mockReq: Partial<NextApiRequest> = {
            body,
            method: 'POST',
            headers: Object.fromEntries(request.headers),
        };

        let statusCode = 200;
        let responseBody: ResponseBody = { success: true, message: "Request processed successfully" };

        const res: Partial<NextApiResponse> = {
            status: (code: number) => {
                statusCode = code;
                return res as NextApiResponse;
            },
            json: (data: ResponseBody) => {
                responseBody = data;
            },
        };

        await AuthController.login(mockReq as NextApiRequest, res as NextApiResponse);

        return NextResponse.json(responseBody, {
            status: statusCode,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error instanceof Error ? error.message : "Internal server error" },
            { status: 500 }
        );
    }
}

