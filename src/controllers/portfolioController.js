import { portfolioValidation } from "../models/portfolioMode.js";
import response from "../utils/response.js";
import { resStatusCode, resMessage } from "../utils/constants.js";
import { portfolioService } from "../services/portfolioService.js";

export const addPortfolio = async (req, res) => {
    try {
        const image = req?.files?.image?.[0]?.filename;
        const mainImage = req?.files?.mainImage?.[0]?.filename;
        req.body.image = image;
        req.body.mainImage = mainImage;
        if (typeof req.body.features === "string") {
            try {
                req.body.features = JSON.parse(req.body.features);
            } catch (err) {
                return response.error(res, resStatusCode.CLIENT_ERROR, `"features" must be a valid JSON array`, {});
            }
        }
        const { error } = portfolioValidation.validate(req.body);
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
        }

        const newPortfolio = await portfolioService.addPortfolio(req.body);
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.ADD_PORTFOLIO_SUCCESS, newPortfolio);
    } catch (err) {
        console.error("Error in addPortfolio:", err);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    }
};

export const getAllPortfolio = async (req, res) => {
    try {
        const data = await portfolioService.getAllPortfolio();
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.FETCHED, data);
    } catch (err) {
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    }
};
export const getPortfolioById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await portfolioService.getPortfolioById(id);

        if (!data || data.isActive === false) {
            return response.error(res, resStatusCode.NOT_FOUND, resMessage.NOT_FOUND, {});
        }

        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.FETCHED, data);
    } catch (err) {
        console.error("Error in getPortfolioById:", err);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    }
};

export const deletePortfolio = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await portfolioService.deletePortfolio(id);

        if (!deleted) {
            return response.error(res, resStatusCode.NOT_FOUND, resMessage.NOT_FOUND, {});
        }

        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.DELETED, {});
    } catch (err) {
        console.error("Error in deleteReview:", error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    }
};