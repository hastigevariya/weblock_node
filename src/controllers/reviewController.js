import { reviewValidation } from "../models/reviewModel.js";
import response from "../utils/response.js";
import { resStatusCode, resMessage } from "../utils/constants.js";
import { reviewService } from "../services/reviewService.js"

export const addReview = async (req, res) => {
    try {
        let photo = req?.file?.filename;
        req.body = req.body || {};
        req.body.photo = photo;
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
        const reviews = await reviewService.getAllReviews();
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.REVIEW_LIST, reviews);
    } catch (error) {
        console.error("Error in getAllReviews:", error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const deleteReview = async (req, res) => {
    const { error } = idValidation.validate({ id });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        await reviewService.deleteReviewById({ id });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.REVIEW_DELETED, {});
    } catch (error) {
        console.error("Error in deleteReview:", error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};
