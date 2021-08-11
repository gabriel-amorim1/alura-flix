import { Router } from 'express';
import { container } from 'tsyringe';
import { CreateCategoryController } from './useCases/CreateCategory/CreateCategoryController';
import listCategoriesController from './useCases/ListCategories';

const router = Router();

router.post('/', async (req, res) =>
    container.resolve(CreateCategoryController).handle(req, res),
);

router.get('/', async (req, res) =>
    (await listCategoriesController()).handle(req, res),
);

export default router;
