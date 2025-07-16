import { caseStudyModel } from "../models/caseStudyModel.js";

export const caseStudyService = {
    async addCaseStudy(data) {
        return await caseStudyModel.create(data);
    },
    async getAllCaseStudy() {
        return await caseStudyModel.find({ isActive: true }).sort({ createdAt: -1 });
    },
    async getCaseStudyById(id) {
        return await caseStudyModel.findById(id);
    },
    async softDeleteCaseStudy(id) {
        return await caseStudyModel.findByIdAndUpdate(id, { isActive: false }, { new: true });
    }
};