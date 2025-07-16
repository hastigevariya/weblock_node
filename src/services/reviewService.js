import { reviewModel } from "../models/reviewModel.js";

export const reviewService = {
    async addReview(data) {
        return await reviewModel.create(data);
    },
    async getAllReviews() {
        return await reviewModel.find({ isActive: true }).sort({ createdAt: -1 });
    },

    async deleteReviewById(id) {
        return await reviewModel.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: true }
        );
    },
}