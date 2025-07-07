import { aboutValidation } from "../models/aboutMode.js";
import { aboutService } from "../services/aboutService.js";
import { resStatusCode, resMessage } from "../utils/constants.js";
import response from "../utils/response.js";

export const addAboutMedia = async (req, res) => {
    try {
        const media = req?.file?.filename;
        const { mediaType } = req.body;
        const { error } = aboutValidation.validate({ mediaType });
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
        };
        const count = await aboutService.mediaExists({ mediaType, isActive: true });
        if (count >= 1) {
            await aboutService.deactivateLastMedia({ mediaType, isActive: true });
        };
        const saved = await aboutService.addMedia({ media, mediaType });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.ADD_ENTERPRISE_LOGO, saved);
    } catch (err) {
        console.error("Error in addAboutMedia:", err);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const getActiveAboutMedia = async (req, res) => {
    try {
        const media = await aboutService.getActiveMedia({ isActive: true });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.FETCHED, media);
    } catch (err) {
        console.error("Error in getActiveAboutMedia:", err);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};