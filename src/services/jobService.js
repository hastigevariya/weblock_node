import { jobModel } from "../models/jobModel.js";

export const jobApplicationService = {
    addJobApplication: async (data) => {
        return await jobModel.create(data);
    },
    // getAllJobApplications: async () => {
    //     return await jobModel.find({ isActive: true }).sort({ createdAt: -1 });
    // },
    getAllJobApplications: async (data, sort, skip, limitNum) => {
        return await jobModel.find(data).sort(sort).skip(skip).limit(limitNum).lean();
    },
    JobApplicationsCount: async (data) => {
        return await jobModel.countDocuments(data)
    },

    getJobApplicationById: async (id) => {
        return await jobModel.findById(id);
    },
    jobAppUpload: async (id) => {
        return await jobModel.findByIdAndUpdate(
            { _id: id },
            { ...data },
            { new: false }
        );
    },
    deleteJobApplication: async (id) => {
        return await jobModel.findByIdAndUpdate(id, { isActive: false }, { new: true });
    },
};
