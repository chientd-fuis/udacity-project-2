import { Router } from 'express';
import { ImageRouter } from './image/routes/image.router';

const router: Router = Router();

router.use('/', ImageRouter);

export const IndexRouter: Router = router;