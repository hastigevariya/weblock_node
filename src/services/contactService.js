import { Contact } from "../models/contactMode.js";

export const contactService = {
    async addContact(data) {
        return await Contact.create(data);
    },
    async getAllContacts() {
        return await Contact.find({ isActive: true }).sort({ createdAt: -1 });
    },

    async markContact(id) {
        return await Contact.findByIdAndUpdate(id, { isMark: true }, { new: true });
    },
};