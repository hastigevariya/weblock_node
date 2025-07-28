import { portfolioModel } from "../models/portfolioModel.js";

export const portfolioService = {
    async addPortfolio(data) {
        return await portfolioModel.create(data);
    },
    getAllPortfolio: async (data, sort, skip, limitNum) => {
        return await portfolioModel.find(data).sort(sort).skip(skip).limit(limitNum).lean();
    },
    PortfolioCount: async (data) => {
        return await portfolioModel.countDocuments(data)
    },

    async getPortfolioById(id) {
        return await portfolioModel.findOne({ _id: id, isActive: true });
    },
    
    updatePortfolioById: async (id, data) => {
        return await portfolioModel.findByIdAndUpdate(
            { _id: id },
            { ...data },
            { new: false }
        );
    },

    async deletePortfolio(id) {
        return await portfolioModel.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: true }
        );
    }

};
