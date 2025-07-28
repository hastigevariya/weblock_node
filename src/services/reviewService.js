import { reviewModel } from "../models/reviewModel.js";

export const reviewService = {
    async addReview(data) {
        return await reviewModel.create(data);
    },
    // async getAllReviews() {
    //     return await reviewModel.find({ isActive: true }).sort({ createdAt: -1 });
    // },
    getAllReviews: async (data, sort, skip, limitNum) => {
        return await reviewModel.find(data).sort(sort).skip(skip).limit(limitNum).lean();
    },
    reviewCount: async (data) => {
        return await reviewModel.countDocuments(data)
    },

      getReviewById: async (id) => {
            return await reviewModel.findById(id);
        },
        updateReviewById: async (id,data) => {
            return await reviewModel.findByIdAndUpdate(
                { _id: id },
                { ...data },
                { new: false }
            );
        },
    async deleteReviewById(id) {
        return await reviewModel.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: true }
        );
    },
}