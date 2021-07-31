import * as yup from 'yup';

export const idValidationSchema = yup.object().shape({
    id: yup
        .string()
        .matches(
            /^[0-9a-fA-F]{24}$/,
            'Id must be a single String of 12 bytes or a string of 24 hex characters',
        )
        .strict(true)
        .required(),
});
