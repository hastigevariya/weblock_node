import { aboutValidation } from "../models/aboutModel.js";
import { aboutService } from "../services/aboutService.js";
import { resStatusCode, resMessage } from "../utils/constants.js";
import response from "../utils/response.js";

export const addAboutMedia = async (req, res) => {
    try {
        // const media = req?.file?.filename;
        const media = req.uploadedImages.find(file => file.field === 'media');
        req.body.media = media?.s3Url;
        // const { mediaType } = req.body;
        const { error } = aboutValidation.validate({ media: req.body.media });
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
        };
        const count = await aboutService.mediaExists({ isActive: true });
        if (count >= 1) {
            await aboutService.deactivateLastMedia({ isActive: true });
        };
        const saved = await aboutService.addMedia({ media: req.body.media });
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
