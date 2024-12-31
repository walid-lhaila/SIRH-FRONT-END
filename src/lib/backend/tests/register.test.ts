import request from "supertest";
import express from "express";
import { POST } from "@/app/api/auth/register/route";
import { AuthController } from "@/lib/backend/controllers/authController";

jest.mock('@/lib/backend/controllers/authController', () => ({
    AuthController: {
        register: jest.fn(),
    },
}));

describe('Register API - register (Supertest)', () => {
    const app = express();

    app.use(express.json());
    app.post('/api/auth/register', async (req, res) => {
        const result = await POST({ json: () => Promise.resolve(req.body) });
        res.status(result.status).json(JSON.parse(result.body));
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should successfully submit an application', async () => {
        const mockResponse = {
            success: true,
            message: 'User registered successfully',
            data: { firstName: 'User' },
        };

        (AuthController.register as jest.Mock).mockImplementation((req, res) => {
            res.status(201).json(mockResponse);
        });

        const response = await request(app)
            .post('/api/auth/register')
            .send({
                firstName: "User",
                lastName: "User",
                username: "User-user",
                email: "user@example.com",
                password: "user123",
            });

        expect(response.status).toBe(201);
        expect(response.body).toEqual(mockResponse);
        expect(AuthController.register).toHaveBeenCalled();
    });

    it('should fail when missing required fields', async () => {
        const mockResponse = {
            success: false,
            message: 'All fields are required',
        };

        (AuthController.register as jest.Mock).mockImplementation((req, res) => {
            res.status(400).json(mockResponse);
        });

        const response = await request(app)
            .post('/api/auth/register')
            .send({});

        expect(response.status).toBe(400);
        expect(response.body).toEqual(mockResponse);
        expect(AuthController.register).toHaveBeenCalled();
    });
});
