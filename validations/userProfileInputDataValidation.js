import Joi from "joi";


/*

export const validateUserInput = (data) => {
    const schema = Joi.object({
        user_id: Joi.string().required(),
        username: Joi.string().min(3).max(30).required(),
        fullName: Joi.string().required().default("User"),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        phone: Joi.string().pattern(/^[0-9]{10}$/).optional(),
        role: Joi.string().valid("admin", "master", "player").required(),
        profile_image_url: Joi.string().optional().default(""),

        government_id: Joi.object({
            id_Type: Joi.string().optional(),
            id_No: Joi.string().optional(),
            id_Photo_url: Joi.string().optional(),
        }),

        bank_details: Joi.object({
            account_number: Joi.string().optional(),
            ifsc_code: Joi.string().optional(),
            upi_id: Joi.string().optional(),
            holder_name: Joi.string().optional(),
        }).default({
            account_number: "",
            ifsc_code: "",
            upi_id: "",
            holder_name: "",
        }),

        createdAt: Joi.date().default(() => new Date().toISOString(), "current date"),
        updatedAt: Joi.date().default(() => new Date().toISOString(), "current date"),
        game_profiles: Joi.array().items(
            Joi.object({
                game_name: Joi.string().valid("BGMI", "COD", "FF").required(),
                game_id: Joi.string().required(),
            })
        ).optional()
    });

    return schema.validate(data);
};
*/



// ✅ Validate User Input for Creation
export const validateCreateUser = (data) => {
    const schema = Joi.object({
        user_id: Joi.string().required(),
        username: Joi.string().min(3).max(30).required(),
        fullName: Joi.string().required().default("User"),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        phone: Joi.string().pattern(/^[0-9]{10}$/).optional(),
        role: Joi.string().valid("admin", "master", "player").required(),
        profile_image_url: Joi.string().optional().default(""),
        government_id: Joi.object({
            id_Type: Joi.string().optional(),
            id_No: Joi.string().optional(),
            id_Photo_url: Joi.string().optional(),
        }),
        bank_details: Joi.object({
            account_number: Joi.string().optional(),
            ifsc_code: Joi.string().optional(),
            upi_id: Joi.string().optional(),
            holder_name: Joi.string().optional(),
        }).default({
            account_number: "",
            ifsc_code: "",
            upi_id: "",
            holder_name: "",
        }),
        createdAt: Joi.date().default(() => new Date().toISOString(), "current date"),
        updatedAt: Joi.date().default(() => new Date().toISOString(), "current date"),
        game_profiles: Joi.array().items(
            Joi.object({
                game_name: Joi.string().valid("BGMI", "COD", "FF").required(),
                game_id: Joi.string().required(),
            })
        ).optional()
    });
    return schema.validate(data);
};

// ✅ Validate Update User Input
export const validateUpdateUser = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(30),
        fullName: Joi.string(),
        email: Joi.string().email(),
        phone: Joi.string().pattern(/^[0-9]{10}$/),
        profile_image_url: Joi.string().optional(),
        government_id: Joi.object({
            id_Type: Joi.string().optional(),
            id_No: Joi.string().optional(),
            id_Photo_url: Joi.string().optional(),
        }).optional(),
        bank_details: Joi.object({
            account_number: Joi.string().optional(),
            ifsc_code: Joi.string().optional(),
            upi_id: Joi.string().optional(),
            holder_name: Joi.string().optional(),
        }).optional(),
        updatedAt: Joi.date().default(() => new Date().toISOString(), "current date"),
    });
    return schema.validate(data);
};

// ✅ Validate User ID for Fetching
export const validateGetUser = (data) => {
    const schema = Joi.object({
        user_id: Joi.string().required(),
    });
    return schema.validate(data);
};

// ✅ Validate User ID for Deletion
export const validateDeleteUser = (data) => {
    const schema = Joi.object({
        user_id: Joi.string().required(),
    });
    return schema.validate(data);
};