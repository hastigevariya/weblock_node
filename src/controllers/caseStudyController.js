import { caseStudyValidation, idValidation } from "../models/caseStudyModel.js";
import { caseStudyService } from "../services/caseStudyService.js";
import response from "../utils/response.js";
import { resStatusCode, resMessage } from "../utils/constants.js";
import { subscribeService } from "../services/subscribeService.js"
import sendMail from '../../confing/mailer/index.js';
import { getAllActiveAdminEmails } from "../utils/commonFunctions.js"
const base_URL = process.env.BASE_URL

export const addCaseStudy = async (req, res) => {
    try {
        const mainImage = req.uploadedImages.find(file => file.field === 'mainImage');
        const logo = req.uploadedImages.find(file => file.field === 'logo');
        const colorImage = req.uploadedImages.find(file => file.field === 'colorImage');
        const typographyImage = req.uploadedImages.find(file => file.field === 'typographyImage');
        const mobTypographyImage = req.uploadedImages.find(file => file.field === 'mobTypographyImage');

        const {
            projectName, projectURL, platform, duration, industry, p2,
            challenge, stackTech, process, conclusion,
            description
        } = req.body;

        //  req.body.image = image?.s3Url;

        const data = {
            mainImage: mainImage?.s3Url,
            logo: logo?.s3Url,
            colorImage: colorImage?.s3Url,
            typographyImage: typographyImage?.s3Url,
            mobTypographyImage: mobTypographyImage?.s3Url, projectName, projectURL, platform, duration, industry, p2, description,
            challenge: challenge,
            stackTech: stackTech,
            process: process,
            conclusion: conclusion,
        };
        const { error } = caseStudyValidation.validate(data);
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
        };
        const result = await caseStudyService.addCaseStudy(data);
        // const subscribers = await subscribeUserModel.find({ isActive: true }).select("email");
        // const subscriberEmails = subscribers.map(sub => sub.email);
        const subscriberEmails = await subscribeService.getAllActiveEmails();
        const adminEmails = await getAllActiveAdminEmails();
        const allRecipients = [...adminEmails, ...subscriberEmails];
        const shortDescription = description.split(" ").slice(0, 200).join(" ");
        const subject = "📊 New Case Study Released by Weblock InfoSoft LLP - See What We Built!";
        console.log('base_URL', base_URL);
        sendMail("case_study", subject, allRecipients, {
            title: projectName,
            mainImage: data.mainImage,
            description: shortDescription,
            base_URL: base_URL,
        });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.ADDED, result);
    } catch (err) {
        console.error("Error in addCaseStudy:", err);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const updateCaseStudyById = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = idValidation.validate({ id });
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
        };
        // const mainImage = req?.uploadedImages.find(file => file.field === 'mainImage');
        // const logo = req?.uploadedImages.find(file => file.field === 'logo');
        // const colorImage = req?.uploadedImages.find(file => file.field === 'colorImage');
        // const typographyImage = req?.uploadedImages.find(file => file.field === 'typographyImage');
        // const mobTypographyImage = req?.uploadedImages.find(file => file.field === 'mobTypographyImage');

        const getCaseStudy = await caseStudyService.getCaseStudyById(id);
        // mainImage && (mainImage = mainImage ?? getCaseStudy?.mainImage ?? "");
        // logo && (logo = logo ?? getCaseStudy?.logo ?? "");
        // colorImage && (colorImage = colorImage ?? getCaseStudy?.colorImage ?? "");
        // typographyImage && (typographyImage = typographyImage ?? getCaseStudy?.typographyImage ?? "");
        // mobTypographyImage && (mobTypographyImage = mobTypographyImage ?? getCaseStudy?.mobTypographyImage ?? "");

        const mainImageFile = req?.uploadedImages.find(file => file.field === 'mainImage');
        const logoFile = req?.uploadedImages.find(file => file.field === 'logo');
        const colorImageFile = req?.uploadedImages.find(file => file.field === 'colorImage');
        const typographyImageFile = req?.uploadedImages.find(file => file.field === 'typographyImage');
        const mobTypographyImageFile = req?.uploadedImages.find(file => file.field === 'mobTypographyImage');

        const {
            projectName, projectURL, platform, duration, industry, p2,
            challenge, stackTech, process,  conclusion,
            description
        } = req.body;

        const updatedData = {
            mainImage: mainImageFile?.s3Url ?? getCaseStudy?.mainImage ?? "",
            logo: logoFile?.s3Url ?? getCaseStudy?.logo ?? "",
            colorImage: colorImageFile?.s3Url ?? getCaseStudy?.colorImage ?? "",
            typographyImage: typographyImageFile?.s3Url ?? getCaseStudy?.typographyImage ?? "",
            mobTypographyImage: mobTypographyImageFile?.s3Url ?? getCaseStudy?.mobTypographyImage ?? "",
            projectName: projectName,
            projectURL: projectURL,
            platform: platform,
            duration: duration,
            industry: industry,
            p2: p2,
            challenge: challenge,
            stackTech: stackTech,
            process: process,
            conclusion: conclusion,
            description: description,
        };
        const updatedResult = await caseStudyService.updateCaseStudyById(id, updatedData);
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.UPDATE_CASE_STUDY, updatedResult);
    } catch (err) {
        console.error("Error in updateCaseStudy:", err);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const getAllCaseStudy = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const isPaginated = page && limit;
        const query = { isActive: true };
        const sort = { createdAt: -1 };

        let caseStudies = [];
        let totalCount = 0;
        let totalPages = 0;

        if (isPaginated) {
            const pageNum = parseInt(page);
            const limitNum = parseInt(limit);
            const skip = (pageNum - 1) * limitNum;

            [caseStudies, totalCount] = await Promise.all([
                // caseStudyService.find(query).sort(sort).skip(skip).limit(limitNum),
                caseStudyService.getAllCaseStudy(query, sort, skip, limitNum),

                caseStudyService.caseStudyCount(query),
            ]);
            totalPages = Math.ceil(totalCount / limitNum);
            // const formattedData = caseStudies.map(data => ({
            //     ...data._doc,
            //     companyLogo: `/caseStudy/${data.companyLogo}`,
            //     mainImage: `/caseStudy/${data.mainImage}`,
            //     typography: `/caseStudy/${data.typography}`,
            //     color: `/caseStudy/${data.color}`,
            // }));
            return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.FETCHED, {
                page: pageNum,
                limit: limitNum,
                totalRecords: totalCount,
                totalPages,
                records: caseStudies,
            });
        };
        // const result = await caseStudyService.getAllCaseStudy();
        const result = await caseStudyService.getAllCaseStudy(query, sort)

        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.FETCHED, result);
    } catch (err) {
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

// export const getCaseStudyById = async (req, res) => {
//     try {
//         const result = await caseStudyService.getCaseStudyById(req.params.id);
//         if (!result || !result.isActive) {
//             return response.error(res, resStatusCode.NOT_FOUND, "Case study not found", {});
//         };
//         return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.FETCHED, result);
//     } catch (err) {
//         console.error("Error in getCaseStudyById:", err);
//         return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
//     };
// };

export const getCaseStudyById = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = idValidation.validate({ id });
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
        };
        const blog = await caseStudyService.getCaseStudyById(id);
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.FETCHED, blog);
    } catch (error) {
        console.error("Error in getCaseStudyById:", error);
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
