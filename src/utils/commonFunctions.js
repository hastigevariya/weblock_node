import { authModel } from "../models/authModel.js";

export async function getAllActiveAdminEmails(req, res) {
    try {
        const adminDetails = await authModel.find()// { email: 1, _id: 0 });
        console.log('adminDetails', adminDetails);
        const emailList = adminDetails.map(data => data.email);
        return emailList;
    } catch (error) {
        console.error('Error in getAllActiveAdminEmails :', error);
    };
};