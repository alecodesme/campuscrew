import { Club } from "@/interfaces/Club";
import { ClubRepository } from "@/repositories/clubRepository";

export class ClubService {
    private repository: ClubRepository;

    constructor() {
        this.repository = new ClubRepository();
    }

    async createClub(club: Partial<Club>): Promise<Record<string, any>> {
        try {
            const createdClub = await this.repository.createClub(club);
            return {
                data: createdClub,
                status: true
            };
        } catch (error) {
            return {
                data: null,
                status: false
            };
        }
    }

    async editClub(clubId: number, updatedData: Partial<Club>): Promise<Record<string, any>> {
        try {
            const updatedClub = await this.repository.editClub(clubId, updatedData);
            return {
                data: updatedClub,
                status: true
            };
        } catch (error) {
            return {
                data: null,
                status: false
            };
        }
    }

    async deleteClub(clubId: number): Promise<Record<string, any>> {
        try {
            const response = await this.repository.deleteClub(clubId);
            return {
                status: true
            }
        } catch (error) {
            return {
                status: false
            }
        }
    }
}
