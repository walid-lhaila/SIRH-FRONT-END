import { NextRequest, NextResponse } from "next/server";
import { ApplicationsController } from "@/lib/backend/controllers/applicationsController";

export async function POST(request: NextRequest) {
    try {
        const token = request.headers.get('authorization')?.split(' ')[1];

        if (!token) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Authorization token is required',
                },
                { status: 401 }
            );
        }

        const formData = await request.formData();
        const response = await ApplicationsController.apply(formData, token);

        return NextResponse.json(response.data, { status: response.status });
    } catch (error) {
        console.error('Application Failed:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Internal Server Error',
            },
            { status: 500 }
        );
    }
}
