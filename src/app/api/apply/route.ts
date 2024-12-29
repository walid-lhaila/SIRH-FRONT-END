import {NextRequest, NextResponse} from "next/server";
import {ApplicationsController} from "@/lib/backend/controllers/applicationsController";


export async function POST(request: NextRequest) {
    const body = await request.json();

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
            return NextResponse.json(data, { status: statusCode });
        }
    };

    await ApplicationsController.apply(req as any, res as any);

    return new NextResponse(JSON.stringify(responseBody), {
        status: statusCode,
        headers: { 'Content-Type': 'application/json' }
    });
}