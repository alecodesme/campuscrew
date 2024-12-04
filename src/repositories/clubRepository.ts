import { BASE_URL } from "@/api/api";
import { Club } from "@/interfaces/Club";
import axios from "axios";

export class ClubRepository {
    private apiUrl = `${BASE_URL}/clubs`;

    async createClub(club: Partial<Club>): Promise<Club> {
        const token = localStorage.getItem('authToken');
        try {
            const response = await axios.post<Club>(this.apiUrl, club, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            console.error("Error al crear el club:", error.response?.data || error.message);
            throw error;
        }
    }

    async editClub(clubId: number, updatedData: Partial<Club>): Promise<Club> {

        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.put<Club>(`${this.apiUrl}/${clubId}`, updatedData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            console.error("Error al editar el club:", error.response?.data || error.message);
            throw error;
        }
    }

    async deleteClub(clubId: number): Promise<void> {
        try {
            const token = localStorage.getItem('authToken');
            await axios.delete(`${this.apiUrl}/${clubId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
        } catch (error: any) {
            console.error("Error al eliminar el club:", error.response?.data || error.message);
            throw error;
        }
    }
}
