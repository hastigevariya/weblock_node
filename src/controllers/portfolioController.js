import { idValidation, portfolioValidation } from "../models/portfolioModel.js";
import response from "../utils/response.js";
import { resStatusCode, resMessage } from "../utils/constants.js";
import { portfolioService } from "../services/portfolioService.js";

export const addPortfolio = async (req, res) => {
    try {
        // const image = req?.files?.image?.[0]?.filename;
        // const mainImage = req?.files?.mainImage?.[0]?.filename;
        // // req.body.image = image;
        // req.body.mainImage = mainImage;
        const image = req.uploadedImages.find(file => file.field === 'image');
        req.body.image = image?.s3Url;
        const mainImage = req.uploadedImages.find(file => file.field === 'mainImage');
        req.body.mainImage = mainImage?.s3Url;
        const homeImage = req.uploadedImages.find(file => file.field === 'homeImage');
        req.body.homeImage = homeImage?.s3Url;
        const logo = req.uploadedImages.find(file => file.field === 'logo');
        req.body.logo = logo?.s3Url;
        const profileImage = req.uploadedImages.find(file => file.field === 'profileImage');
        req.body.profileImage = profileImage?.s3Url;

        if (typeof req.body.features === "string") {
            try {
                req.body.features = JSON.parse(req.body.features);
            } catch (err) {
                return response.error(res, resStatusCode.CLIENT_ERROR, resMessage.INVALID_FEATURES_JSON, {});
            };
        };
        const { error } = portfolioValidation.validate(req.body);
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
        };
        const newPortfolio = await portfolioService.addPortfolio(req.body);
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.ADD_PORTFOLIO_SUCCESS, newPortfolio);
    } catch (err) {
        console.error("Error in addPortfolio:", err);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const getAllPortfolio = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const isPaginated = page && limit;
        const query = { isActive: true };
        const sort = { createdAt: -1 };

        let portfolio = [];
        let totalCount = 0;
        let totalPages = 0;

        if (isPaginated) {
            const pageNum = parseInt(page);
            const limitNum = parseInt(limit);
            const skip = (pageNum - 1) * limitNum;

            [portfolio, totalCount] = await Promise.all([
                portfolioService.getAllPortfolio(query, sort, skip, limitNum),

                portfolioService.PortfolioCount(query),
            ]);
            totalPages = Math.ceil(totalCount / limitNum);

            return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.FETCHED, {
                page: pageNum,
                limit: limitNum,
                totalRecords: totalCount,
                totalPages,
                records: portfolio,
            });
        };
        const result = await portfolioService.getAllPortfolio(query, sort)


        // const data = await portfolioService.getAllPortfolio();
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.FETCHED, result);
    } catch (err) {
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const getPortfolioById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await portfolioService.getPortfolioById(id);
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.FETCHED, data);
    } catch (err) {
        console.error("Error in getPortfolioById:", err);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};


export const updatePortfolioById = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = idValidation.validate({ id });
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
        };
        const imageFile = req.uploadedImages?.find(file => file.field === 'image');
        const mainImageFile = req.uploadedImages?.find(file => file.field === 'mainImage');
        const homeImageFile = req.uploadedImages?.find(file => file.field === 'homeImage');
        const logoFile = req.uploadedImages?.find(file => file.field === 'logo');
        const profileImageFile = req.uploadedImages?.find(file => file.field === 'profileImage');

        const updatedData = {
            ...req.body,
            image: imageFile?.s3Url,
            mainImage: mainImageFile?.s3Url,
            homeImage: homeImageFile?.s3Url,
            logo: logoFile?.s3Url,
            profileImage: profileImageFile?.s3Url,
        };
        const updatedPortfolio = await portfolioService.updatePortfolioById(id, updatedData);
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.UPDATED, updatedPortfolio);
    } catch (err) {
        console.error("Error in updatePortfolio:", err);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    }
};

export const deletePortfolio = async (req, res) => {
    try {
        const { id } = req.params;
        await portfolioService.deletePortfolio({ id });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.DELETED, {});
    } catch (err) {
        console.error("Error in deletePortfolio:", err);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};