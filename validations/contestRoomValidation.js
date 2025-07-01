import Joi from "joi";

export const validateContestRoom = (data) => {
    const schema = Joi.object({
        contest_id: Joi.string().required(),
        group_number: Joi.number().integer().min(1).required(),
        room_id: Joi.string().required(),
        room_password: Joi.string().required(),
        createdAt: Joi.date().default(() => new Date().toISOString()),
        updatedAt: Joi.date().default(() => new Date().toISOString()),
    });

    return schema.validate(data);
};
