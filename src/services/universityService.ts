import { University } from "@/interfaces/University";
import { UniversityRepository } from "@/repositories/JoinUsRepository";

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
}