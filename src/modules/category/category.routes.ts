import { Router } from 'express';
import createCategoryController from './useCases/CreateCategory';

const router = Router();

router.post('/', async (req, res) =>
    (await createCategoryController()).handle(req, res),
);

export default router;
