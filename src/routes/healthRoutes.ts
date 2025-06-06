import { Router } from 'express';
import { getHealth, getHealthSimple } from '@/controllers/healthController';

const router = Router();

router.get('/', getHealth);

router.get('/simple', getHealthSimple);

export { router as healthRoutes };
