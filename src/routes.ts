/* eslint-disable import/extensions */
import { Router } from 'express';
import videoRoutes from './modules/video/video.routes';
import categoryRoutes from './modules/category/category.routes';

const router = Router();

router.use('/api/videos', videoRoutes);
router.use('/api/categories', categoryRoutes);

export { router };
