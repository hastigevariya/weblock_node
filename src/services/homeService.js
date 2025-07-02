import { homeImgVdoModel } from "../models/homeModel.js";
export class homeService {
    static async imageExists(data) {
        try {
            const imageCount = await homeImgVdoModel.countDocuments(data);
            return imageCount;
        } catch (error) {
            return error;
        };
    };
    static async addHomeImgVdo(data) {
        try {
            const newMedia = await homeImgVdoModel.create({
                ...data
            });
            return (newMedia);
        } catch (error) {
            return (error);
        };
    };
    static async deleteHomeImg(data) {
        try {
            const lastRecord = await homeImgVdoModel.findOne(data).sort({ createdAt: 1 });
            const deleted = await homeImgVdoModel.findByIdAndUpdate(
                { _id: lastRecord._id },
                { isActive: false },
                { new: false, runValidators: true }
            );
            return (deleted);
        } catch (error) {
            return (error);
        };
    };
};









