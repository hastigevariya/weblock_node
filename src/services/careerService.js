import { Career } from "../models/careerModel.js";

export const careerService = {
    addCareer: async (data) => {
        const newCareer = new Career(data);
        return await newCareer.save();
    },
    getAllCareer: async () => {
        return await Career.find({ isActive: true }).sort({ createdAt: -1 });
    },
    getCareerById: async (id) => {
        return await Career.findById(id);
    },
    deleteCareer: async (id) => {
        return await Career.findByIdAndUpdate(id, { isActive: false }, { new: true });
    },
};