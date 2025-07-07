import response from "../utils/response.js";
import { resStatusCode, resMessage } from "../utils/constants.js";
import { contactValidation, idValidation } from "../models/contactMode.js";
import { contactService } from "../services/contactService.js";

export const addContact = async (req, res) => {
    const { error } = contactValidation.validate(req.body);
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        const data = await contactService.addContact(req.body);
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.CONTACT_SUBMITTED, data);
    } catch (err) {
        console.error("Error in addContact:", err);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const getAllContacts = async (req, res) => {
    try {
        const data = await contactService.getAllContacts();
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.FETCHED, data);
    } catch (err) {
        console.error("Error in getAllContacts:", err);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const markContact = async (req, res) => {
    const { id } = req.params;
    const { error } = idValidation.validate(id);
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        await contactService.markContact({ id });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.DELETED, {});
    } catch (err) {
        console.error("Error in markContact:", err);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};
