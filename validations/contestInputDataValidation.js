import Joi from "joi";

/*
export const validateContestInput = (data) => {
    const schema = Joi.object({
        contest_Id: Joi.string().required(),
        game_name: Joi.string().valid("BGMI", "COD", "FF").required(),
        contest_title: Joi.string().required(),
        description: Joi.string().required(),
        entry_fee: Joi.number().required(),
        total_slots: Joi.number().required(),
        slots_booked: Joi.number().default(0),
        maps: Joi.array().items(Joi.string()).default([]),
        team_mode: Joi.string().valid("Solo", "Duo", "Squad").required(),
        prize_pool: Joi.number().required(),
        date: Joi.string().required(),
        time: Joi.string().required(),
        status: Joi.string().valid("Upcoming", "Ongoing", "Completed").default("Upcoming"),
        rules: Joi.array().items(Joi.string()).default([]),
        participants: Joi.array()
            .items(
                Joi.object({
                    user_id: Joi.string(),
                    game_id: Joi.string(),
                    payment_status: Joi.string().valid("pending", "paid").default("pending"),
                })
            )
            .default([]),

        contest_image_url: Joi.string().required(),
        roomId: Joi.string().required().default("xxx"),
        roomPassword: Joi.string().required().default("xxx"),
        winning_criteria: Joi.string().required(),
        game_specific_data: Joi.string().default("--"),
        position_prize: Joi.object().default({ first: 0, second: 0, third: 0 }),
    });

    return schema.validate(data);
};
*/



// ✅ Schema for creating a contest
export const validateCreateContest = (data) => {
    const schema = Joi.object({
        contest_Id: Joi.string().required().trim().messages({
            "any.required": "Contest ID is required",
            "string.empty": "Contest ID cannot be empty",
        }),
        game_name: Joi.string().valid("BGMI", "COD", "FF").required().messages({
            "any.required": "Game name is required",
            "any.only": "Game name must be one of BGMI, COD, or FF",
        }),
        contest_title: Joi.string().required().trim().messages({
            "any.required": "Contest title is required",
            "string.empty": "Contest title cannot be empty",
        }),
        description: Joi.string().required().trim().messages({
            "any.required": "Description is required",
            "string.empty": "Description cannot be empty",
        }),
        entry_fee: Joi.number().positive().required().messages({
            "any.required": "Entry fee is required",
            "number.base": "Entry fee must be a valid number",
            "number.positive": "Entry fee must be greater than zero",
        }),
        total_slots: Joi.number().integer().positive().required().messages({
            "any.required": "Total slots are required",
            "number.base": "Total slots must be a valid number",
            "number.positive": "Total slots must be greater than zero",
            "number.integer": "Total slots must be an integer",
        }),
        slots_booked: Joi.number().integer().default(0).messages({
            "number.base": "Slots booked must be a valid number",
            "number.integer": "Slots booked must be an integer",
        }),
        maps: Joi.array().items(Joi.string()).default([]),
        team_mode: Joi.string().valid("Solo", "Duo", "Squad").required().messages({
            "any.required": "Team mode is required",
            "any.only": "Team mode must be one of Solo, Duo, or Squad",
        }),
        prize_pool: Joi.number().positive().required().messages({
            "any.required": "Prize pool is required",
            "number.base": "Prize pool must be a valid number",
            "number.positive": "Prize pool must be greater than zero",
        }),
        date: Joi.string().required().messages({
            "any.required": "Date is required",
        }),
        time: Joi.string().required().messages({
            "any.required": "Time is required",
        }),
        status: Joi.string().valid("Upcoming", "Ongoing", "Completed").default("Upcoming"),
        rules: Joi.array().items(Joi.string()).default([]),
        participants: Joi.array()
            .items(
                Joi.object({
                    user_id: Joi.string().required().messages({
                        "any.required": "User ID is required",
                    }),
                    game_id: Joi.string().required().messages({
                        "any.required": "Game ID is required",
                    }),
                    payment_status: Joi.string().valid("pending", "paid").default("pending"),
                })
            )
            .default([]),
        contest_image_url: Joi.string().required().messages({
            "any.required": "Contest image URL is required",
        }),
        roomId: Joi.string().required().default("xxx"),
        roomPassword: Joi.string().required().default("xxx"),
        winning_criteria: Joi.string().required().messages({
            "any.required": "Winning criteria is required",
        }),
        game_specific_data: Joi.string().default("--"),
        position_prize: Joi.object()
            .keys({
                first: Joi.number().positive().default(0),
                second: Joi.number().positive().default(0),
                third: Joi.number().positive().default(0),
            })
            .default({ first: 0, second: 0, third: 0 }),
    });

    return schema.validate(data, { abortEarly: false });
}; 

// ✅ Schema for updating a contest
export const validateUpdateContest = (data) => {
    const schema = Joi.object({
        contest_Id: Joi.string().required().trim(),
        game_name: Joi.string().valid("BGMI", "COD", "FF").optional(),
        contest_title: Joi.string().trim().optional(),
        description: Joi.string().trim().optional(),
        entry_fee: Joi.number().positive().optional(),
        total_slots: Joi.number().integer().positive().optional(),
        slots_booked: Joi.number().integer().optional(),
        maps: Joi.array().items(Joi.string()).optional(),
        team_mode: Joi.string().valid("Solo", "Duo", "Squad").optional(),
        prize_pool: Joi.number().positive().optional(),
        date: Joi.string().optional(),
        time: Joi.string().optional(),
        status: Joi.string().valid("Upcoming", "Ongoing", "Completed").optional(),
        rules: Joi.array().items(Joi.string()).optional(),
        participants: Joi.array()
            .items(
                Joi.object({
                    user_id: Joi.string().optional(),
                    game_id: Joi.string().optional(),
                    payment_status: Joi.string().valid("pending", "paid").optional(),
                })
            )
            .optional(),
        contest_image_url: Joi.string().optional(),
        roomId: Joi.string().optional(),
        roomPassword: Joi.string().optional(),
        winning_criteria: Joi.string().optional(),
        game_specific_data: Joi.string().optional(),
        position_prize: Joi.object()
            .keys({
                first: Joi.number().positive().optional(),
                second: Joi.number().positive().optional(),
                third: Joi.number().positive().optional(),
            })
            .optional(),
    });

    return schema.validate(data, { abortEarly: false });
};

// ✅ Schema for deleting a contest
export const validateDeleteContest = (data) => {
    const schema = Joi.object({
        contest_Id: Joi.string().required().trim().messages({
            "any.required": "Contest ID is required",
            "string.empty": "Contest ID cannot be empty",
        }),
    });

    return schema.validate(data, { abortEarly: false });
};

// ✅ Schema for fetching a contest by ID
export const validateFetchContestById = (data) => {
    const schema = Joi.object({
        contest_Id: Joi.string().required().trim().messages({
            "any.required": "Contest ID is required",
            "string.empty": "Contest ID cannot be empty",
        }),
    });

    return schema.validate(data, { abortEarly: false });
};

// ✅ Schema for fetching contests by game name
export const validateFetchContestsByGame = (data) => {
    const schema = Joi.object({
        game_name: Joi.string().valid("BGMI", "COD", "FF").required().messages({
            "any.required": "Game name is required",
            "any.only": "Game name must be one of BGMI, COD, or FF",
        }),
    });

    return schema.validate(data, { abortEarly: false });
};

