import * as yup from 'yup';

export const updateVideoValidationSchema = yup.object().shape(
    {
        title: yup
            .string()
            .strict(true)
            .when(['description', 'url'], {
                is: (description: any, url: any) => !description && !url,
                then: yup
                    .string()
                    .strict(true)
                    .required(
                        'title is a required field if was not sent at least one property.',
                    ),
            }),
        description: yup
            .string()
            .strict(true)
            .when(['title', 'url'], {
                is: (title: any, url: any) => !title && !url,
                then: yup
                    .string()
                    .strict(true)
                    .required(
                        'description is a required field if was not sent at least one property.',
                    ),
            }),
        url: yup
            .string()
            .url()
            .strict(true)
            .when(['title', 'description'], {
                is: (title: any, description: any) => !title && !description,
                then: yup
                    .string()
                    .url()
                    .strict(true)
                    .required(
                        'url is a required field if was not sent at least one property.',
                    ),
            }),
    },
    [
        ['title', 'description'],
        ['title', 'url'],
        ['description', 'url'],
    ],
);
