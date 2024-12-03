import { BASE_URL } from "@/api/api";
import { User } from "@/interfaces/User";
import axios from "axios";

export class AuthRepository {
    private apiUrl = BASE_URL

    async login(email: string, password: string): Promise<User> {
        const response = await axios.post<User>(`${this.apiUrl}/login`, {
            'email': email,
            'password': password
        });
        return response.data;
    }

    async logOut(): Promise<Record<string, any>> {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No se encontró el token de autenticación.');
            }

            const response = await axios.get(
                `${this.apiUrl}/logout`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Correcto formato para el header
                    },
                }
            );

            return response.data;
        } catch (error: any) {
            console.error('Error en logout:', error.message || error);
            throw new Error('Error al cerrar sesión');
        }
    }
}