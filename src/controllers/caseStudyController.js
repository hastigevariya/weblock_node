import { caseStudyValidation } from "../models/caseStudyMode.js";
import { caseStudyService } from "../services/caseStudyService.js";
import response from "../utils/response.js";
import { resStatusCode, resMessage } from "../utils/constants.js";

export const addCaseStudy = async (req, res) => {
    try {
        const files = req.files;
        const {
            title, p1, projectName, projectURL, portfolio, duration, industry, p2,
            challenge, stackTech, process, reviewName,
            reviewPosition, reviewCount, reviewDescription, conclusion
        } = req.body;

        const data = {
            mainImage: files.mainImage[0]?.filename,
            logo: files.logo[0]?.filename,
            image: files.image[0]?.filename,
            typographyImage: files.typographyImage[0]?.filename,
            title, p1, projectName, projectURL, portfolio, duration, industry, p2,
            challenge: JSON.parse(challenge),
            stackTech: JSON.parse(stackTech),
            process: JSON.parse(process),
            reviewName, reviewPosition, reviewCount, reviewDescription,
            conclusion: JSON.parse(conclusion),
        };
        const { error } = caseStudyValidation.validate(data);
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
        };
        const result = await caseStudyService.addCaseStudy(data);
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.ADDED, result);
    } catch (err) {
        console.error("Error in addCaseStudy:", err);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const getAllCaseStudy = async (req, res) => {
    try {
        const result = await caseStudyService.getAllCaseStudy();
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.FETCHED, result);
    } catch (err) {
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const getCaseStudyById = async (req, res) => {
    try {
        const result = await caseStudyService.getCaseStudyById(req.params.id);
        if (!result || !result.isActive) {
            return response.error(res, resStatusCode.NOT_FOUND, "Case study not found", {});
        };
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.FETCHED, result);
    } catch (err) {
        console.error("Error in getCaseStudyById:", err);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const deleteCaseStudy = async (req, res) => {
    try {
        const result = await caseStudyService.softDeleteCaseStudy(req.params.id);
        if (!result) {
            return response.error(res, resStatusCode.NOT_FOUND, "Case study not found", {});
        };
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.DELETED, result);
    } catch (err) {
        console.error("Error in deleteCaseStudy:", err);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};
