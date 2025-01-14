import { BASE_URL } from "@/api/api";
import { Club } from "@/interfaces/Club";
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
            const response = await axios.get<{ universities: University[] }>(`${this.apiUrl}/universities`, {
                headers: { Authorization: `Bearer ${token}` },
            });

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
    async getAllClubsByUniversity(universityId: number): Promise<Club[]> {
        const token = localStorage.getItem('authToken');
        if (!token) {
            throw new Error('No token found');
        }
        try {
            const response = await axios.get<{ clubs: Club[] }>(`${this.apiUrl}/universities/${universityId}/clubs`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data && Array.isArray(response.data.clubs)) {
                return response.data.clubs;
            } else {
                throw new Error('No universities data found in the response');
            }
        } catch (error) {
            console.error("Error fetching universities: ", error);
            throw new Error("Error fetching universities");
        }
    }
    async updateUniversityStatus(id: number, status: string, observation?: string): Promise<University> {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.put(`${this.apiUrl}/universities/${id}/status`, { status, observation }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error(`Error updating university status: ${error}`);
        }
    }
}