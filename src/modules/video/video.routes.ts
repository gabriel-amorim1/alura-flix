import { Router } from 'express';
import createVideoController from './useCases/CreateVideo';
import listVideosController from './useCases/ListVideos';
import getVideoByIdController from './useCases/GetVideoById';
import updateVideoController from './useCases/UpdateVideo';
import removeVideoController from './useCases/RemoveVideo';

const router = Router();

router.post('/', async (req, res) =>
    (await createVideoController()).handle(req, res),
);

router.get('/', async (req, res) => (await listVideosController()).handle(req, res));

router.get('/:id', async (req, res) =>
    (await getVideoByIdController()).handle(req, res),
);

router.put('/:id', async (req, res) =>
    (await updateVideoController()).handle(req, res),
);

router.delete('/:id', async (req, res) =>
    (await removeVideoController()).handle(req, res),
);

export default router;
