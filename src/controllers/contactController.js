import response from "../utils/response.js";
import { resStatusCode, resMessage } from "../utils/constants.js";
import { contactValidation, idValidation, subscribeUserValidation } from "../models/contactModel.js";
import { contactService } from "../services/contactService.js";
import { subscribeService } from "../services/subscribeService.js"
import sendMail from '../../confing/mailer/index.js';
import { getAllActiveAdminEmails } from '../utils/commonFunctions.js';

export const addContact = async (req, res) => {
    const { error } = contactValidation.validate(req.body);
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        const data = await contactService.addContact(req.body);
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.CONTACT_SUBMITTED, data);
    } catch (err) {
        console.error("Error in addContact:", err);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const getAllContacts = async (req, res) => {
    try {
           const { page, limit } = req.query;
                      const isPaginated = page && limit;
                      const query = { isActive: true };
                      const sort = { createdAt: -1 };
              
                      let contact = [];
                      let totalCount = 0;
                      let totalPages = 0;
              
                      if (isPaginated) {
                          const pageNum = parseInt(page);
                          const limitNum = parseInt(limit);
                          const skip = (pageNum - 1) * limitNum;
              
                          [contact, totalCount] = await Promise.all([
                              contactService.getAllContacts(query, sort, skip, limitNum),
              
                              contactService.ContactCount(query),
                          ]);
                          totalPages = Math.ceil(totalCount / limitNum);
              
                          return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.FETCHED, {
                              page: pageNum,
                              limit: limitNum,
                              totalRecords: totalCount,
                              totalPages,
                              records: contact,
                          });
                      };
                      const result = await contactService.getAllContacts(query, sort)
            
        // const data = await contactService.getAllContacts();
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.FETCHED, data);
    } catch (err) {
        console.error("Error in getAllContacts:", err);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const markContact = async (req, res) => {
    const { id } = req.params;
    const { error } = idValidation.validate(id);
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        await contactService.markContact({ id });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.DELETED, {});
    } catch (err) {
        console.error("Error in markContact:", err);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const addSubscribe = async (req, res) => {
    const { email } = req.body;
    const { error } = subscribeUserValidation.validate(req.body);
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        const alreadyExist = await subscribeService.findOneByEmail({ email });
        console.log('alreadyExist', alreadyExist);
        if (alreadyExist) {
            return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.SUBSCRIBE_SUCCESS, {});
        };
        const adminEmailSend = await getAllActiveAdminEmails();
        console.log("adminEmailSend", adminEmailSend);
        const allRecipients = [email, ...adminEmailSend];
        const subject = `Welcome to CodeSmith InfoSoft! 🎉 Thanks for Subscribing.`;

        sendMail("subscribe", subject, allRecipients, {
            fullName: email,
            base_URL: process.env.BASE_URL
        });
        const done = await subscribeService.addSubscribe({ email });
        console.log('done', done);
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.SUBSCRIBE_SUCCESS, {});
    } catch (err) {
        console.error('Error in addSubscribe:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const getAllSubscribe = async (req, res) => {
    try {
               const { page, limit } = req.query;
                      const isPaginated = page && limit;
                      const query = { isActive: true };
                      const sort = { createdAt: -1 };
              
                      let subscribe = [];
                      let totalCount = 0;
                      let totalPages = 0;
              
                      if (isPaginated) {
                          const pageNum = parseInt(page);
                          const limitNum = parseInt(limit);
                          const skip = (pageNum - 1) * limitNum;
              
                          [subscribe, totalCount] = await Promise.all([
                              subscribeService.getAllSubscribe(query, sort, skip, limitNum),
              
                              subscribeService.SubscribeCount(query),
                          ]);
                          totalPages = Math.ceil(totalCount / limitNum);
              
                          return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.FETCHED, {
                              page: pageNum,
                              limit: limitNum,
                              totalRecords: totalCount,
                              totalPages,
                              records: subscribe,
                          });
                      };
                      const result = await subscribeService.getAllSubscribe(query, sort)
      
              // const blogs = await blogService.getAllBlogs();
              return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.FETCHED, result);
    } catch (error) {
        console.error('Error in getAllSubscribe:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};