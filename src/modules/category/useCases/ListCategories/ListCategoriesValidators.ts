import * as yup from 'yup';

export const listCategoriesValidatorSchema = yup.object().shape({
    showDeletedCategories: yup.boolean().optional(),
});
