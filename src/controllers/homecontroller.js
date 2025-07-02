import { homeImgVdoValidation } from "../models/homeModel.js";
import { homeService } from "../services/homeService.js";
import { resStatusCode, resMessage } from "../utils/constants.js";
import response from "../utils/response.js";


export const addHomeImgVdo = async (req, res) => {
    try {
        const { imagePosition, mediaType } = req.body;
        const media = req?.file?.filename;

        const { error } = homeImgVdoValidation.validate({ imagePosition, mediaType, media });
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
        };

        if (imagePosition == 1 && mediaType === "image") {
            const count = await homeService.imageExists({ imagePosition: 1, mediaType: "image", isActive: true });
            if (count >= 4) {
                await homeService.deleteHomeImg({ imagePosition: 1, mediaType: "image", isActive: true });
            }
        }

        if (imagePosition == 2 && mediaType === "image") {
            const count = await homeService.imageExists({ imagePosition: 2, mediaType: "image", isActive: true });
            if (count >= 1) {
                await homeService.deleteHomeImg({ imagePosition: 2, mediaType: "image", isActive: true });
            }
        }

        if (mediaType === "video") {
            const count = await homeService.imageExists({ mediaType: "video", isActive: true });
            if (count >= 1) {
                await homeService.deleteHomeImg({ mediaType: "video", isActive: true });
            }
        }

        const newMedia = await homeService.addHomeImgVdo({ media, imagePosition, mediaType });

        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.ADD_ENTERPRISE_LOGO, newMedia);

    } catch (error) {
        console.error('Error in addHomeImgVdo:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    }
};


// export const addHomeImgVdo = async (req, res) => {
//     const { imagePosition, mediaType } = req.body
//     const media = req?.file?.filename;
//     const { error } = homeImgVdoValidation.validate({ imagePosition, mediaType, media, });
//     if (error) {
//         return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
//     };
//     try {
//         const imageExistsTypeOne = await homeService.imageExists({ imagePosition: 1, mediaType: "image", isActive: true });
//         if (imageExistsTypeOne >= 4) {
//             await homeService.deleteHomeImg({ imagePosition: 1, mediaType: "image", isActive: true });
//         };
//         const imageExistsTypeTwo = await homeService.imageExists({ imagePosition: 2, mediaType: "image", isActive: true });
//         if (imageExistsTypeTwo >= 1) {
//             await homeService.deleteHomeImg({ imagePosition: 2, mediaType: "image", isActive: true });
//         };
//         const vdoExists = await homeService.imageExists({ mediaType: "video", isActive: true });
//         if (vdoExists >= 1) {
//             await homeService.deleteHomeImg({ mediaType: "video", isActive: true });
//         };
//         const addEnterprise = await homeService.addHomeImgVdo({ media, imagePosition, mediaType });
//         return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.ADD_ENTERPRISE_LOGO, addEnterprise);
//     } catch (error) {
//         console.error('Error in addHomeImgVdo:', error);
//         return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
//     };
// };


// export const uploadPhotoController = async (req, res) => {
//     uploadPhotos(req, res, async (err) => {
//         if (err) {
//             return response.error(res, resStatusCode.CLIENT_ERROR, err.message, {});
//         }

//         const { category } = req.body;
//         const files = req.files?.map(file => file.filename) || [];

//         const { error } = photoUploadValidation.validate({ category, photos: files });
//         if (error) {
//             return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
//         }

//         try {
//             const saved = await savePhotos({ category, files });
//             return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.PHOTO_UPLOAD_SUCCESS, saved);
//         } catch (error) {
//             console.error("Photo Upload Error:", error);
//             return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
//         }
//     });
// };
