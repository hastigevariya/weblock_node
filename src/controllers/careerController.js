import { careerValidation, idValidation } from "../models/careerModel.js";
import response from "../utils/response.js";
import { resStatusCode, resMessage } from "../utils/constants.js";
import { careerService } from "../services/careerService.js";

export const addCareer = async (req, res) => {
    try {
        const { error } = careerValidation.validate(req.body);
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
        }

        const newCareer = await careerService.addCareer(req.body);
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.DATA_ADDED, newCareer);
    } catch (error) {
        console.error("Error in addCareer:", error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    }
};
export const getAllCareer = async (req, res) => {
    try {
        const data = await careerService.getAllCareer();
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.FETCHED, data);
    } catch (err) {
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    }
};
export const getCareerById = async (req, res) => {
    try {
        const { error } = idValidation.validate(req.params);
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
        }

        const career = await careerService.getCareerById(req.params.id);
        if (!career) {
            return response.error(res, resStatusCode.NOT_FOUND, "Career entry not found", {});
        }

        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.FETCHED, career);
    } catch (error) {
        console.error("Error in getCareerById:", error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    }
};


export const deleteCareer = async (req, res) => {
    try {
        const deleted = await careerService.deleteCareer(req.params.id);
        if (!deleted) {
            return response.error(res, resStatusCode.NOT_FOUND, "Career not found", {});
        }
        return response.success(res, resStatusCode.ACTION_COMPLETE, "Career deactivated successfully", {});
    } catch (err) {
        console.error("Error in deleteCareer:", err);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    }
};

