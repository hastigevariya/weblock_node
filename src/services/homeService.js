import { homeImgVdoModel } from "../models/homeModel.js";
// export class homeService {
//     static async imageExists(data) {
//         try {
//             const imageCount = await homeImgVdoModel.countDocuments(data);
//             return imageCount;
//         } catch (error) {
//             return error;
//         };
//     };
      export const homeService = {
    async imageExists(data) {
        const imageCount = await homeImgVdoModel.create(data);
        return { imageCount };
    },

    // static async addHomeImgVdo(data) {
    //     try {
    //         const newMedia = await homeImgVdoModel.create({
    //             ...data
    //         });
    //         return (newMedia);
    //     } catch (error) {
    //         return (error);
    //     };
    // };

       async addHomeImgVdo(data) {
            return await homeImgVdoModel.create(data);
        },

    // static async deleteHomeImg(data) {
    //     try {
    //         const lastRecord = await homeImgVdoModel.findOne(data).sort({ createdAt: 1 });
    //         const deleted = await homeImgVdoModel.findByIdAndUpdate(
    //             { _id: lastRecord._id },
    //             { isActive: false },
    //             { new: false, runValidators: true }
    //         );
    //         return (deleted);
    //     } catch (error) {
    //         return (error);
    //     };
    // };

     async deleteHomeImg(id) {
    return await homeImgVdoModel.findByIdAndUpdate(
        id,
        { isActive: false },
        { new: true }
    );
},

    // static async getAllHomeImgVdo(data) {
    //     try {
    //         const getAll = await homeImgVdoModel.get(data).sort({ createdAt: -1 });
    //         return (getAll);
    //     } catch (error) {
    //         return (error);
    //     };
    // };
      getAllHomeImgVdo: async (data, sort, skip, limitNum) => {
                return await homeImgVdoModel.find(data).sort(sort).skip(skip).limit(limitNum).lean();
            },
       HomeImgVdoCount: async (data) => {
                return await homeImgVdoModel.countDocuments(data)
            },
    // static async deleteHomeImgVdo(data) {
    //     try {
    //         const deleted = await homeImgVdoModel.findByIdAndUpdate(
    //             { _id: data },
    //             { isActive: false },
    //             { new: false, runValidators: true }
    //         );
    //         return (deleted);
    //     } catch (error) {
    //         return (error);
    //     };
    // };

     async deleteHomeImgVdo(id) {
    return await homeImgVdoModel.findByIdAndUpdate(
        id,
        { isActive: false },
        { new: true }
    );
}

};









