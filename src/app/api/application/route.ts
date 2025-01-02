import {NextRequest, NextResponse} from "next/server";
import {ApplicationsController} from "@/lib/backend/controllers/applicationsController";


export async function GET(req: NextRequest) {
    try {
        const authHeader = req.headers.get('authorization');
        const token = authHeader ? authHeader.split(' ')[1] : null;

        if (!token) {
            return NextResponse.json({
                success: false,
                message: 'No Token Provided'
            }, { status: 401 });
        }

        const result = await ApplicationsController.getApplicationByUserId(token);
        return NextResponse.json(result.data, { status: result.status });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
        return NextResponse.json({
            success: false,
            message: errorMessage,
        }, { status: 500 });
    }
}
