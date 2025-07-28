import {
    authRegisterValidation,
    authLoginValidation,
} from "../models/authModel.js";
import response from "../utils/response.js";
import { resStatusCode, resMessage } from "../utils/constants.js";
import { generateJWToken } from "../middleware/auth.js";
import { hash, compare } from "bcrypt";
import { adminService } from "../services/authservice.js";

export const register = async (req, res) => {
    const { email, password } = req.body;
    const { error } = authRegisterValidation.validate(req.body);
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message);
    };
    try {
        const adminExists = await adminService.adminExists({ email: email });
        if (adminExists?.email) {
            return response.error(res, resStatusCode.CONFLICT, resMessage.USER_FOUND, {});
        };
        const hashedPassword = await hash(password, 10);
        req.body.password = hashedPassword;
        const createNewAdmin = await adminService.createAdmin(req.body, hashedPassword);
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.USER_REGISTER, { _id: createNewAdmin._id });
    } catch (error) {
        console.error('Error in register:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    const { error } = authLoginValidation.validate(req.body);
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message);
    };
    try {
        const adminExists = await adminService.adminExists({ email, isActive: true });
        if (!adminExists) {
            return response.error(res, resStatusCode.FORBIDDEN, resMessage.USER_NOT_FOUND, {});
        };
        const validPassword = await compare(password, adminExists.password);
        if (!validPassword) {
            return response.error(res, resStatusCode.UNAUTHORISED, resMessage.INCORRECT_PASSWORD, {});
        };
        const token = await generateJWToken({ _id: adminExists._id });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.LOGIN_SUCCESS, { _id: adminExists._id, token: token });
    } catch (error) {
        console.error('Error in login:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

// export const getGoogleOAuthUrl = async (req, res) => {
//     try {
//         const redirectUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URL}&scope=openid%20email%20profile`;
//         return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.GOOGLE_OAUTH_URL_GENERATED, { url: redirectUrl });
//     } catch (error) {
//         console.error("Error in getGoogleOAuthUrl:", error);
//         return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
//     }
// };


// export const googleOAuthLogin = async (req, res) => {
//     const { error } = googleOAuthValidation.validate(req.body);
//     if (error) {
//         return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message);
//     }

//     const { code } = req.body;
//     const decodedCode = decodeURIComponent(code);

//     try {
//         const tokenResponse = await axios.post("https://oauth2.googleapis.com/token", {
//             code: decodedCode,
//             client_id: process.env.GOOGLE_CLIENT_ID,
//             client_secret: process.env.GOOGLE_CLIENT_SECRET,
//             redirect_uri: process.env.GOOGLE_REDIRECT_URL,
//             grant_type: "authorization_code",
//         });

//         const { access_token } = tokenResponse.data;

//         const userInfoResponse = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
//             headers: {
//                 Authorization: `Bearer ${access_token}`,
//             },
//         });

//         const user = userInfoResponse.data;

//         let existingUser = await userModel.findOne({ email: user.email });

//         if (!existingUser) {
//             existingUser = new userModel({
//                 fname: user.given_name,
//                 lname: user.family_name,
//                 email: user.email,
//                 profilePhoto: user.picture,
//             });
//             await existingUser.save();
//         }

//         const token = await generateJWToken({ _id: existingUser._id });

//         return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.GOOGLE_AUTH_SUCCESS, {
//             _id: existingUser._id,
//             token: token,
//         });

//     } catch (error) {
//         if (
//             error.response?.data?.error === "invalid_grant" ||
//             error.response?.data?.error_description === "Bad Request"
//         ) {
//             return response.error(res, resStatusCode.FORBIDDEN, resMessage.AUTHORIZATION_CODE_EXPIRED, {});
//         }
//         console.error("Error in googleOAuthLogin:", error.response?.data || error);
//         return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
//     }
// };