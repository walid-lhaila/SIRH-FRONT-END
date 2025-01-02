import { NextRequest, NextResponse } from "next/server";
import { POST } from "@/app/api/auth/login/route";
import { AuthController } from "@/lib/backend/controllers/authController";
import { NextApiRequest, NextApiResponse } from "next";

jest.mock("@/lib/backend/controllers/authController", () => ({
    AuthController: {
        login: jest.fn(),
    },
}));

jest.mock("next/server", () => ({
    NextRequest: jest.fn(),
    NextResponse: {
        json: jest.fn().mockImplementation((body, init) => ({
            status: init?.status || 200,
            json: async () => body,
        })),
    },
}));

describe("Login API - POST Handler", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should successfully log in a user", async () => {
        const mockRequest = {
            json: jest.fn().mockResolvedValue({ username: "testuser", password: "password123" }),
            headers: new Headers(),
        } as unknown as NextRequest;

        const mockResponse = {
            success: true,
            message: "Login Successfully",
            data: {
                user: { id: "1", username: "testuser" },
                token: "mock-token",
            },
        };

        (AuthController.login as jest.Mock).mockImplementation((req: NextApiRequest, res: NextApiResponse) => {
            res.status(200).json(mockResponse);
        });

        const response = await POST(mockRequest);
        const responseBody = await response.json();

        expect(response.status).toBe(200);
        expect(responseBody).toEqual(mockResponse);
    });

    it("should return 400 for missing fields", async () => {
        const mockRequest = {
            json: jest.fn().mockResolvedValue({}),
            headers: new Headers(),
        } as unknown as NextRequest;

        const mockResponse = {
            success: false,
            message: "username and password are required",
        };

        (AuthController.login as jest.Mock).mockImplementation((req: NextApiRequest, res: NextApiResponse) => {
            res.status(400).json(mockResponse);
        });

        const response = await POST(mockRequest);
        const responseBody = await response.json();

        expect(response.status).toBe(400);
        expect(responseBody).toEqual(mockResponse);
    });

    it("should return 500 for internal server error", async () => {
        const mockRequest = {
            json: jest.fn().mockResolvedValue({ username: "testuser", password: "password123" }),
            headers: new Headers(),
        } as unknown as NextRequest;

        (AuthController.login as jest.Mock).mockImplementation(() => {
            throw new Error("Internal Server Error");
        });

        const response = await POST(mockRequest);
        const responseBody = await response.json();

        expect(response.status).toBe(500);
        expect(responseBody).toEqual({
            success: false,
            message: "Internal Server Error",
        });
    });
});

