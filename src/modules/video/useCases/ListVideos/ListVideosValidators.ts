import * as yup from 'yup';

export const listVideosValidatorSchema = yup.object().shape({
    showDeletedVideos: yup.boolean().strict(true).optional(),
});
