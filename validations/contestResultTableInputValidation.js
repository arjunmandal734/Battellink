import Joi from "joi";

// ✅ Schema for creating a contest
export const validateCreateContest = (data) => {
    const schema = Joi.object({
        contest_id: Joi.string().required().trim().messages({
            "any.required": "Contest ID is required",
            "string.empty": "Contest ID cannot be empty",
        }),
        game_name: Joi.string().required().trim().messages({
            "any.required": "Game name is required",
            "string.empty": "Game name cannot be empty",
        }),
        entry_fee: Joi.number().positive().required().messages({
            "any.required": "Entry fee is required",
            "number.base": "Entry fee must be a valid number",
            "number.positive": "Entry fee must be greater than zero",
        }),
        max_slots: Joi.number().integer().positive().required().messages({
            "any.required": "Max slots are required",
            "number.base": "Max slots must be a valid number",
            "number.positive": "Max slots must be greater than zero",
            "number.integer": "Max slots must be an integer",
        }),
        group: Joi.number().integer().positive().default(1).messages({
            "number.base": "Group must be a valid number",
            "number.positive": "Group number must be greater than zero",
            "number.integer": "Group must be an integer",
        }),
        status: Joi.string().valid("upcoming", "ongoing", "completed", "cancelled").default("upcoming").messages({
            "any.only": "Status must be either upcoming, ongoing, completed, or cancelled",
        }),
        scheduled_at: Joi.date().iso().required().messages({
            "any.required": "Scheduled date and time is required",
            "date.base": "Scheduled date must be a valid date format",
        }),
        prize_pool: Joi.number().positive().required().messages({
            "any.required": "Prize pool is required",
            "number.base": "Prize pool must be a valid number",
            "number.positive": "Prize pool must be greater than zero",
        }),
        created_at: Joi.date().default(() => new Date().toISOString()),
        updated_at: Joi.date().default(() => new Date().toISOString()),
    });

    return schema.validate(data, { abortEarly: false });
};

// ✅ Schema for updating a contest
export const validateUpdateContest = (data) => {
    const schema = Joi.object({
        contest_id: Joi.string().required().trim().messages({
            "any.required": "Contest ID is required",
            "string.empty": "Contest ID cannot be empty",
        }),
        game_name: Joi.string().trim().optional(),
        entry_fee: Joi.number().positive().optional(),
        max_slots: Joi.number().integer().positive().optional(),
        group: Joi.number().integer().positive().optional(),
        status: Joi.string().valid("upcoming", "ongoing", "completed", "cancelled").optional(),
        scheduled_at: Joi.date().iso().optional(),
        prize_pool: Joi.number().positive().optional(),
        updated_at: Joi.date().default(() => new Date().toISOString()),
    });

    return schema.validate(data, { abortEarly: false });
};

// ✅ Schema for deleting a contest
export const validateDeleteContest = (data) => {
    const schema = Joi.object({
        contest_id: Joi.string().required().trim().messages({
            "any.required": "Contest ID is required",
            "string.empty": "Contest ID cannot be empty",
        }),
    });

    return schema.validate(data, { abortEarly: false });
};

// ✅ Schema for fetching contest details
export const validateFetchContest = (data) => {
    const schema = Joi.object({
        contest_id: Joi.string().trim().allow(null, ""),
        game_name: Joi.string().trim().allow(null, ""),
    }).or("contest_id", "game_name").messages({
        "object.missing": "Either contest_id or game_name is required",
    });

    return schema.validate(data, { abortEarly: false });
};
