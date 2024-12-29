import { NextRequest, NextResponse } from "next/server";
import { ApplicationsController } from "@/lib/backend/controllers/applicationsController";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const response = await ApplicationsController.apply(formData);
        return NextResponse.json(response.data, { status: response.status });
    } catch (error) {
        console.error('Application Failed:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}

