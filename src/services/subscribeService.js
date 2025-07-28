import { subscribeUserModel } from "../models/contactModel.js";

export const subscribeService = {
    async addSubscribe(data) {
        return await subscribeUserModel.create(data);
    },

    async findOneByEmail(email) {
        console.log(email);
        return await subscribeUserModel.findOne(email);
    },

    async getAllActiveEmails() {
        const subs = await subscribeUserModel.find({ isActive: true }).select("email");
        return subs.map(sub => sub.email);
    },

    // async getAll(page = 1, limit = 10) {
    //     const skip = (page - 1) * limit;
    //     const query = { isActive: true };
    //     const sort = { createdAt: -1 };

    //     const [records, totalRecords] = await Promise.all([
    //         subscribeUserModel.find(query).sort(sort).skip(skip).limit(limit).lean(),
    //         subscribeUserModel.countDocuments(query),
    //     ]);

    //     const totalPages = Math.ceil(totalRecords / limit);
    //     return { page, limit, totalRecords, totalPages, records };
    // },
            getAllSubscribe: async (data, sort, skip, limitNum) => {
                return await subscribeUserModel.find(data).sort(sort).skip(skip).limit(limitNum).lean();
            },
        SubscribeCount: async (data) => {
                return await subscribeUserModel.countDocuments(data)
            },
};
