import request from "supertest";
import express from "express";
import { POST } from "@/app/api/auth/login/route";
import * as AuthController from "@/lib/backend/controllers/authController";

jest.mock("@/lib/backend/controllers/authController", () => ({
    AuthController: {
        login: jest.fn(),
    },
}));

jest.mock("next/server", () => ({
    NextRequest: jest.fn().mockImplementation((obj) => ({
        json: () => Promise.resolve(obj.body),
    })),
    NextResponse: {
        json: jest.fn().mockImplementation((body, init) => ({
            status: init?.status || 200,
            json: async () => body,
        })),
    },
}));

describe("Login API - POST Handler", () => {
    const app = express();

    beforeAll(() => {
        app.use(express.json());
        app.post("/api/auth/login", async (req, res) => {
            const result = await POST({ body: req.body });
            res.status(result.status).json(await result.json());
        });
    });

    it("should successfully log in a user", async () => {
        const mockResponse = {
            success: true,
            message: "Login Successfully",
            data: {
                user: { id: "1", username: "testuser" },
                token: "mock-token",
            },
        };

        (AuthController.AuthController.login as jest.Mock).mockImplementation(async (req, res) => {
            res.status(200).json(mockResponse);
        });

        const response = await request(app)
            .post("/api/auth/login")
            .send({ username: "testuser", password: "password123" });

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockResponse);
    });

    it("should return 400 for missing fields", async () => {
        const mockResponse = {
            success: false,
            message: "Username and password are required",
        };

        (AuthController.AuthController.login as jest.Mock).mockImplementation(async (req, res) => {
            res.status(400).json(mockResponse);
        });

        const response = await request(app).post("/api/auth/login").send({});

        expect(response.status).toBe(400);
        expect(response.body).toEqual(mockResponse);
    });

    it("should return 401 for invalid credentials", async () => {
        const mockResponse = {
            success: false,
            message: "Invalid credentials",
        };

        (AuthController.AuthController.login as jest.Mock).mockImplementation(async (req, res) => {
            res.status(401).json(mockResponse);
        });

        const response = await request(app)
            .post("/api/auth/login")
            .send({ username: "wronguser", password: "wrongpassword" });

        expect(response.status).toBe(401);
        expect(response.body).toEqual(mockResponse);
    });
});
