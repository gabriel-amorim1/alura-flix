import * as yup from 'yup';

export const createVideoSchema = yup.object().shape({
    title: yup.string().strict(true).required(),
    description: yup.string().strict(true).required(),
    url: yup.string().url().strict(true).required(),
    category_id: yup
        .string()
        .matches(
            /^[0-9a-fA-F]{24}$/,
            'Id must be a single String of 12 bytes or a string of 24 hex characters',
        )
        .strict(true)
        .optional(),
});
