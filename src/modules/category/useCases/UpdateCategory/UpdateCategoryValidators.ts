import * as yup from 'yup';

const baseColors = [
    'black',
    'white',
    'gray',
    'silver',
    'maroon',
    'red',
    'purple',
    'fushsia',
    'green',
    'lime',
    'olive',
    'yellow',
    'navy',
    'blue',
    'teal',
    'aqua',
];

export const updateCategorySchema = yup
    .object()
    .shape({
        title: yup.string().strict(true).optional(),
        color: yup
            .string()
            .test(
                `test-color`,
                'Color needs to be an base color or a hex string',
                value => {
                    if (
                        value &&
                        (baseColors.includes(value) ||
                            new RegExp(/^#(?:[0-9a-fA-F]{3}){1,2}$/).test(value))
                    ) {
                        return true;
                    }

                    if (!value) {
                        return true;
                    }

                    return new yup.ValidationError(
                        'Color needs to be an base color or a hex string',
                    );
                },
            )
            .strict(true)
            .optional(),
    })
    .test(
        'test-update-body',
        'At least one property is required.',
        value => Object.keys(value).length > 0,
    );
