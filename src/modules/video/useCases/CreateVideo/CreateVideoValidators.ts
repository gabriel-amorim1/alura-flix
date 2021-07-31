import * as yup from 'yup';

export const createVideoSchema = yup.object().shape({
    title: yup.string().strict(true).required(),
    description: yup.string().strict(true).required(),
    url: yup.string().url().strict(true).required(),
});
