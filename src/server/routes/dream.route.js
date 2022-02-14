import express from 'express';
import { getHealthController } from '../../controller/healthController';
const router = express.Router();

//router.post('/',  createDreamController);
router.get('/health', getHealthController);
//router.get('/:id', getDreamControllerById);

export default router;