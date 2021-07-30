import { Router } from 'express';
import createVideoController from './useCases/CreateVideo';

const router = Router();

router.post('/', async (req, res) =>
    (await createVideoController()).handle(req, res),
);

export default router;
