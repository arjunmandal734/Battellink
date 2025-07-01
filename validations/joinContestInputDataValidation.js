import Joi from "joi";

// Validation schema for joining a contest
export const joinContestSchema = Joi.object({
    contest_id: Joi.string().required(),
    user_id: Joi.string().required(),
    user_game_id: Joi.string().required(),
    user_game_name: Joi.string().required(),
    squad_members: Joi.array().items(
        Joi.object({
            game_id: Joi.string().required(),
            game_name: Joi.string().required(),
        })
    ).optional(),
    payment_status: Joi.string().valid("pending", "completed", "failed").required(),
    payment_id: Joi.string().optional(),
    createdAt: Joi.date().iso().default(() => new Date().toISOString(), "Current Timestamp"),
    updatedAt: Joi.date().iso().default(() => new Date().toISOString(), "Current Timestamp"),
});

// Validation schema for updating squad members (user can only update squad, not their game ID)
export const updateSquadSchema = Joi.object({
    squad_members: Joi.array().items(
        Joi.object({
            game_id: Joi.string().required(),
            game_name: Joi.string().required(),
        })
    ).required(),
});

// Validation schema for updating room details (Admin only)
export const updateRoomSchema = Joi.object({
    room_id: Joi.string().required(),
    room_password: Joi.string().required(),
    assigned_slot: Joi.number().integer().min(1).required(),
});

// Validation schema for updating game results (Admin only)
export const updateGameResultsSchema = Joi.object({
    game_status: Joi.string().valid("ongoing", "completed", "cancelled").required(),
    score: Joi.number().integer().min(0).optional(),
    rank: Joi.number().integer().min(1).optional(),
    reward: Joi.number().min(0).optional(),
    updatedAt: Joi.date().iso().default(() => new Date().toISOString(), "Current Timestamp"),
});
