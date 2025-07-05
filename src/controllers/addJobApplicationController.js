import { jobApplicationValidation, idValidation } from "../models/addJobApplicationModel.js";
import response from "../utils/response.js";
import { resStatusCode, resMessage } from "../utils/constants.js";
import { jobApplicationService } from "../services/addJobApplicationService.js";
export const addJobApplication = async (req, res) => {
    try {
        const fileName = req?.file?.filename;
        if (!fileName) {
            return response.error(res, resStatusCode.CLIENT_ERROR, "File is required", {});
        }

        const {
            fName, email, expYear, expMonth,
            currentCTC, expectedCTC, mobile, position
        } = req.body;

        const data = {
            fName,
            email,
            expYear: Number(expYear),
            expMonth: Number(expMonth),
            currentCTC: Number(currentCTC),
            expectedCTC: Number(expectedCTC),
            mobile,
            position,
            file: fName
        };

        const { error } = jobApplicationValidation.validate(data);
        if (error) return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});

        const newApplication = await jobApplicationService.addJobApplication(data);
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.DATA_ADDED, newApplication);
    } catch (error) {
        console.error("Error in addJobApplication:", error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    }
};


export const getAllJobApplications = async (req, res) => {
    try {
        const applications = await jobApplicationService.getAllJobApplications();
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.FETCHED, applications);
    } catch (error) {
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    }
};

export const getJobApplicationById = async (req, res) => {
    try {
        const { error } = idValidation.validate(req.params);
        if (error) return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});

        const application = await jobApplicationService.getJobApplicationById(req.params.id);
        if (!application) {
            return response.error(res, resStatusCode.NOT_FOUND, "Job application not found", {});
        }
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.FETCHED, application);
    } catch (error) {
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    }
};

export const deleteJobApplication = async (req, res) => {
    try {
        const { error } = idValidation.validate(req.params);
        if (error) return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});

        const deleted = await jobApplicationService.deleteJobApplication(req.params.id);
        if (!deleted) {
            return response.error(res, resStatusCode.NOT_FOUND, "Job application not found", {});
        }
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.DELETED, {});
    } catch (error) {
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    }
};
