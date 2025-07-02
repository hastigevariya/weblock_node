import { homeEnterpriseModel } from "../models/enterpriseModel.js";
export class enterpriseService {
    static async addEnterpriseLogo(data) {
        try {
            const newLogo = await homeEnterpriseModel.create({
                ...data
            });
            return (newLogo);
        } catch (error) {
            return (error);
        };
    };
    static async getAllEnterpriseLogos(data) {
        try {
            const logos = await homeEnterpriseModel.find({ isActive: true }).sort({ createdAt: -1 });
            return (logos);
        } catch (error) {
            return (error);
        };
    };
    static async deleteEnterpriseLogosById(data) {
        try {
            const updatedLogo = await homeEnterpriseModel.findByIdAndUpdate(
                { _id: data.id },
                { isActive: false },
                { new: true }
            );
            return (updatedLogo);
        } catch (error) {
            return (error);
        };
    };
};









