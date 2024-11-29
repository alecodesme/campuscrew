import { University } from "@/interfaces/University";
import axios from "axios";

export class UniversityRepository {
    private apiUrl = "http://localhost:8000/api";

    async createUniversity(data: University): Promise<University> {
        const response = await axios.post<University>(`${this.apiUrl}/universities`, data);
        return response.data;
    }

    async getUniversityById(id: number): Promise<University> {
        const response = await axios.get<University>(`${this.apiUrl}/${id}`);
        return response.data;
    }
}