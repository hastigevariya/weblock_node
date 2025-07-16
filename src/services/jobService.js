import { jobModel } from "../models/jobModel.js";

export const jobApplicationService = {
    addJobApplication: async (data) => {
        return await jobModel.create(data);
    },
    getAllJobApplications: async () => {
        return await jobModel.find({ isActive: true }).sort({ createdAt: -1 });
    },
    getJobApplicationById: async (id) => {
        return await jobModel.findById(id);
    },
    deleteJobApplication: async (id) => {
        return await jobModel.findByIdAndUpdate(id, { isActive: false }, { new: true });
    },
};
