import { Portfolio } from "../models/portfolioMode.js";

export const portfolioService = {
    async addPortfolio(data) {
        return await Portfolio.create(data);
    },

    async getPortfolioById(id) {
        return await Portfolio.findOne({ _id: id, isActive: true });
    },

    async deletePortfolio(id) {
        return await Portfolio.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: true }
        );
    }

};
