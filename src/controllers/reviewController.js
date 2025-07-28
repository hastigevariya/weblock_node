import { reviewValidation } from "../models/reviewModel.js";
import response from "../utils/response.js";
import { resStatusCode, resMessage } from "../utils/constants.js";
import { reviewService } from "../services/reviewService.js"
import { idValidation } from "../models/portfolioModel.js";

export const addReview = async (req, res) => {
    try {
        const photo = req.uploadedImages.find(file => file.field === 'photo');
        req.body.photo = photo?.s3Url;
        req.body = req.body || {};
        // req.body.photo = photo;
        const { error } = reviewValidation.validate(req.body);
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
        };
        const newReview = await reviewService.addReview(req.body);
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.ADD_REVIEW_SUCCESS, newReview);
    } catch (error) {
        console.error("Error in addReview:", error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const getAllReviews = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const isPaginated = page && limit;
        const query = { isActive: true };
        const sort = { createdAt: -1 };

        let review = [];
        let totalCount = 0;
        let totalPages = 0;

        if (isPaginated) {
            const pageNum = parseInt(page);
            const limitNum = parseInt(limit);
            const skip = (pageNum - 1) * limitNum;

            [review, totalCount] = await Promise.all([
                reviewService.getAllReviews(query, sort, skip, limitNum),

                reviewService.reviewCount(query),
            ]);
            totalPages = Math.ceil(totalCount / limitNum);

            return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.FETCHED, {
                page: pageNum,
                limit: limitNum,
                totalRecords: totalCount,
                totalPages,
                records: review,
            });
        };
        const result = await reviewService.getAllReviews(query, sort)

        // const reviews = await reviewService.getAllReviews();
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.REVIEW_LIST, result);
    } catch (error) {
        console.error("Error in getAllReviews:", error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};
export const getReviewById = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await reviewService.getReviewById(id);

        if (!review || !review.isActive) {
            return response.error(res, resStatusCode.NOT_FOUND, "Review not found", {});
        }

        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.FETCHED, review);
    } catch (error) {
        console.error("Error in getReviewById:", error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    }
};

export const updateReviewById = async (req, res) => {
    try {
        const { id } = req.params;
        let updateData = req.body;
        const uploadedPhoto = req?.uploadedImages?.find(file => file.field === 'photo');
        const photo = uploadedPhoto?.s3Url;
        const getReview = await reviewService.getReviewById(id);
        photo && (updateData.photo = photo ?? getReview?.photo ?? "");
        const updatedReview = await reviewService.updateReviewById(id, updateData);

        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.UPDATED, updatedReview);
    } catch (error) {
        console.error("Error in updateReview:", error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    }
};

export const deleteReview = async (req, res) => {
    const { id } = req.params;
    const { error } = idValidation.validate({ id });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        await reviewService.deleteReviewById(id);
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.REVIEW_DELETED, {});
    } catch (error) {
        console.error("Error in deleteReview:", error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};
