import { aboutModel } from "../models/aboutModel.js";

export class aboutService {
    static async mediaExists(filter) {
        try {
            return await aboutModel.countDocuments(filter);
        } catch (err) {
            return err;
        }
    }

    static async deactivateLastMedia(filter) {
        try {
            const last = await aboutModel.findOne(filter).sort({ createdAt: -1 });
            if (!last) return null;

            return await aboutModel.findByIdAndUpdate(
                last._id,
                { $set: { isActive: false } },
                { new: true }
            );
        } catch (err) {
            return err;
        }
    }

    static async addMedia(data) {
        try {
            const newMedia = await aboutModel.create(data);
            return newMedia;
        } catch (err) {
            return err;
        }
    }
    static async getActiveMedia(filter) {
        return await aboutModel.findOne(filter).sort({ createdAt: -1 });
    }
}
