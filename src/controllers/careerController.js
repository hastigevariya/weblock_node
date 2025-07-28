import { careerValidation, idValidation } from "../models/careerModel.js";
import response from "../utils/response.js";
import { resStatusCode, resMessage } from "../utils/constants.js";
import { careerService } from "../services/careerService.js";

export const addCareer = async (req, res) => {
    try {
        const { error } = careerValidation.validate(req.body);
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
        };
        const newCareer = await careerService.addCareer(req.body);
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.DATA_ADDED, newCareer);
    } catch (error) {
        console.error("Error in addCareer:", error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const getAllCareer = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const isPaginated = page && limit;
        const sort = { createdAt: -1 };
        const query = isPaginated ? { isActive: true } : { isActive: true };

        let careerData = [];
        let totalRecords = 0;
        let totalPages = 0;
        if (isPaginated) {
            const pageNum = parseInt(page);
            const limitNum = parseInt(limit);
            const skip = (pageNum - 1) * limitNum;
            [careerData, totalRecords] = await Promise.all([
                careerService.getAllCareer(query, sort, skip, limitNum),
                careerService.careerCount(query),
            ]);
            totalPages = Math.ceil(totalRecords / limitNum);
        } else {
            careerData = await careerService.getAllCareer(query, sort);
        };
        const responseData = isPaginated
            ? {
                page: parseInt(page),
                limit: parseInt(limit),
                totalRecords,
                totalPages,
                records: careerData,
            } : careerData;
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.FETCHED, responseData);
    } catch (err) {
        console.error("Error in getAllCareer:", err);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const getCareerById = async (req, res) => {
    const { id } = req.params;
    const { error } = idValidation.validate({ id });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        const career = await careerService.getCareerById( id );
        if (!career) {
            return response.error(res, resStatusCode.FORBIDDEN, resMessage.CAREER_NOT_FOUND, {});
        };
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.FETCHED, career);
    } catch (error) {
        console.error("Error in getCareerById:", error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const updateCareerById = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = idValidation.validate({ id });
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
        };
        const updatedCareer = await careerService.updateCareerById(id, req.body);
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.UPDATED, updatedCareer);
    } catch (err) {
        console.error("Error in updateCareer:", err);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    }
};

export const deleteCareer = async (req, res) => {
    const { id } = req.params;
    const { error } = idValidation.validate({ id });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        await careerService.deleteCareer( id );
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.CAREER_DEACTIVATED, {});
    } catch (err) {
        console.error("Error in deleteCareer:", err);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

