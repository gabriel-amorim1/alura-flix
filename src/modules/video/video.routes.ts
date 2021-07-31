import { Router } from 'express';
import createVideoController from './useCases/CreateVideo';
import listVideosController from './useCases/ListVideos';
import getVideoByIdController from './useCases/GetVideoById';

const router = Router();

router.post('/', async (req, res) =>
    (await createVideoController()).handle(req, res),
);

router.get('/', async (req, res) => (await listVideosController()).handle(req, res));

router.get('/:id', async (req, res) =>
    (await getVideoByIdController()).handle(req, res),
);

export default router;
