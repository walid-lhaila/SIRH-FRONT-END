import request from 'supertest';
import express from 'express';
import { POST } from '@/app/api/apply/route';
import { ApplicationsController } from '@/lib/backend/controllers/applicationsController';
import { NextRequest, NextResponse } from 'next/server';

jest.mock('@/lib/backend/controllers/applicationsController', () => ({
    ApplicationsController: {
        apply: jest.fn(),
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

describe('Application API - Apply (Supertest)', () => {
    const app = express();

    app.use(express.json());
    app.post('/api/apply', async (req, res) => {
        const mockNextRequest = {
            headers: new Map(Object.entries(req.headers)),
            formData: jest.fn().mockResolvedValue(req.body),
        } as unknown as NextRequest;

        const result = await POST(mockNextRequest);
        res.status(result.status).json(await result.json());
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should successfully submit an application', async () => {
        const mockResponse = {
            status: 201,
            data: {
                success: true,
                message: 'Application Created Successfully',
                data: { title: 'Software Engineer' },
            },
        };

        (ApplicationsController.apply as jest.Mock).mockResolvedValue(mockResponse);

        const response = await request(app)
            .post('/api/apply')
            .set('Authorization', 'Bearer mock-token')
            .send({
                title: 'Software Engineer',
                description: 'Build amazing software',
                location: 'Remote',
                type: 'Full-Time',
                company: 'Tech Inc.',
                createdBy: 'user123',
                status: 'pending',
            });

        expect(response.status).toBe(201);
        expect(response.body).toEqual(mockResponse.data);
        expect(ApplicationsController.apply).toHaveBeenCalled();
    });

    it('should fail when missing required fields', async () => {
        const mockResponse = {
            status: 400,
            data: {
                success: false,
                message: 'All Fields Are Required',
            },
        };

        (ApplicationsController.apply as jest.Mock).mockResolvedValue(mockResponse);

        const response = await request(app)
            .post('/api/apply')
            .set('Authorization', 'Bearer mock-token')
            .send({});

        expect(response.status).toBe(400);
        expect(response.body).toEqual(mockResponse.data);
        expect(ApplicationsController.apply).toHaveBeenCalled();
    });

    it('should fail when no authorization token is provided', async () => {
        const response = await request(app).post('/api/apply');

        expect(response.status).toBe(401);
        expect(response.body).toEqual({
            success: false,
            message: 'Authorization token is required',
        });
    });
});

