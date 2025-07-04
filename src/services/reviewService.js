import { ReviewModel } from "../models/reviewModel.js";

export const reviewService = {
    async addReview(data) {
        return await ReviewModel.create(data);
    },
    async getAllReviews() {
        return await ReviewModel.find({ isActive: true }).sort({ createdAt: -1 });
    },

    async deleteReviewById(id) {
        return await ReviewModel.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: true }
        );
    },
}