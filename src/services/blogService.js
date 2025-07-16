import { blogModel } from "../models/blogModel.js";

export const blogService = {
    addBlog: async (data) => {
        const blog = new blogModel(data);
        return await blog.save();
    },

    getAllBlogs: async () => {
        return await blogModel.find({ isActive: true }).sort({ createdAt: -1 });
    },

    getBlogById: async (id) => {
        return await blogModel.findOne({ _id: id, isActive: true });
    },

    deleteBlog: async (id) => {
        const result = await blogModel.findByIdAndUpdate(id, { isActive: false });
        return result;
    }
};

