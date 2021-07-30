import { Router } from 'express';
import createVideoController from './useCases/CreateVideo';
import listVideosController from './useCases/ListVideos';

const router = Router();

router.post('/', async (req, res) =>
    (await createVideoController()).handle(req, res),
);

router.get('/', async (req, res) => (await listVideosController()).handle(req, res));

export default router;
