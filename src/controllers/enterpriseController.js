import { enterpriseLogoValidation, idValidation } from "../models/enterpriseModel.js";
import response from "../utils/response.js";
import { resStatusCode, resMessage } from "../utils/constants.js";
import { enterpriseService } from "../services/enterpriseService.js";

export const addEnterpriseLogo = async (req, res) => {
    const image = req?.file?.filename
    const { error } = enterpriseLogoValidation.validate({ image });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        const addEnterprise = await enterpriseService.addEnterpriseLogo({ image });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.ADD_ENTERPRISE_LOGO, addEnterprise);
    } catch (error) {
        console.error('Error in addEnterpriseLogo:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const getAllEnterpriseLogo = async (req, res) => {
    try {
        const getAllLogos = await enterpriseService.getAllEnterpriseLogos(req.body);
        const chnageLogoResponse = getAllLogos.map((logo) => ({
            ...logo._doc,
            image: `/enterpriseLogo/${logo.image}`,
        }));
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.LOGO_LIST, chnageLogoResponse);
    } catch (error) {
        console.error('Error in getAllEnterpriseLogo:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};
export const deleteEnterpriseLogo = async (req, res) => {
    const { id } = req?.params;
    const { error } = idValidation.validate({ id });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        await enterpriseService.deleteEnterpriseLogosById({ id });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.DELETE_LOGO, {});
    } catch (error) {
        console.error('Error in deleteEnterpriseLogo:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};


















