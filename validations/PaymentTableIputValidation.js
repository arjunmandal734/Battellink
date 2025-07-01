import Joi from "joi";

// ✅ Schema for creating a payment record
export const validateCreatePayment = (data) => {
    const schema = Joi.object({
        payment_id: Joi.string().required().trim().messages({
            "any.required": "Payment ID is required",
            "string.empty": "Payment ID cannot be empty",
        }),
        user_id: Joi.string().required().trim().messages({
            "any.required": "User ID is required",
            "string.empty": "User ID cannot be empty",
        }),
        contest_id: Joi.string().required().trim().messages({
            "any.required": "Contest ID is required",
            "string.empty": "Contest ID cannot be empty",
        }),
        amount: Joi.number().positive().required().messages({
            "any.required": "Amount is required",
            "number.base": "Amount must be a valid number",
            "number.positive": "Amount must be greater than zero",
        }),
        currency: Joi.string().valid("INR", "USD", "EUR").required().messages({
            "any.required": "Currency is required",
            "any.only": "Currency must be either INR, USD, or EUR",
        }),
        status: Joi.string().valid("pending", "successful", "failed").default("pending").messages({
            "any.only": "Status must be either pending, successful, or failed",
        }),
        transaction_id: Joi.string().allow(null, "").trim().messages({
            "string.empty": "Transaction ID cannot be empty",
        }),
        created_at: Joi.date().default(() => new Date().toISOString()),
        updated_at: Joi.date().default(() => new Date().toISOString()),
    });

    return schema.validate(data, { abortEarly: false });
};

// ✅ Schema for updating payment status
export const validateUpdatePaymentStatus = (data) => {
    const schema = Joi.object({
        payment_id: Joi.string().required().trim().messages({
            "any.required": "Payment ID is required",
            "string.empty": "Payment ID cannot be empty",
        }),
        status: Joi.string().valid("pending", "successful", "failed").required().messages({
            "any.required": "Status is required",
            "any.only": "Status must be either pending, successful, or failed",
        }),
        transaction_id: Joi.string().allow(null, "").trim().messages({
            "string.empty": "Transaction ID cannot be empty",
        }),
        updated_at: Joi.date().default(() => new Date().toISOString()),
    });

    return schema.validate(data, { abortEarly: false });
};

// ✅ Schema for deleting a payment record
export const validateDeletePayment = (data) => {
    const schema = Joi.object({
        payment_id: Joi.string().required().trim().messages({
            "any.required": "Payment ID is required",
            "string.empty": "Payment ID cannot be empty",
        }),
    });

    return schema.validate(data, { abortEarly: false });
};

// ✅ Schema for fetching payment by payment_id or contest_id
export const validateFetchPayment = (data) => {
    const schema = Joi.object({
        payment_id: Joi.string().trim().allow(null, ""),
        contest_id: Joi.string().trim().allow(null, ""),
    }).or("payment_id", "contest_id").messages({
        "object.missing": "Either payment_id or contest_id is required",
    });

    return schema.validate(data, { abortEarly: false });
};
