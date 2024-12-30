import {NextRequest, NextResponse} from "next/server";
import {ApplicationsController} from "@/lib/backend/controllers/applicationsController";


export async function GET(req: NextRequest) {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if(!token) {
        return NextResponse.json({
            success: false,
            message: 'No Token Provider'
        }, {status: 401});
    }
    const result = await ApplicationsController.getApplicationByUserId(token);
    return NextResponse.json(result.data, { status: result.status });
}