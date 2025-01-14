import { Club } from "@/interfaces/Club";
import { University } from "@/interfaces/University";
import { UniversityRepository } from "@/repositories/universityRepository";

export class UniversityService {
    private repository: UniversityRepository;

    constructor() {
        this.repository = new UniversityRepository();
    }

    async createUniversity(data: University): Promise<University> {
        return await this.repository.createUniversity(data);
    }

    async fetchUniversity(id: number): Promise<University> {
        return await this.repository.getUniversityById(id);
    }
    async fetchAllUniversities(): Promise<University[]> {
        return await this.repository.getAllUniversities();
    }
    async fetchAllClubsByUniversity(universityId: number): Promise<Club[]> {
        return await this.repository.getAllClubsByUniversity(universityId);
    }
    async updateUniversityStatus(id: number, status: string, observation?: string): Promise<Record<string, any>> {
        return await this.repository.updateUniversityStatus(id, status, observation);
    }

}