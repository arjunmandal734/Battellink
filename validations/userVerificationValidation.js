import Joi from "joi";

// ✅ Schema for User Verification (Bank + Government ID)
const userVerificationSchema = Joi.object({
    user_id: Joi.string().required(),

    // Bank Details (Flattened)
    bank_account_number: Joi.string().required(),
    bank_ifsc_code: Joi.string().required(),
    upi_id: Joi.string().optional().default(""),
    bank_holder_name: Joi.string().required(),

    // Government ID (Flattened)
    goverment_id_Type: Joi.string().required(),
    goverment_id_No: Joi.string().required(),
    goverment_id_Photo_url: Joi.string().required(),

    created_at: Joi.date().default(() => new Date().toISOString(), "current date"),
    updated_at: Joi.date().default(() => new Date().toISOString(), "current date"),
});

// ✅ Validation for Creating User Verification Data
export const validateCreateUserVerification = (data) => {
    return userVerificationSchema.validate(data);
};

// ✅ Validation for Fetching User Verification Data (By User ID)
export const validateGetUserVerification = (data) => {
    const schema = Joi.object({
        user_id: Joi.string().required(),
    });
    return schema.validate(data);
};

// ✅ Validation for Updating User Verification Data
export const validateUpdateUserVerification = (data) => {
    const schema = Joi.object({
        user_id: Joi.string().required(),
        bank_account_number: Joi.string().optional(),
        bank_ifsc_code: Joi.string().optional(),
        upi_id: Joi.string().optional(),
        bank_holder_name: Joi.string().optional(),

        goverment_id_Type: Joi.string().optional(),
        goverment_id_No: Joi.string().optional(),
        goverment_id_Photo_url: Joi.string().optional(),

        updated_at: Joi.date().default(() => new Date().toISOString(), "current date"),
    });
    return schema.validate(data);
};

// ✅ Validation for Deleting User Verification Data
export const validateDeleteUserVerification = (data) => {
    const schema = Joi.object({
        user_id: Joi.string().required(),
    });
    return schema.validate(data);
};
