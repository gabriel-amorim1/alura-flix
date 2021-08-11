import { ValidationError } from 'yup';

export const verifyIfParamIsInErrors = (
    errors: ValidationError,
    params: string[],
): boolean => {
    let isParamsInErrors = true;

    errors.inner.forEach((error: ValidationError) => {
        if (error.path && !params.includes(error.path)) {
            isParamsInErrors = false;
        }
    });

    return isParamsInErrors;
};
