import express from "express";
import { NextRequest } from "next/server";
import { GET } from "@/app/api/application/route";
import request from "supertest";
import { ApplicationsController } from "@/lib/backend/controllers/applicationsController";

jest.mock('@/lib/backend/controllers/applicationsController', () => ({
    ApplicationsController: {
        getApplicationByUserId: jest.fn(),
    },
}));

jest.mock('next/server', () => ({
    NextRequest: jest.fn(),
    NextResponse: {
        json: jest.fn().mockImplementation((body, init) => ({
            status: init?.status || 200,
            json: () => Promise.resolve(body),
        })),
    },
}));

describe('Application API - Get All Applications (Supertest)', () => {
    const app = express();

    app.use(express.json());
    app.get('/api/application', async (req, res) => {
        const mockNextRequest = {
            headers: {
                get: (name: string) => req.headers[name.toLowerCase()] || null,
            },
        } as unknown as NextRequest;

        const result = await GET(mockNextRequest);
        res.status(result.status).json(await result.json());
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should successfully retrieve all applications for a user', async () => {
        const mockApplications = [
            { id: '1', title: 'Software Engineer', company: 'Tech Inc' },
            { id: '2', title: 'Data Scientist', company: 'Data Corp' },
        ];

        const mockResponse = {
            status: 200,
            data: {
                success: true,
                message: 'Applications Retrieved Successfully',
                data: mockApplications,
            },
        };

        (ApplicationsController.getApplicationByUserId as jest.Mock).mockResolvedValue(mockResponse);

        const response = await request(app)
            .get('/api/application')
            .set('Authorization', 'Bearer mock-token'); // Ensure this matches the header expected

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockResponse.data);
        expect(ApplicationsController.getApplicationByUserId).toHaveBeenCalledWith('mock-token');
    });

    it('should fail when no authorization token is provided', async () => {
        const response = await request(app).get('/api/application');

        expect(response.status).toBe(401);
        expect(response.body).toEqual({
            success: false,
            message: 'No Token Provided',
        });
    });

    it('should handle internal server error', async () => {
        (ApplicationsController.getApplicationByUserId as jest.Mock).mockRejectedValue(new Error('Database error'));

        const response = await request(app)
            .get('/api/application')
            .set('Authorization', 'Bearer mock-token');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            success: false,
            message: 'Internal Server Error',
        });
    });
});

