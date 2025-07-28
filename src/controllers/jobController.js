import { jobApplicationValidation, idValidation } from "../models/jobModel.js";
import response from "../utils/response.js";
import { resStatusCode, resMessage } from "../utils/constants.js";
import { jobApplicationService } from "../services/jobService.js";

export const addJobApplication = async (req, res) => {
    try {
        // const fileName = req?.file?.filename;
         const fileName = req.uploadedImages.find(file => file.field === 'file');
     req.body.fileName = fileName?.s3Url;
        if (!fileName) {
            return response.error(res, resStatusCode.CLIENT_ERROR, resMessage.FILE_REQUIRED, {});
        };
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
    };
};


export const getAllJobApplications = async (req, res) => {
    try {
                const { page, limit } = req.query;
                const isPaginated = page && limit;
                const query = { isActive: true };
                const sort = { createdAt: -1 };
        
                let  jobApplication = [];
                let totalCount = 0;
                let totalPages = 0;
        
                if (isPaginated) {
                    const pageNum = parseInt(page);
                    const limitNum = parseInt(limit);
                    const skip = (pageNum - 1) * limitNum;
        
                    [ jobApplication, totalCount] = await Promise.all([
                        jobApplicationService.getAllJobApplications(query, sort, skip, limitNum),
        
                        jobApplicationService.JobApplicationsCount(query),
                    ]);
                    totalPages = Math.ceil(totalCount / limitNum);
              
                    return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.FETCHED, {
                        page: pageNum,
                        limit: limitNum,
                        totalRecords: totalCount,
                        totalPages,
                        records:  jobApplication,
                    });
                };
                const result = await jobApplicationService.getAllJobApplications(query, sort)
        
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.FETCHED, result);
    } catch (error) {
        console.error("Error in getAllJobApplications:", error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const getJobApplicationById = async (req, res) => {
    const { id } = req.params;
    const { error } = idValidation.validate({ id });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        const application = await jobApplicationService.getJobApplicationById({ id });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.FETCHED, application);
    } catch (error) {
        console.error("Error in getJobApplicationById:", error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};
export const updateJobApplicationById = async (req, res) => {
    try {
        const { id } = req.params;
 const { error } = idValidation.validate({ id });
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
        };
        // Check for uploaded file (optional update)
        const fileUpload = req.uploadedImages?.find(file => file.field === 'file');
        const fileUrl = fileUpload?.s3Url || existingApplication.file;

        // Destructure body
        const {
            fName = fName,
            email = email,
            expYear = expYear,
            expMonth = expMonth,
            currentCTC = currentCTC,
            expectedCTC = expectedCTC,
            mobile = mobile,
            position = position
        } = req.body;

        const updatedData = {
            fName,
            email,
            expYear: Number(expYear),
            expMonth: Number(expMonth),
            currentCTC: Number(currentCTC),
            expectedCTC: Number(expectedCTC),
            mobile,
            position,
            file: fileUrl
        };

        // Update
        const updatedApplication = await jobApplicationService.updateJobApplicationById(id, updatedData);

        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.UPDATED, updatedApplication);
    } catch (error) {
        console.error("Error in updateJobApplication:", error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    }
};

export const deleteJobApplication = async (req, res) => {
    const { id } = req.params;
    const { error } = idValidation.validate({ id });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        await jobApplicationService.deleteJobApplication( id );
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.DELETED, {});
    } catch (error) {
        console.error("Error in deleteJobApplication:", error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};
