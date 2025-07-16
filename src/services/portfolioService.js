import { portfolioModel } from "../models/portfolioModel.js";

export const portfolioService = {
    async addPortfolio(data) {
        return await portfolioModel.create(data);
    },

    async getPortfolioById(id) {
        return await portfolioModel.findOne({ _id: id, isActive: true });
    },

    async deletePortfolio(id) {
        return await portfolioModel.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: true }
        );
    }

};
