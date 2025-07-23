import { blogValidation, idValidation } from "../models/blogModel.js";
import response from "../utils/response.js";
import { resStatusCode, resMessage } from "../utils/constants.js";
import { blogService } from "../services/blogService.js";
import { subscribeService } from "../services/subscribeService.js"
import sendMail from '../../confing/mailer/index.js';
import { getAllActiveAdminEmails } from "../utils/commonFunctions.js"

export const addBlog = async (req, res) => {
    try {
        const mainImage = req?.file?.filename;
        req.body.mainImage = mainImage;
        if (typeof req.body.details === "string") {
            try {
                req.body.details = JSON.parse(req.body.details);
            } catch (e) {
                return response.error(res, resStatusCode.CLIENT_ERROR, resMessage.INVALID_DETAILS_JSON, {});
            };
        };
        if (typeof req.body.table === "string") {
            try {
                req.body.table = JSON.parse(req.body.table);
            } catch (e) {
                return response.error(res, resStatusCode.CLIENT_ERROR, resMessage.INVALID_TABLE_JSON, {});
            };
        };
        const { error } = blogValidation.validate(req.body);
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
        };
        const newBlog = await blogService.addBlog(req.body);
        const adminEmails = await getAllActiveAdminEmails();
        // const subscribers = await subscribeService.find({ isActive: true }).select("email");
        // const subscriberEmails = subscribers.map(sub => sub.email);
        const subscriberEmails = await subscribeService.getAllActiveEmails();

        const allRecipients = [...adminEmails, ...subscriberEmails];

        const shortDescription = req.body.paragraph
            ? req.body.paragraph.split(" ").slice(0, 200).join(" ")
            : "";

        const subject = "📊 New Blog Released by weblog InfoSoft LLP - See What We Built!";

        sendMail("blog", subject, allRecipients, {
            title: req.body.title,
            mainImage: '/blog/' + mainImage,
            description: shortDescription,
            base_URL: process.env.BASE_URL,
        });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.ADD_SUCCESS, newBlog);
    } catch (error) {
        console.error("Error in addBlog:", error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await blogService.getAllBlogs();
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.FETCHED, blogs);
    } catch (error) {
        console.error("Error in getAllBlogs:", error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = idValidation.validate({ id });
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
        };
        const blog = await blogService.getBlogById({ id });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.FETCHED, blog);
    } catch (error) {
        console.error("Error in getBlogById:", error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = idValidation.validate({ id });
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
        };
        await blogService.deleteBlog({ id });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.FETCHED, {});
    } catch (error) {
        console.error("Error in deleteBlog:", error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};