import { contactModel } from "../models/contactModel.js";

export const contactService = {
    async addContact(data) {
        return await contactModel.create(data);
    },
    async getAllContacts() {
        return await contactModel.find({ isActive: true }).sort({ createdAt: -1 });
    },

    async markContact(id) {
        return await contactModel.findByIdAndUpdate(id, { isMark: true }, { new: true });
    },
};