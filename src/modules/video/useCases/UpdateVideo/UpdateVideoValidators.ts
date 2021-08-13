import * as yup from 'yup';

export const updateVideoValidationSchema = yup
    .object()
    .shape({
        title: yup.string().strict(true).optional(),
        description: yup.string().strict(true).optional(),
        url: yup.string().url().strict(true).optional(),
    })
    .test(
        'test-update-body',
        'At least one property is required.',
        value => Object.keys(value).length > 0,
    );
