import express from 'express';
import { createQuestionnaireController } from '../../controller/createQuestionnaireController';
import { getHealthController } from '../../controller/healthController';
import { getDreamControllerById } from '../../controller/getDreamControllerById';
const router = express.Router();

router.post('/create',  createQuestionnaireController);
router.get('/health', getHealthController);
router.get('/:id', getDreamControllerById);

export default router;