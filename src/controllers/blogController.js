import { blogValidation, idValidation } from "../models/blogModel.js";
import response from "../utils/response.js";
import { resStatusCode, resMessage } from "../utils/constants.js";
import { blogService } from "../services/blogService.js";
import { subscribeService } from "../services/subscribeService.js"
import sendMail from '../../confing/mailer/index.js';
import { getAllActiveAdminEmails } from "../utils/commonFunctions.js"

export const addBlog = async (req, res) => {
    try {
        const mainImage = req.uploadedImages.find(file => file.field === 'mainImage');
        req.body.mainImage = mainImage?.s3Url;

        req.body.details.forEach((detail, index) => {
            const uploaded = req.uploadedImages.find(f => f.field === `details[${index}][image]`);
            if (uploaded) {
                detail.image = uploaded.s3Url;
            } else {
                detail.image = '';
            }
        });
        const { error } = blogValidation.validate(req.body);
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
        }
        const newBlog = await blogService.addBlog(req.body);

        const adminEmails = await getAllActiveAdminEmails();
        const subscriberEmails = await subscribeService.getAllActiveEmails();
        const allRecipients = [...adminEmails, ...subscriberEmails];

        const shortDescription = req.body.details?.[0]?.paragraph?.join(" ")?.split(" ")?.slice(0, 200)?.join(" ") || "";

        const subject = "📊 New Blog Released by weblog InfoSoft LLP - See What We Built!";

        sendMail("blog", subject, allRecipients, {
            title: req.body.title,
            mainImage: req.body.mainImage,
            description: shortDescription,
            base_URL: process.env.BASE_URL,
        });

        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.ADD_SUCCESS, newBlog);
    } catch (error) {
        console.error("Error in addBlog:", error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    }
};


export const getAllBlogs = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const isPaginated = page && limit;
        const query = { isActive: true };
        const sort = { createdAt: -1 };

        let blog = [];
        let totalCount = 0;
        let totalPages = 0;

        if (isPaginated) {
            const pageNum = parseInt(page);
            const limitNum = parseInt(limit);
            const skip = (pageNum - 1) * limitNum;

            [blog, totalCount] = await Promise.all([
                blogService.getAllBlogs(query, sort, skip, limitNum),

                blogService.BlogCount(query),
            ]);
            totalPages = Math.ceil(totalCount / limitNum);

            return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.FETCHED, {
                page: pageNum,
                limit: limitNum,
                totalRecords: totalCount,
                totalPages,
                records: blog,
            });
        };
        const result = await blogService.getAllBlogs(query, sort)

        // const blogs = await blogService.getAllBlogs();
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.FETCHED, result);
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
        const blog = await blogService.getBlogById(id);
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.FETCHED, blog);
    } catch (error) {
        console.error("Error in getBlogById:", error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

// export const updateBlogById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { error } = idValidation.validate({ id });
//         if (error) {
//             return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
//         }
//         const existingBlog = await blogService.getBlogById(id);
//         if (!existingBlog) {
//             return response.error(res, resStatusCode.NOT_FOUND, "Blog not found", {});
//         }
//         const mainImage = req.uploadedImages?.find(file => file.field === "mainImage");
//         req.body.mainImage = mainImage?.s3Url || existingBlog.mainImage;
//         const details = req.body.details;

//         if (Array.isArray(details)) {
//             details.forEach((detail, index) => {
//                 const uploaded = req.uploadedImages?.find(f => f.field === `details[${index}][image]`);
//                 if (uploaded) {
//                     detail.image = uploaded.s3Url;
//                 } else if (existingBlog.details && existingBlog.details[index]) {
//                     detail.image = existingBlog.details[index].image;
//                 };
//             });
//         };
//         req.body.details = details;
//         const updatedBlog = await blogService.updateBlogById(id, req.body);
//         return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.UPDATE_BLOG, updatedBlog);
//     } catch (error) {
//         console.error("Error in updateBlog:", error);
//         return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
//     };
// };

export const updateBlogById = async (req, res) => {
    try {
        const { id } = req.params;

        const { error } = idValidation.validate({ id });
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
        };

        const existingBlog = await blogService.getBlogById(id);
        if (!existingBlog) {
            return response.error(res, resStatusCode.NOT_FOUND, resMessage.BLOG_NOT_FOUND, {});
        };
        const mainImage = req.uploadedImages.find(file => file.field === 'mainImage');
        req.body.mainImage = mainImage?.s3Url ?? existingBlog?.mainImage ?? "";

        if (Array.isArray(req.body.details)) {
            req.body.details.forEach((detail, index) => {
                const uploaded = req.uploadedImages.find(f => f.field === `details[${index}][image]`);
                if (uploaded) {
                    detail.image = uploaded.s3Url;
                } else if (existingBlog.details?.[index]) {
                    detail.image = existingBlog.details[index].image;
                } else {
                    detail.image = '';
                };
            });
        };
        // const { error: err } = blogValidation.validate(req.body);
        // if (err) {
        //     return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
        // };
        const updatedBlog = await blogService.updateBlogById(id, req.body);
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.UPDATE_BLOG, updatedBlog);
    } catch (error) {
        console.error("Error in updateBlog:", error);
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
        await blogService.deleteBlog(id);
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.FETCHED, {});
    } catch (error) {
        console.error("Error in deleteBlog:", error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};