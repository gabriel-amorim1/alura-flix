/* eslint-disable import/extensions */
import { Router } from 'express';
import videoRoutes from './modules/video/video.routes';

const router = Router();

router.use('/api/videos', videoRoutes);

export { router };
