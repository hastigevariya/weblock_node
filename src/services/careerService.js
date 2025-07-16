import { careerModel } from "../models/careerModel.js";

export const careerService = {
    addCareer: async (data) => {
        const newCareer = new careerModel(data);
        return await newCareer.save();
    },
    getAllCareer: async () => {
        return await careerModel.find({ isActive: true }).sort({ createdAt: -1 });
    },
    getCareerById: async (id) => {
        return await careerModel.findById(id);
    },
    deleteCareer: async (id) => {
        return await careerModel.findByIdAndUpdate(id, { isActive: false }, { new: true });
    },
};