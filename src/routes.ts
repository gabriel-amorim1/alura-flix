import { Router } from 'express';
import { createVideoController } from './useCases/CreateVideo';

const router = Router();

router.post('/videos', createVideoController.handle);

export { router };
