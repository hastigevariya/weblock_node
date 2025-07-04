export const resMessage = {
    INTERNAL_SERVER_ERROR: "Oops! Something went wrong on our end. We're working on it—please refresh or try again later.",
    NO_TOKEN_PROVIDED: "Authentication token is missing. Please log in.",
    UNAUTHORISED: "You are not authorized to perform this action.",
    TOKEN_EXPIRED: "Your session has expired. Please log in again.",
    TOKEN_INVALID: "Invalid authentication token. Please log in again.",
    USER_REGISTER: "Successfully signed up. Login to access your account!",
    USER_FOUND: "An account with this email already exists!",
    USER_REGISTER: "Successfully signed up. Login to access your account!",
    USER_NOT_FOUND: "You don't have an account yet. Please sign up first!",
    INCORRECT_PASSWORD: "Invalid password. Please re-enter your password!",
    LOGIN_SUCCESS: "Hello Admin You're logged in successfully!",
    ADD_ENTERPRISE_LOGO: "Enterprise logo has been added to your trusted brands section.",
    LOGO_LIST: "Enterprise logos list fetched successfully!",
    DELETE_LOGO: "Enterprise logo deleted successfully! It has been removed from your list.",
    PHOTO_UPLOAD_SUCCESS: "Photo(s) uploaded successfully.",
    IMAGE_VIDEO_LIST: "Home Page Image Or Video list fetched successfully!",
    DELETE_IMAGE_VIDEO: "Image Or Video deleted successfully! It has been removed from your list.",
    NO_ACTIVE_ABOUT_MEDIA: "No active about media found",
    FETCHED: "Fetched successfully",
    ADD_REVIEW_SUCCESS: "Review added successfully.",
    ADD_PORTFOLIO_SUCCESS: "Portfolio added successfully.",

};

export const resStatusCode = {
    ACTION_COMPLETE: 200,               // OK
    CREATED: 201,                       // Resource created successfully
    ACCEPTED: 202,                      // Request accepted but processing not complete
    NO_CONTENT: 204,                    // No content to send back
    CLIENT_ERROR: 400,                  // Bad request
    UNAUTHORISED: 401,                  // Unauthorized
    FORBIDDEN: 403,                     // Forbidden
    NOT_FOUND: 404,                     // Resource not found
    CONFLICT: 409,                      // Conflict 
    UNSUPPORTED_MEDIA_TYPE: 415,        // Unsupported content type
    TOO_MANY_REQUESTS: 429,             // Rate limit exceeded
    INTERNAL_SERVER_ERROR: 500,         // Generic server error
    NOT_IMPLEMENTED: 501,               // Not implemented on server
    SERVICE_UNAVAILABLE: 503,           // Server temporarily unavailable
    GATEWAY_TIMEOUT: 504,               // Gateway timeout (useful for proxy setups)
};

export const dbTableName = {
    AUTH: "auths",
    HOME_ENTERPRISE_LOGO: "home_enterprise_logos",
    HOME_PHOTO: "home_img_vdo",
    ABOUT_VID: "about_vid",
    TEAM: "team",
    REVIEW: "review",
    PORTFOLIO: "portfolio",
    CAREER: "career",
    JOB_APPLICATION: "jobapplication"
};


