import { teamModel } from "../models/teamMode.js";
export class teamService {
    static async addTeam(data) {
        try {
            const newTeam = await teamModel.create(
                data,
            ); return newTeam;
        } catch (error) {
            return error;
        };
    };
    static async updateTeamMember(id, data) {
        try {
            const updated = await teamModel.findByIdAndUpdate(
                id,
                { $set: data },
                { new: true },
            );
            return (updated);
        } catch (error) {
            return (error);
        };
    };
    static async findById(id) {
        try {
            const team = await teamModel.findById(id).lean();
            return team;
        } catch (error) {
            throw error;
        }
    }


    static async getAllTeamMembers({ page, limit }) {
        const isPaginated = page && limit;
        const query = { isActive: true };
        const sort = { createdAt: -1 };

        if (isPaginated) {
            const pageNum = parseInt(page);
            const limitNum = parseInt(limit);
            const skip = (pageNum - 1) * limitNum;

            const [teams, totalRecords] = await Promise.all([
                teamModel.find(query).sort(sort).skip(skip).limit(limitNum).lean(),
                teamModel.countDocuments(query),
            ]);

            return {
                paginated: true,
                page: pageNum,
                limit: limitNum,
                totalRecords,
                totalPages: Math.ceil(totalRecords / limitNum),
                records: teams,
            };
        } else {
            const teams = await teamModel.find(query).sort(sort).lean();
            return {
                paginated: false,
                records: teams,
            };
        }
    }


    static async deleteTeamMember(id) {
        try {
            const deleted = await teamModel.findByIdAndUpdate(
                id,
                { $set: { isActive: false } },
                { new: true }
            );
            return deleted;
        } catch (error) {
            throw error;
        }
    }

}