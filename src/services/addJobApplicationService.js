import { JobApplication } from "../models/addJobApplicationModel.js";

export const jobApplicationService = {
    addJobApplication: async (data) => {
        return await JobApplication.create(data);
    },
    getAllJobApplications: async () => {
        return await JobApplication.find({ isActive: true }).sort({ createdAt: -1 });
    },
    getJobApplicationById: async (id) => {
        return await JobApplication.findById(id);
    },
    deleteJobApplication: async (id) => {
        return await JobApplication.findByIdAndUpdate(id, { isActive: false }, { new: true });
    },
};
