import {
    teamValidation,
    idValidation,
} from "../models/teamModel.js";
import response from "../utils/response.js";
import { resStatusCode, resMessage } from "../utils/constants.js";
import { teamService } from "../services/teamService.js";

export const addTeamMember = async (req, res) => {
    try {
        // let photo = req?.file?.filename;
        const photo = req.uploadedImages.find(file => file.field === 'photo');
        req.body.photo = photo?.s3Url;

        req.body = req.body || {};
        // req.body.photo = photo;
        const { error } = teamValidation.validate(req.body);
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
        };
        const newTeam = await teamService.addTeam(req.body);
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.ADD_TEAM, newTeam);
    } catch (error) {
        console.error('Error in addTeamMember:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const updateTeamMember = async (req, res) => {
    const { id } = req?.params;
    const updateData = req.body;
    const { error } = idValidation.validate({ id });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    const photo = req?.uploadedImages.find(file => file.field === 'photo');
    req.body.photo = photo?.s3Url;

    req.body.photo && (updateData.photo = req.body.photo);
    try {
        const updated = await teamService.updateTeamMember(id, updateData);
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.UPDATE_TEAM, updated);
    } catch (error) {
        console.error('Error in updateTeamMember:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const getAllTeamMember = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const isPaginated = page && limit;
        const query = { isActive: true };
        const sort = { createdAt: -1 };

        let teamMember = [];
        let totalCount = 0;
        let totalPages = 0;

        if (isPaginated) {
            const pageNum = parseInt(page);
            const limitNum = parseInt(limit);
            const skip = (pageNum - 1) * limitNum;

            [teamMember, totalCount] = await Promise.all([
                teamService.getAllTeamMembers(query, sort, skip, limitNum),

                teamService.TeamMembersCount(query),
            ]);
            totalPages = Math.ceil(totalCount / limitNum);

            return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.FETCHED, {
                page: pageNum,
                limit: limitNum,
                totalRecords: totalCount,
                totalPages,
                records: teamMember,
            });
        };
        const result = await teamService.getAllTeamMembers(query, sort)

        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.TEAM_LIST, result);
    } catch (error) {
        console.error('Error in getAllTeamMember:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};



export const getTeamMemberById = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = idValidation.validate({ id });
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
        };
        const team = await teamService.findById(id );
        // if (team.photo) team.photo = `/teamMember/${team?.photo}`;
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.TEAM_SINGLE, team);
    } catch (error) {
        console.error('Error in getTeamMemberById:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};
export const deleteTeamMember = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = idValidation.validate({ id });
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
        };
        const deleted = await teamService.deleteTeamMember(id );
        if (!deleted) {
            return response.error(res, resStatusCode.FORBIDDEN, resMessage.CONTACT_NOT_FOUND, {});
        };
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.DELETE_TEAM, {});
    } catch (error) {
        console.error('Error in deleteTeamMember:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};