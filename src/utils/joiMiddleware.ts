import Joi from 'joi';

interface joiParam {
    schema: object,
    parameters: object
}

export async function joiValidation({ schema, parameters }: joiParam): Promise<boolean | any> {
    try {
        const joiSchema = Joi.object(schema);
        await joiSchema.validateAsync(parameters, {
            convert: true,
            abortEarly: false,
            allowUnknown: true,
        });
        return true;
    } catch (error) {
        return error;
    }
}

