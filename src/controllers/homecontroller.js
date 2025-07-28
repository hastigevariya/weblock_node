import { homeImgVdoValidation, idValidation } from "../models/homeModel.js";
import { homeService } from "../services/homeService.js";
import { resStatusCode, resMessage } from "../utils/constants.js";
import response from "../utils/response.js";

export const addHomeImgVdo = async (req, res) => {
    try {
        const { imagePosition, mediaType } = req.body;
        // const media = req?.file?.filename;
    const media = req.uploadedImages.find(file => file.field === 'media');
     req.body.media = media?.s3Url;

        const { error } = homeImgVdoValidation.validate({ imagePosition, mediaType, media });
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
        };
        if (imagePosition == 1 && mediaType === "image") {
            const count = await homeService.imageExists({ imagePosition: 1, mediaType: "image", isActive: true });
            if (count >= 4) {
                await homeService.deleteHomeImg({ imagePosition: 1, mediaType: "image", isActive: true });
            };
        };
        if (imagePosition == 2 && mediaType === "image") {
            const count = await homeService.imageExists({ imagePosition: 2, mediaType: "image", isActive: true });
            if (count >= 1) {
                await homeService.deleteHomeImg({ imagePosition: 2, mediaType: "image", isActive: true });
            };
        };
        if (mediaType === "video") {
            const count = await homeService.imageExists({ mediaType: "video", isActive: true });
            if (count >= 1) {
                await homeService.deleteHomeImg({ mediaType: "video", isActive: true });
            };
        };
        const newMedia = await homeService.addHomeImgVdo({ media, imagePosition, mediaType });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.ADD_ENTERPRISE_LOGO, newMedia);
    } catch (error) {
        console.error('Error in addHomeImgVdo:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const getAllHomeImgVdo = async (req, res) => {
    try {
                 const { page, limit } = req.query;
                        const isPaginated = page && limit;
                        const query = { isActive: true };
                        const sort = { createdAt: -1 };
                
                        let home = [];
                        let totalCount = 0;
                        let totalPages = 0;
                
                        if (isPaginated) {
                            const pageNum = parseInt(page);
                            const limitNum = parseInt(limit);
                            const skip = (pageNum - 1) * limitNum;
                
                            [home, totalCount] = await Promise.all([
                                homeService.getAllHomeImgVdo(query, sort, skip, limitNum),
                
                                homeService.HomeImgVdoCount(query),
                            ]);
                            totalPages = Math.ceil(totalCount / limitNum);
                
                            return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.FETCHED, {
                                page: pageNum,
                                limit: limitNum,
                                totalRecords: totalCount,
                                totalPages,
                                records: home,
                            });
                        };
                        const result = await homeService.getAllHomeImgVdo(query, sort)
    
        // const homeImgVdo = await homeService.getAllHomeImgVdo();
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.IMAGE_VIDEO_LIST, homeImgVdo);
    } catch (error) {
        console.error('Error in getAllHomeImgVdo:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const deleteHomeImgVdo = async (req, res) => {
    const { id } = req.params;
    const { error } = idValidation.validate({ id });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        await homeService.deleteHomeImgVdo({ id });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.DELETE_IMAGE_VIDEO, {});
    } catch (error) {
        console.error('Error in deleteHomeImgVdo:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

