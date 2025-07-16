import { caseStudyValidation } from "../models/caseStudyModel.js";
import { caseStudyService } from "../services/caseStudyService.js";
import response from "../utils/response.js";
import { resStatusCode, resMessage } from "../utils/constants.js";
import { subscribeService } from "../services/subscribeService.js"
import sendMail from '../../confing/mailer/index.js';
import { getAllActiveAdminEmails } from "../utils/commonFunctions.js"
const base_URL = process.env.BASE_URL
export const addCaseStudy = async (req, res) => {
    try {
        const files = req.files;
        console.log('files', files);
        const {
            title, p1, projectName, projectURL, portfolio, duration, industry, p2,
            challenge, stackTech, process, reviewName,
            reviewPosition, reviewCount, reviewDescription, conclusion,
            description
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
        console.log(data);
        const { error } = caseStudyValidation.validate(data);
        console.log('error', error);
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
            mainImage: '/caseStudy/' + data.mainImage,
            description: shortDescription,
            base_URL: base_URL,
        });
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
