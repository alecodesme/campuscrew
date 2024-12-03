import { BASE_URL } from "@/api/api";
import { University } from "@/interfaces/University";
import axios from "axios";

export class UniversityRepository {
    private apiUrl = BASE_URL;

    async createUniversity(data: University): Promise<University> {
        const response = await axios.post<University>(`${this.apiUrl}/universities`, data);
        return response.data;
    }

    async getUniversityById(id: number): Promise<University> {
        const response = await axios.get<University>(`${this.apiUrl}/${id}`);
        return response.data;
    }
    async getAllUniversities(): Promise<University[]> {
        const token = localStorage.getItem('authToken');
        if (!token) {
            throw new Error('No token found');
        }

        try {
            // Realizamos la petición GET para obtener todas las universidades
            const response = await axios.get<{ universities: University[] }>(`${this.apiUrl}/universities`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Validamos si la respuesta contiene las universidades
            if (response.data && Array.isArray(response.data.universities)) {
                return response.data.universities;
            } else {
                throw new Error('No universities data found in the response');
            }
        } catch (error) {
            console.error("Error fetching universities: ", error);
            throw new Error("Error fetching universities");
        }
    }
}