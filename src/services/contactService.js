import { contactModel } from "../models/contactModel.js";

export const contactService = {
    async addContact(data) {
        return await contactModel.create(data);
    },
    // async getAllContacts() {
    //     return await contactModel.find({ isActive: true }).sort({ createdAt: -1 });
    // },
            getAllContacts: async (data, sort, skip, limitNum) => {
                    return await contactModel.find(data).sort(sort).skip(skip).limit(limitNum).lean();
                },
            ContactCount: async (data) => {
                    return await contactModel.countDocuments(data)
                },

    async markContact(id) {
        return await contactModel.findByIdAndUpdate(id, { isMark: true }, { new: true });
    },
};