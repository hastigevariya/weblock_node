import { caseStudyModel } from "../models/caseStudyModel.js";

export const caseStudyService = {
    async addCaseStudy(data) {
        return await caseStudyModel.create(data);
    },
    async getAllCaseStudy(data, sort, skip, limitNum) {
        // return await caseStudyModel.find({ isActive: true }).sort({ createdAt: -1 });
        return await caseStudyModel.find(data).sort(sort).skip(skip).limit(limitNum).lean();
    },
    caseStudyCount: async (data) => {
        return await caseStudyModel.countDocuments(data)
    },
    async getCaseStudyById(id) {
        return await caseStudyModel.findById(id);
    },
    async softDeleteCaseStudy(id) {
        return await caseStudyModel.findByIdAndUpdate(id, { isActive: false }, { new: true });
    },
    async updateCaseStudyById(id, data) {
        return await caseStudyModel.findByIdAndUpdate(
            { _id: id },
            { ...data },
            { new: false }
        );;
    }
};