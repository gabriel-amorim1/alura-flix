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

export const createCategorySchema = yup.object().shape({
    title: yup.string().strict(true).required(),
    color: yup
        .string()
        .test(
            `test-color`,
            'Color needs to be an base color or a hex string',
            async value =>
                (value &&
                    (baseColors.includes(value) ||
                        new RegExp(/^#(?:[0-9a-fA-F]{3}){1,2}$/).test(value))) ||
                new yup.ValidationError(
                    'Color needs to be an base color or a hex string',
                ),
        )
        .strict(true)
        .required(),
});
