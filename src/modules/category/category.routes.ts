import { Router } from 'express';
import { container } from 'tsyringe';
import { CreateCategoryController } from './useCases/CreateCategory/CreateCategoryController';
import { ListCategoriesController } from './useCases/ListCategories/ListCategoriesController';
import { GetCategoryByIdController } from './useCases/GetCategoryById/GetCategoryByIdController';
import { UpdateCategoryController } from './useCases/UpdateCategory/UpdateCategoryController';

const router = Router();

router.post('/', async (req, res) =>
    container.resolve(CreateCategoryController).handle(req, res),
);

router.get('/', async (req, res) =>
    container.resolve(ListCategoriesController).handle(req, res),
);

router.get('/:id', async (req, res) =>
    container.resolve(GetCategoryByIdController).handle(req, res),
);

router.put('/:id', async (req, res) =>
    container.resolve(UpdateCategoryController).handle(req, res),
);

export default router;
