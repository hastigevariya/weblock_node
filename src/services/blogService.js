import { Blog } from "../models/blogModel.js";

export const blogService = {
    addBlog: async (data) => {
        const blog = new Blog(data);
        return await blog.save();
    },

    getAllBlogs: async () => {
        return await Blog.find({ isActive: true }).sort({ createdAt: -1 });
    },

    getBlogById: async (id) => {
        return await Blog.findOne({ _id: id, isActive: true });
    },

    deleteBlog: async (id) => {
        const result = await Blog.findByIdAndUpdate(id, { isActive: false });
        return result;
    }
};

