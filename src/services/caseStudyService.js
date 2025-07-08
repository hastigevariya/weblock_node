import { CaseStudy } from "../models/caseStudyMode.js";

export const caseStudyService = {
    async addCaseStudy(data) {
        return await CaseStudy.create(data);
    },
    async getAllCaseStudy() {
        return await CaseStudy.find({ isActive: true }).sort({ createdAt: -1 });
    },
    async getCaseStudyById(id) {
        return await CaseStudy.findById(id);
    },
    async softDeleteCaseStudy(id) {
        return await CaseStudy.findByIdAndUpdate(id, { isActive: false }, { new: true });
    }
};