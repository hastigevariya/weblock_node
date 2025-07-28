import { careerModel } from "../models/careerModel.js";

export const careerService = {
    addCareer: async (data) => {
        const newCareer = new careerModel(data);
        return await newCareer.save();
    },
    getAllCareer: async (data, sort, skip, limitNum) => {
        return await careerModel.find(data).sort(sort).skip(skip).limit(limitNum).lean();
    },
    careerCount: async (data) => {
        return await careerModel.countDocuments(data)
    },
    getCareerById: async (id) => {
        return await careerModel.findById(id);
    },
    updateCareerById: async (id, data) => {
        return await careerModel.findByIdAndUpdate(
            { _id: id },
            { ...data },
            { new: false }
        );
    },
    deleteCareer: async (id) => {
        return await careerModel.findByIdAndUpdate(id, { isActive: false }, { new: true });
    },
};