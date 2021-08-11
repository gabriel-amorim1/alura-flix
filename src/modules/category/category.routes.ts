import { Router } from 'express';
import { container } from 'tsyringe';
import { CreateCategoryController } from './useCases/CreateCategory/CreateCategoryController';
import { ListCategoriesController } from './useCases/ListCategories/ListCategoriesController';

const router = Router();

router.post('/', async (req, res) =>
    container.resolve(CreateCategoryController).handle(req, res),
);

router.get('/', async (req, res) =>
    container.resolve(ListCategoriesController).handle(req, res),
);

export default router;
