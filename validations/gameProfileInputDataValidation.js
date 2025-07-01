import Joi from "joi";
import CustomError from "../utils/customError.js";


/**
 * Validate game profile input
 * @param {Object} data - Game profile details
 */
export const validateGameProfileInput = (data) => {
    const schema = Joi.object({
        
        user_id: Joi.string().required().messages({
            "any.required": "User ID is required",
        }),

        game_name: Joi.string().valid("BGMI", "COD", "FF").required().messages({
            "any.required": "Game name is required",
            "any.only": "Game name must be one of BGMI, COD, or FF",
        }),
        game_id: Joi.string().required().messages({
            "any.required": "Game ID is required",
        }),
        ign: Joi.string().optional(),
        fevorite_map: Joi.string().optional(),
        fevorite_gun: Joi.string().optional(),
        fevorite_role: Joi.string().valid("rusher", "sniper", "rifler", "support", "bomber").optional(),
        stats: Joi.array().items(
            Joi.object({
                season: Joi.string().optional(),
                matches_played: Joi.number().optional(),
                wins: Joi.number().optional(),
                kills: Joi.number().optional(),
                kD: Joi.number().optional(),
            })
        ).optional(),

    });

    const { error, value } = schema.validate(data, { abortEarly: false });

    if (error) {
        throw new CustomError(400, error.details.map((err) => err.message).join(", "));
    }

    return value; // Return validated data
};
