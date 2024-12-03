import { AuthRepository } from "@/repositories/authRepository";

export class AuthService {
    private repository: AuthRepository;

    constructor() {
        this.repository = new AuthRepository();
    }

    async signIn(email: string, password: string): Promise<Record<string, any>> {
        try {
            const response = await this.repository.login(email, password);
            return {
                success: true,
                data: response,
            };
        } catch (error: any) {
            if (error.response && error.response.status === 422) {
                return {
                    success: false,
                    message: error.response.data.error || "Invalid email or password.",
                };
            } else {
                return {
                    success: false,
                    message: "An unexpected error occurred. Please try again later.",
                };
            }
        }
    }

    async logOut(): Promise<Record<string, any>> {
        const response = await this.repository.logOut()
        return response
    }
}