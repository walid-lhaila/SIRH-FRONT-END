import { NextRequest, NextResponse } from "next/server";
import { AuthController } from "@/lib/backend/controllers/authController";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        let statusCode = 200;
        let responseBody = {};

        const res = {
            status: (code: number) => {
                statusCode = code;
                return res;
            },
            json: (data: any) => {
                responseBody = data;
                return data;
            },
        };

        await AuthController.login({ body } as any, res as any);
        return NextResponse.json(responseBody, {
            status: statusCode,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}

