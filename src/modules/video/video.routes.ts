import { Router } from 'express';
import { container } from 'tsyringe';
import { CreateVideoController } from './useCases/CreateVideo/CreateVideoController';
import { GetVideoByIdController } from './useCases/GetVideoById/GetVideoByIdController';
import { ListVideosController } from './useCases/ListVideos/ListVideosController';
import { RemoveVideoController } from './useCases/RemoveVideo/RemoveVideoController';
import { UpdateVideoController } from './useCases/UpdateVideo/UpdateVideoController';

const router = Router();

router.post('/', async (req, res) =>
    container.resolve(CreateVideoController).handle(req, res),
);

router.get('/', async (req, res) =>
    container.resolve(ListVideosController).handle(req, res),
);

router.get('/:id', async (req, res) =>
    container.resolve(GetVideoByIdController).handle(req, res),
);

router.put('/:id', async (req, res) =>
    container.resolve(UpdateVideoController).handle(req, res),
);

router.delete('/:id', async (req, res) =>
    container.resolve(RemoveVideoController).handle(req, res),
);

export default router;
