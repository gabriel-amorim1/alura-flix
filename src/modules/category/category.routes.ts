import { Router } from 'express';
import createCategoryController from './useCases/CreateCategory';
import listCategoriesController from './useCases/ListCategories';

const router = Router();

router.post('/', async (req, res) =>
    (await createCategoryController()).handle(req, res),
);

router.get('/', async (req, res) =>
    (await listCategoriesController()).handle(req, res),
);

export default router;
