import { blogModel } from "../models/blogModel.js";

export const blogService = {
    addBlog: async (data) => {
        const blog = new blogModel(data);
        return await blog.save();
    },

    // getAllBlogs: async () => {
    //     return await blogModel.find({ isActive: true }).sort({ createdAt: -1 });
    // },
        getAllBlogs: async (data, sort, skip, limitNum) => {
                return await blogModel.find(data).sort(sort).skip(skip).limit(limitNum).lean();
            },
        BlogCount: async (data) => {
                return await blogModel.countDocuments(data)
            },

    getBlogById: async (id) => {
        return await blogModel.findOne({ _id: id, isActive: true });
    },

    deleteBlog: async (id) => {
        const result = await blogModel.findByIdAndUpdate(id, { isActive: false });
        return result;
    },
    updateBlogById: async (id, data) => {
        console.log('data',data)
            return await blogModel.findByIdAndUpdate(
                { _id: id },
                { ...data },
                { new: false }
            );
        },
};

